const Order = require('../models/orderModel');
const Product = require('../models/prodectModel');
const ErrorHandler = require('../utils/errorhandlers');
const catchAsyncError = require('../middleware/catchAsyncError');
const { Query } = require('mongoose');

// Create New Order
exports.newOrder = catchAsyncError(async (req, res, next) => {
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body;
    // console.log("creating ", req.body);
    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id,
    })
    res.status(200).json({
        success: true,
        order,
    })
})


// Get Single Order Details
exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate(
        "user", "name email"
    )

    if (!order) {
        return next(new ErrorHandler("Order Not Found With This Id ", 404));
    }
    res.status(200).json({
        success: true,
        order,
    });
});


// Get login user Order Details
exports.myOrders = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id });


    res.status(200).json({
        success: true,
        orders,
    });
});


// Get All Order   -- Admin
exports.getAllOrders = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find();

    let totalAmount = 0;
    orders.forEach((order) => {
        totalAmount += order.totalPrice;
    });
    res.status(200).json({
        success: true,
        totalAmount,
        orders,
    });
});

async function updateStock(id, quantity) {
    const product = await Product.findById(id);
    product.stock -= quantity;

    await product.save({ validateBeforeSave: false });
}
// Update Order Status  -- Admin
exports.updateOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
        return next(new ErrorHandler("Order Not Found With This Id ", 404));
    }



    if (order.orderStatus == "Delivered") {
        return next(new ErrorHandler("You Have Already Delivered This Order.", 404));
    }

    order.orderItems.forEach(async (o) => {
        await updateStock(o.product, o.quantity);
    })

    order.orderStatus = req.body.status;
    if (req.body.status === "Delivered")
        order.delivereAt = Date.now();

    await order.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
    });
});






// delete Order  -- Admin
exports.deleteOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
        return next(new ErrorHandler("Order Not Found With This Id ", 404));
    }
    await order.deleteOne({ "_id": req.params.id });
    res.status(200).json({
        success: true,
    });
});