const ErrorHander = require("../utils/errorHander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

//Register a User
exports.registerUser = catchAsyncErrors( async(req,res,next)=>{
    const { name, email, password } = req.body; //fetching data from req body
    const user = await User.create({
        name,
        email,
        password,
        avatar:{
            public_id: "this is a sample id",
            url: "profilepicUrl"
        }
    });

    sendToken(user,201,res);
});

//Login User
exports.loginUser = catchAsyncErrors( async(req,res,next)=>{
    const {email,password} = req.body;

    //checking if user has given email and password both
    if(!email || !password){
        return next(new ErrorHander("Please enter email and password" ,400))
    } 
    const user = await User.findOne({email}).select("+password");

    //if user not found in database
    if(!user){
        return next(new ErrorHander("Invalid email or password",401));
    }
    //if user found, now checking password
    const isPasswordMatched = await user.comparePassword(password);

    //if password not matched
    if(!isPasswordMatched){
        return next(new ErrorHander("Invalid email or password",401));
    }


    //send token to user (everything is matched)
    sendToken(user,200,res);

}); 

//Log-out User
exports.logout = catchAsyncErrors(async( req, res, next) =>{
    res.cookie("token",null,{
        expires: new Date(Date.now()),
        httpOnly:true,
    });
    res.status(200).json({
        success:true,
        message: "Logged Out"
    });
});

//Forgot Password
exports.forgotPassword = catchAsyncErrors(async(req,res,next) => {
    const user = await User.findOne({email:req.body.email});
    if(!user){
        return next(new ErrorHander("User not found",404));
    }
    //Get ResetPassword Token
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false});

    const resetPasswordToken = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;
    const message =`Your password reset token is :- \n\n ${resetPasswordToken} \n\n If you have not requested this email then please ignore it.`;
    try{
        await sendEmail({
            email: user.email,
            subject: `E-commerce Password Recovery`,
            message,
        });
        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`,
        });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new ErrorHander(error.message, 500));
    }
}); 

//Reset Password
exports.resetPassword = catchAsyncErrors(async (req,res,next) => {

    //Creating Token Hash
    const resetpasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");
    
    //Finding user by token and time of expire
    const user = await User.findOne({
        resetpasswordToken,
        resetpasswordExpire: { $gt: Date.now() }
    });

    if(!user){
        return next(new ErrorHander("Reset Password Token is invalid or has been expired",400));
    }

    //if updated password and confirm password not same
    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHander("Password does not match",400));
    }

    //everything is fine, now updating password
    user.password = req.body.password;
    user.resetpasswordToken = undefined;
    user.resetpasswordExpire = undefined;
    await user.save();
    sendToken(user,200,res);
})