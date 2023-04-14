const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require("../controllers/productController");
const { isAuthecticatedUser, authorizeRole } = require("../middleware/auth");
const router = express.Router();


router.route('/products').get(getAllProducts);


router.route('/product/new').post(isAuthecticatedUser, authorizeRole("admin"), createProduct);

router
    .route('/product/:id')
    .put(isAuthecticatedUser, authorizeRole("admin"), updateProduct)
    .delete(isAuthecticatedUser, authorizeRole("admin"), deleteProduct)
    .get(getProductDetails);




module.exports = router;