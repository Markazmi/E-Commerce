const express = require('express');
const { processPayment, sendStripeApiKey } = require('../controllers/paymentController');
const router= express.Router()
const { IsAuthenticatedUser} = require('../middlewares/auth');

router.route('/payment/process').post(IsAuthenticatedUser, processPayment)
router.route('/stripeapi').get(IsAuthenticatedUser, sendStripeApiKey)

module.exports=router;