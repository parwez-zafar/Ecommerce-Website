const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require("../controllers/productController");
const { isAuthecticatedUser } = require("../middleware/auth");
const router = express.Router();


router.route('/products').get(getAllProducts);


router.route('/product/new').post(isAuthecticatedUser, createProduct);

router
    .route('/product/:id')
    .put(isAuthecticatedUser, updateProduct)
    .delete(isAuthecticatedUser, deleteProduct)
    .get(getProductDetails);




module.exports = router;