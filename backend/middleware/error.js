const ErrorHandler = require("../utils/errorHander");
module.exports = (err, req, res , next)=>{
    let statusCode = err.statusCode || 500 ;
    let message = err.message || "Internal Server Error";

    //wrong MongoDb Id Error
    if(err.name === "CastError"){
        const message =`Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message,400);
    }
    //Mongoose duplicate key error
    if(err.code === 11000){
        const message =`Duplicate ${Object.keys(err.keyValue)} entered.`;
        err = new ErrorHandler(message,400);
    }
    //Wrong JWT error
    if(err.name === "JsonWebTokenError"){
        const message =`Json Web Token is invalid. Try Again!`;
        err = new ErrorHandler(message,400);
    }
    //JWT Expire error
    if(err.name === "TokenExpiredError"){
        const message =`Json Web Token is Expired. Try Again!`;
        err = new ErrorHandler(message,400);
    }

    res.status(statusCode).json({
        success: false,
        message: err.message,
    });
};