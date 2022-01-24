const CatchAsyncerror = require('../middlewares/CatchAsyncerror.js')
const Products = require('../models/Products.js')
const ErrorHandler = require('../Utils/ErrorHandler.js')
const APIFeatures = require('../utils/apiFeatures');
// create new product /app/v1/product/new
exports.newProduct = CatchAsyncerror( async(req,res,next)=>{
  req.body.user=req.user.id;
   const product= await Products.create(req.body)
 
res.json({
    success: true,
    product,
})})

// get all products ..APIFeatures will be used ni get all products only
exports.allProducts =CatchAsyncerror(  async(req,res,next) =>{
  // throw new ErrorHandler('Product not found')
  const resPerpage = 4;
  const apiFeatures = new APIFeatures(Products.find(),req.query)
  .search()
  .filter()
  .pagination(resPerpage);
    const products = await apiFeatures.query;
    res.json({
        success:true,
        products,
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
// create and update uproduct review
exports.CreateProductReview = CatchAsyncerror(async(req,res,next)=>{
  const {rating, comment, productId} = req.body
  const newReview ={
    name: req.user.name,
    // we will give ratinds in strong in potman so convert in number
    rating: Number(rating),
    comment,
    user: req.user._id,
  };
// update existing review
const product = await Products.findById(productId);
// console.log(product);
const isReviewed = product.reveiws.find(
  (r) => r.user.toString() === req.user._id.toString()
)

if(isReviewed){
  product.reveiws.forEach((review)=>{
  if(review.user.toString() === req.user._id.toString())
  {
  review.comment = comment
  review.rating = rating
  }
})
}

else{
  product.reveiws.push(newReview)
  product.Numofreveiws=product.reveiws.length;
}
product.rating =
product.reveiws.reduce((acc,item)=> item.rating + acc ,0)/
product.reveiws.length;
await product.save({validateBeforeSave:false})

res.json({success:true})
})


// get all reviews
exports.getAllReviews = CatchAsyncerror(async(req,res,next)=>{

  const product = await Products.findById(req.query.id)
  // check db
  const reviews = product.reveiws
  const numofreviews=product.Numofreveiws

res.json({
  numofreviews,
  success:true,
  message:"cwc",
  reviews,
  
})
})
exports.deleteReview = CatchAsyncerror(async(req,res,next)=>{
  const product = await Products.findById(req.query.productId)

  const reviews = product.reveiws.filter(
    // check all review id's !== the one you wantot delete
    (review)=>review._id.toString() !== req.query.id.toString()
    )
    // why do we need review_id for
    // http://localhost:5500/api/v1/reviews?productId=61cdc73376343239506385a3&&id=61e87d3abdb0f934292644d4

  // cupdating some fields

  const Numofreveiws=reviews.length
const rating =
product.reveiws.reduce((acc,item)=> item.rating+acc,0) /
reviews.length

// { what i want to update}
await Products.findByIdAndUpdate(req.query.productId, {reviews,Numofreveiws, rating},{
  new:true,
  runValidators:true,
  useFindAndModify:false
})

res.json({
  sucess:true
})
})