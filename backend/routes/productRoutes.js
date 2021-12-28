const {
    newProduct,
    allProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,}
    = require("../controllers/ProductControllers");

const express=require("express")
const router= express.Router()
// /admin/ bec only admin can CREATE PRODUCT
router.route('/admin/product/new').post(newProduct);
router.route('/products').get(allProducts);
router.route('/product/:id').get(getSingleProduct);
router.route('/admin/product/:id').put(updateProduct).delete(deleteProduct);
module.exports=router;
// imp to import controller and express