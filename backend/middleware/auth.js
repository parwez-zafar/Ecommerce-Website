const ErrorHandler = require("../utils/Errorhandlers");
const catchAsyncError = require("./catchAsyncError");
const JWT = require("jsonwebtoken");
const User = require('../models/userModel');

exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {

    const token = req.headers["authorization"];
    // console.log(" is ", token);
    if (!token)
        return next(new ErrorHandler("Please Login to access this resource", 401));

    const decodedData = JWT.verify(token, process.env.JWT_SECRET);
    // console.log(decodedData);    
    req.user = await User.findById(decodedData.id);
    next();
})


exports.authorizeRole = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`${req.user.role} is not allowed to access this resource.`, 403));
        }
        next();
    }
}