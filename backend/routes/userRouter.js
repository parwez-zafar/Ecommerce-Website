const express = require('express');
const { registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails, updatePassowrd, updateProfile, } = require('../controllers/userController');

const { isAuthenticatedUser, authorizeRole } = require('../middleware/auth')
const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/password/forgot').post(forgotPassword)
router.route('/password/reset/:token').put(resetPassword)
router.route('/logout').get(logout);

router.route('/me').get(isAuthenticatedUser, getUserDetails)

router.route('/password/update').put(isAuthenticatedUser, updatePassowrd)
router.route('/me/update').put(isAuthenticatedUser, updateProfile)


module.exports = router;