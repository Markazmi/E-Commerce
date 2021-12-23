const Products = require("../backend/models/Products")

exports.newProduct = async(req,res)=>{
   const product= Products.create(req.nody)
res.json({
    success: true,
    product,

})}