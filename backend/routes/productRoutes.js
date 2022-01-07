const {
    newProduct,
    allProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,}
    = require("../controllers/ProductControllers");

const express=require("express");
const { IsAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");
const router= express.Router()
// /admin/ bec only admin can CREATE PRODUCT
router.route('/admin/product/new').post(IsAuthenticatedUser, newProduct);
router.route('/products').get(allProducts);
router.route('/product/:id').get(getSingleProduct);
router.route('/admin/product/:id')
.put(IsAuthenticatedUser, updateProduct)
.delete(IsAuthenticatedUser , deleteProduct);
module.exports=router;
// imp to import controller and express