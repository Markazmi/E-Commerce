
const Products = require('../models/Products.js')
const ErrorHandler = require('../Utils/ErrorHandler.js')

// create new product /app/v1/product/new
exports.newProduct = async(req,res,next)=>{
   const product= await Products.create(req.body)
res.json({
    success: true,
    product,
})}

// get all products
exports.allProducts =  async(req,res,next) =>{
    const product = await Products.find()
    res.json({
        success:true,
        NumberofProfucts: product.length,
        product,
    })
}
// products. is a collection // get single product(using id)
exports.getSingleProduct =  async(req,res,next) =>{
const product= await Products.findById(req.params.id);
if(!product){
return next(
    new ErrorHandler(`product not found with id ${req.params.id}`, 400)
)}
res.json({
    success: true,
    product,
})
}

// update a product // first find to check if the product exists or not
exports.updateProduct = async (req, res, next) => {
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
  };
  

// delete a product
exports.deleteProduct= async (req,res,next) => {
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
}