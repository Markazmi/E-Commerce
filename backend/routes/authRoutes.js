const express=require('express');
const { register } = require('../controllers/authControllers.js');
const router= express.Router();

router.route('/register').post(register)

module.exports = router;