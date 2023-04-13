const ErrorHandler = require('../utils/errorhandlers');
const catchAsyncError = require('../middleware/catchAsyncError');
const User = require('../models/userModel');
const sendToken = require('../utils/jwtToken');

//Register a User
exports.registerUser = catchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body;
    const user = await User.create({
        name, email, password,
        avatar: {
            public_id: "this is a sample id",
            url: "profilePicUrl",
        }
    });
    sendToken(user, 201, res);
});

// User Login
exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    // Checking if email and password given or not
    if (!email || !password) {
        return next(new ErrorHandler("Plese Enter Email and Password.", 400));
    }
    const user = await User.findOne({ email }).select("+password");
    // console.log(user);
    if (!user) {
        return next(new ErrorHandler("Invalid Email Or Password", 401));
    }

    const isCorrectPassword = await user.comparePassword(password);
    if (!isCorrectPassword) {
        return next(new ErrorHandler("Invalid Email Or Password", 401));
    }

    sendToken(user, 200, res);
})

// user Logout

exports.logout = catchAsyncError(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnlye: true,
    })
    res.status(200).json({
        success: true,
        message: "Logged Out",
    })
})