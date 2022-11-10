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

module.exports = AppError;