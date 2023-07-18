const express = require('express');
const { isAuthenticatedUser, authorizeRole } = require("../middleware/auth");
const router = express.Router();
const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder } = require('../controllers/orderController');




router.route("/order/new").post(isAuthenticatedUser, newOrder);
router.route("/orderDetail/:id").get(isAuthenticatedUser, getSingleOrder);

router.route("/orders/me").get(isAuthenticatedUser, myOrders);

router.route("/admin/orders").get(isAuthenticatedUser, authorizeRole("admin"), getAllOrders)

router.route("/admin/order/:id")
    .put(isAuthenticatedUser, authorizeRole("admin"), updateOrder)
    .delete(isAuthenticatedUser, authorizeRole("admin"), deleteOrder);

module.exports = router;
