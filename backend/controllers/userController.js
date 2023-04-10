const ErrorHandler = require('../utils/errorhandlers');
const catchAsyncError = require('../middleware/catchAsyncError');
const User = require('../models/userModel');

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
    res.status(201).json({
        success: true,
        user,
    })
})