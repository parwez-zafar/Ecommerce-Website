const ErrorHandler = require('../utils/errorhandlers');
const catchAsyncError = require('../middleware/catchAsyncError');
const User = require('../models/userModel');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const cloudinary = require('cloudinary');

//Register a User
exports.registerUser = catchAsyncError(async (req, res, next) => {
    // console.log("eljsdfj");
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
    });
    const { name, email, password } = req.body;
    // console.log(name + " " + email + " " + password);
    const user = await User.create({
        name, email, password,
        avatar: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
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
        httpOnly: true,
    })
    res.status(200).json({
        success: true,
        message: "Logged Out",
    })
})

// Forgot Password
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new ErrorHandler("user not found", 404));
    }
    // Get ResetPassword Token
    const resetToken = user.getResetPasswordToken();
    // console.log(resetToken);
    await user.save({ validateBeforeSave: false });

    // link for reset
    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;
    // const resetPasswordUrl = ` ${process.env.FRONTEDNURL}/password/reset/${resetToken}`;


    const message = `Your Password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it`;

    try {
        await sendEmail({
            email: user.email,
            subject: "PRWZ Shop Password Recovery",
            message: message
        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`,
        })
    } catch (err) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });
        console.log(err);
        return next(new ErrorHandler(err.message, 500))
    }
})

//reset Password
exports.resetPassword = catchAsyncError(async (req, res, next) => {
    // Creating token hash
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
        return next(new ErrorHandler("Reset Password Token in invalid or has been expired", 400));
    }


    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password does not matched ", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    sendToken(user, 200, res);

});


// Get user details
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user,
    })
})



// Update user Password
exports.updatePassowrd = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");
    const { oldPassword } = req.body;
    const isPasswordMatched = await user.comparePassword(oldPassword)
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Old Password Is Incorrect", 400));
    }

    const { newPassword, confirmNewPassword } = req.body;
    if (newPassword !== confirmNewPassword) {
        return next(new ErrorHandler("Password Does Not Mach", 400));
    }

    user.password = newPassword;
    await user.save();

    sendToken(user, 200, res);

    res.status(200).json({
        success: true,
        user,
    })
})

// Update user Profile 
exports.updateProfile = catchAsyncError(async (req, res, next) => {
    const updatedUserData = {
        name: req.body.name,
        email: req.body.email,
    }
    // we will add cloudinary later

    if (req.body.avatar != "") {
        const user = await User.findById(req.user.id);
        const imageId = user.avatar.public_id;
        await cloudinary.v2.uploader.destroy(imageId);

        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "avatars",
            width: 150,
            crop: "scale",
        });
        updatedUserData.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        }
    }


    const user = await User.findByIdAndUpdate(req.user.id, updatedUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    })
    res.status(200).json({
        success: true,
    })
})

