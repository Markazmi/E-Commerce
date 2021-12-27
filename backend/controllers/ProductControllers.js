// const res = require('express/lib/response')
const Products = require('../models/Products.js')
const Errorhandler = require('../Utils/ErrorHandler.js')

// create new product /app/v1/product/new
exports.newProduct = async(req,res,next)=>{
   const product= await Products.create(req.body)
res.json({
    success: true,
    product,
})}

// get all products

exports.allProducts = async(req,res,next) =>{
    const product = await Products.find()
    res.json({
        success:true,
        NumberofProfucts: product.length,
        product,
    })
}
// products. is a collection
// get single product??by id
exports.getSingleProduct = async(req,res,next) =>{
const product= Products.findById(req.params.id);
if(!product){

 res.status(400).json({
        success:false,
        message:'Product not found'
    })
}
res.json({
    success: true,
    product,
})
}

// update a product
// first find to check if the product exists or not
exports.updateProduct=async(req,res,next)=> {
    // use let product so we can redeclare
    let product= await Products.findById(req.params.id)
    if(!product){
res.status(400).json({
    success:false,
    message:"product not found",
})
    }
// if product found/exists
product= await Products.findByIdAndUpdate(req.params.id,req.body, {
    new:true,
    runValidators:true,
    useFindAndModify: false,
})
res.json({
    success:true,
    message:"product found",
    product,
})
}

// delete a product
exports.deleteProduct=async (req,res,next) => {
    const product = await Products.findById(req.params.id)
        if(!product){
            return next(
                new Errorhandler(`Product not found with id ${req.params.id}, 400`)
            )
// res.status(400).json({
// success:false,
// message: "Product not found",
// })
}   
await product.remove();
res.json({success:true,
message:"product deleted"
});
}