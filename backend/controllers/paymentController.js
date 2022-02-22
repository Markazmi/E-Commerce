
const stripe=require('stripe')(process.env.STRIPE_SECRET_KEY)
const CatchAsyncErrors = require('../middlewares/CatchAsyncerror.js');

exports.processPayment= CatchAsyncErrors(async(req,res,next)=>{
    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency:"usd",
        metadata:{
            integration_check:'accept_a_payment',
        }
    })
    res.status(200).json({
        success:true,
        client_secret:paymentIntent.client_secret,
    })
})
exports.sendStripeApiKey=CatchAsyncErrors(async(req,res,next)=>{
    res.json({
        stripeApiKey:process.env.STRIPE_API_KEY,
    })
})