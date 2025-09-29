const ErrorHandler = require("../utils/errorHander");
module.exports = (err, req, res , next)=>{
    let statusCode = err.statusCode || 500 ;
    let message = err.message || "Internal Server Error";

    //wrong MongoDb Id Error
    if(err.name === "CastError"){
        const message =`Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message,400);
    }

    res.status(statusCode).json({
        success: false,
        message: err.message,
    });
};