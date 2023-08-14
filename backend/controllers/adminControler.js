const ErrorHandler = require('../utils/errorhandlers');
const catchAsyncError = require('../middleware/catchAsyncError');
const User = require('../models/userModel');
const Product = require('../models/prodectModel');
const cloudinary = require('cloudinary')
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

    let images = [];
    // console.log("type of images ", typeof images);
    // console.log("type of req.body.images ", typeof req.body.images);
    if (typeof req.body.images === "string") {
        images.push(req.body.images)
    }
    else {
        images = req.body.images;
    }
    // console.log("temp", images);
    const imagesLink = [];
    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "products"
        });
        // console.log(result);
        imagesLink.push({
            public_id: result.public_id,
            url: result.secure_url
        })
    }

    // console.log("image ", imagesLink);
    req.body.images = imagesLink;
    req.body.user = req.user.id;
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })

})

// Get All Product -- Admin
exports.getAdminProducts = catchAsyncError(async (req, res, next) => {
    const products = await Product.find();
    res.status(200).json({
        success: true,
        products,
    });

})


// Update Product -- Admin
exports.updateProduct = catchAsyncError(async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404))
    }

    // Images start here
    let images = [];
    // console.log("type of req.body.images ", typeof req.body.images);
    if (typeof req.body.images === "string") {
        images.push(req.body.images)
    }
    else {
        images = req.body.images;
    }

    if (images != undefined) {
        for (let i = 0; i < product.images.length; i++) {
            await cloudinary.v2.uploader.destroy(product.images[i].public_id)
        }

        const imagesLink = [];
        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: "products"
            });
            // console.log(result);
            imagesLink.push({
                public_id: result.public_id,
                url: result.secure_url
            })
        }
        req.body.images = imagesLink;

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
    // console.log(req.params.id);
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404))
    }
    // Deleting Images from cloudinary
    for (let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id)
    }

    await Product.deleteOne({ "_id": req.params.id });

    res.status(200).json({
        success: true,
        message: "Product Delete Successfully",
    });
})