const CatchAsyncerror = require('../middlewares/CatchAsyncerror.js')
const Products = require('../models/Products.js')
const ErrorHandler = require('../Utils/ErrorHandler.js')
const APIFeatures = require('../utils/apiFeatures');
// create new product /app/v1/product/new
exports.newProduct = CatchAsyncerror( async(req,res,next)=>{
   const product= await Products.create(req.body)
res.json({
    success: true,
    product,
})})

// get all products ..APIFeatures will be used ni get all products only
exports.allProducts =CatchAsyncerror(  async(req,res,next) =>{
  const resPerpage = 4;
  const apiFeatures = new APIFeatures(Products.find(),req.query)
  .search()
  .filter()
  .pagination(resPerpage);
    const product = await apiFeatures.query;
    res.json({
        success:true,
        NumberofProfucts: product.length,
        product,
    })
})
// products. is a collection // get single product(using id)
exports.getSingleProduct = CatchAsyncerror(async(req,res,next) =>{
const product= await Products.findById(req.params.id);
if(!product){
return next(
    new ErrorHandler(`product not found with id ${req.params.id}`, 400)
)}
res.json({
    success: true,
    product,
})
})

// update a product // first find to check if the product exists or not
exports.updateProduct = CatchAsyncerror(async (req, res, next) => {
    let product = await Products.findById(req.params.id);
    if (!product)
      return next(
        new ErrorHandler(`Product not found with id ${req.params.id}`, 400)
      );
  
    product = await Products.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.json({
      success: true,
      product,
    });
  })
  

// delete a product
exports.deleteProduct= CatchAsyncerror(async (req,res,next) => {
    const product = await Products.findById(req.params.id)
        if(!product){
            return next(
                new ErrorHandler(`Product not found with id ${req.params.id}`, 400)
)}   
// product.remove instead if products bec we want to delete only one specific id stores in pproduct if you do Products.remove, whole collection will be deleted
await product.remove();
res.json({success:true,
message:"product deleted"
});
})