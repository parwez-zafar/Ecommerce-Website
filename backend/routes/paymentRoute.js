const express = require('express');
const router = express.Router();

const { processPayment, sendStripeApiKey } = require('../controllers/paymentControler');

const { isAuthenticatedUser } = require('../middleware/auth')

router.route('/process/payment').post(isAuthenticatedUser, processPayment);

router.route('/stripeapikey').get(isAuthenticatedUser, sendStripeApiKey)

module.exports = router;