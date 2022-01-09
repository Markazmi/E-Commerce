const express=require('express');
const { register,login,logout, forgotPassword } = require('../controllers/authControllers.js');
const router= express.Router();

router.route('/register').post(register)
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/password/forgot').get(forgotPassword)
module.exports = router;