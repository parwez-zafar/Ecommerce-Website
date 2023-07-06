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


// Get All Product
exports.getAllProducts = catchAsyncError(async (req, res, next) => {

    // return next(new ErrorHandler("this is my error", 400));
    const resultPerPage = 8;
    const productCount = await Product.countDocuments()
    const apiFeature = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter()
    // .pagination(resultPerPage)


    let products = await apiFeature.query;

    const filteredProductsCount = products.length;

    apiFeature.pagination(resultPerPage)

    products = await apiFeature.query.clone();

    res.status(200).json({
        success: true,
        products,
        productCount,
        resultPerPage,
        filteredProductsCount
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


// Create New Review or Update the review
exports.createProductReview = catchAsyncError(async (req, res, next) => {
    const { rating, comment, productId } = req.body;
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        image: req.user.avatar.url,
        comment,
    }
    // console.log(req.token);
    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find((rev) => rev.user.toString() === req.user._id.toString());

    if (isReviewed) {
        product.reviews.forEach((rev) => {
            if (rev.user.toString() === req.user._id.toString()) {
                (rev.rating = rating), (rev.comment = comment);
            }
        })
    }
    else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    let avg = 0;
    product.ratings = product.reviews.forEach((rev) => {
        avg += rev.rating;
    })
    product.ratings = avg / product.reviews.length;
    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
    })
});


// Get All reviews of a product
exports.getProductReview = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.id);
    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews,
    });
});

// Delete Review
exports.deleteReview = catchAsyncError(async (req, res, next) => {

    const product = await Product.findById(req.query.productId);
    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    let userId = product.reviews;
    const loginId = req.user.id;

    product.reviews.forEach((rev) => {
        if (rev.id.toString() === req.query.reviewId.toString())
            userId = rev.user.toString();
    })
    // console.log(userId);
    // console.log(loginId);
    if (userId !== loginId) {
        return next(new ErrorHandler("You Are Not Allowed To Delete This Review", 405))
    }

    const reviews = product.reviews.filter((rev) => rev._id.toString() !== req.query.reviewId.toString());


    let avg = 0;
    reviews.forEach((rev) => {
        avg += rev.rating;
    })
    const ratings = avg / reviews.length;
    const numOfReviews = reviews.length;
    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        numOfReviews,
    }, {
        new: true,
        runValidators: true,
        useFineAndModify: false
    }
    )

    // console.log(numOfReviews);



    res.status(200).json({
        success: true,
    })
})

