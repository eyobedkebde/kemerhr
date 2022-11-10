const config = require('../config/index')

const AppError = function(message, statusCode){

    //populate the current objects to the builtin Error constructor
    Error.call(this,message);
    this.message = message;
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4')?'FAIL':'ERROR';
    this.isOperational = true;
    
    // capture the error stack trace for diplaying the the 
    // place where the error has occured
    Error.captureStackTrace(this, this.constructor);
}

module.exports.geh = (err, req, res, next)=>{

    // Error status and status code
    err.status = err.status || "ERROR";
    err.statusCode = err.statusCode || 500;

    if (config.env === "Development") {
        res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        error: err,
        errorStack: err.stack,
      });
    }
    
}

module.exports.AppError = AppError;