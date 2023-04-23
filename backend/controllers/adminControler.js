const ErrorHandler = require('../utils/errorhandlers');
const catchAsyncError = require('../middleware/catchAsyncError');
const User = require('../models/userModel');
const Product = require('../models/prodectModel');
// const ApiFeatures = require('../utils/apifeature');
// const sendToken = require('../utils/jwtToken');



// Get All User --- Admin
exports.getAllUser = catchAsyncError(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users,
    })
})

// Get Single User -- Admin
exports.getSingleUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new ErrorHandler(`User Does Not Exist With Id : ${req.params.id}`, 400))
    }
    res.status(200).json({
        success: true,
        user,
    })
})



// Update User Role  --- Admin
exports.updaterUserRole = catchAsyncError(async (req, res, next) => {
    const updatedUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
    }
    const user = await User.findByIdAndUpdate(req.params.id, updatedUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    })

    res.status(200).json({
        success: true,
        user,
    })
})

// Delete A User  -- admin
exports.deleteUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`User Does Not Exist with id ${req.params.id}`, 400))
    }
    await user.deleteOne({ "_id": req.params.id })
    res.status(200).json({
        success: true,
        message: "User Deleted Successfully"
    })
})



// for Product




// Create Product  -- Admin
exports.createProduct = catchAsyncError(async (req, res, next) => {
    req.body.user = req.user.id;
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })

})
// Update Product -- Admin
exports.updateProduct = catchAsyncError(async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404))
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        product
    })
})


// Delete Product -- Admin

exports.deleteProduct = catchAsyncError(async (req, res, next) => {
    // try {

    // } catch (err) {
    //     console.log("error " + err);
    // }

    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404))
    }
    await Product.deleteOne({ "_id": req.params.id });

    res.status(200).json({
        success: true,
        message: "Product Delete Successfully",
    });
})