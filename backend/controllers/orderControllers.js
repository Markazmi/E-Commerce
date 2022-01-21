// const ErrorHandler = require('../Utils/ErrorHandler.js')
const CatchAsyncErrors = require('../middlewares/CatchAsyncerror.js');
const Order = require('../models/Order');
const Products = require('../models/Products.js');
const ErrorHandler = require('../Utils/ErrorHandler.js');
const { updatePassword } = require('./authControllers.js');
exports.newOrder = CatchAsyncErrors(async (req,res,next)=>{
   const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
        } = req.body;
const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt:Date.now() ,
    user: req.user._id
})
res.json({
    success:true,
    message: "New order!!",
    order
})
})

exports.getSingleOrder = CatchAsyncErrors(async(req,res,next)=>{
    const order = await Order.findById(req.params.id)
    .populate('user', 'name email')
    // popluate gets user name and email other than just id
    if(!order)
    return next (new ErrorHandler('Order not found', 400).populate('User', 'name email')
    // populate is to show the name and email of the user
    )

    res.json({
        success:true,
        order,
    })

})
// user can see all his orders
exports.getAllOrders = CatchAsyncErrors(async(req,res,next)=>{
    const orders = await Order.find({user: req.user.id})

    res.json({
        success:true,
        orders,
    })
})

exports.getAdminAllOrders = CatchAsyncErrors(async(req,res,next)=>{
    const orders = await Order.find({})

    let totalAmount = 0;
    orders.forEach((order)=>{
        totalAmount+=order.totalPrice
    })
    res.json({
        success:true,
        totalAmount,
        orders
    })
})

exports.updateOrder=CatchAsyncErrors(async(req,res,next)=>{

const order = await Order.findById(req.params.id)
console.log(order);
// check the orderstatus... if delivered
if(order.orderStatus === 'Delivered'){
return next (new ErrorHandler('Order is delivered',400))
}
// if order is noy delivered yet
order.orderItems.forEach(async(item)=>{
    // get product id and quanity from "ordetitems" so this way
    // you can find this product in PRODUCTS DB so u can update stock
    await updateStock(item.product,item.quantity)
})
order.orderStatus=req.body.orderStatus
order.deliveredAt= Date.now();

await order.save()
res.json({
    success:true
})
})
async function updateStock(id, quantity){
const product = await Products.findById(id)
product.stock = product.stock - quantity
await product.save({validateBeforeSave:false})
}
exports.deleteOrder = CatchAsyncErrors(async(req,res,next)=>{
    const order = await Order.findById(req.params.id)
    if(!order){
        return next (new ErrorHandler('Order not found',400))
    }

   await order.remove()
   res.json({message:"order deleted"})
})