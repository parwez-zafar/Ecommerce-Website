const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Product Name"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Please Enter Product Description"]
    },
    price: {
        type: Number,
        required: [true, "Please Enter Product Price"],
        maxLength: [8, "Price cannot exceed 8 charecters"]
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: [true, "Please Enter Product Category"]
    },
    stock: {
        type: Number,
        required: [true, "Please Enter Product Stock"],
        maxLength: [4, "Stock Cannot Exceed 4 charecter"],
        default: 1
    },
    numOfReviews: {
        type: Number,
        default: 0,
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            rating: {
                type: Number,
                required: true,
            },
            comment: {
                type: String,
                required: true
            },
            image: {
                type: String,
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    creatDate: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Product", productSchema);