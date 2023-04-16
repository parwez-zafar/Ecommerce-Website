const express = require("express");
const { getAllProducts, getProductDetails, createProductReview, getProductReview, deleteReview } = require("../controllers/productController");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();


router.route('/products').get(getAllProducts);


router.route("/product/:id").get(getProductDetails);

router.route("/review").put(isAuthenticatedUser, createProductReview);

router
    .route("/reviews")
    .delete(isAuthenticatedUser, deleteReview)
    .get(getProductReview);


module.exports = router;