const express=require('express');
const { register,login } = require('../controllers/authControllers.js');
const router= express.Router();

router.route('/register').post(register)
router.route('/login').post(login);
// router.route('/logout').get(logout)
module.exports = router;