const Product = require('../models/prodectModel');
const ErrorHandler = require('../utils/errorhandlers');
const catchAsyncError = require('../middleware/catchAsyncError');
const ApiFeatures = require('../utils/apifeature');



// Create Product  -- Admin
// exports.createProduct = catchAsyncError(async (req, res, next) => {
//     const product = await Product.create(req.body);

//     res.status(201).json({
//         success: true,
//         product
//     })

// })

// these are same 
exports.createProduct = async (req, res, next) => {
    try {
        const product = await Product.create(req.body);

        res.status(201).json({
            success: true,
            product
        })
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err
        })
    }

}

// Get All Product
exports.getAllProducts = catchAsyncError(async (req, res) => {

    const resultPerPage = 5;
    const productCount = await Product.countDocuments()
    const apiFeature = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage);
    const product = await apiFeature.query;
    res.status(200).json({
        success: true,
        product,
        productCount
    });

})

// Get Product Details
exports.getProductDetails = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404))
    }
    res.status(200).json({
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