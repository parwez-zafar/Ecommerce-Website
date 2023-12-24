const ErrorHandler = require('../utils/Errorhandlers');

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    // wrong mongodb Id error
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid : ${err.path}`;
        err = new ErrorHandler(message, 404);
    }

    // mongoose duplicate key error
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message, 404);
    }

    // wrong jwt error
    if (err.name === "jsonWebTokenError") {
        const message = `Json Web Token is Invalid, Try again`;
        err = new ErrorHandler(message, 404);
    }


    // wrong Expirejwt error
    if (err.name === "TokenExpiredError") {
        const message = `Json Web Token is Expired, Try again`;
        err = new ErrorHandler(message, 404);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message
    })
}