
const { newProduct } = require('../../controllers/Productcontroller');

const router=require("express").Router();

router.route('/addproduct').post(newProduct);


module.exports=router;
// imp to e=import controller nd express