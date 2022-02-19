const express=require('express');
const { register,login,logout, forgotPassword, getUserProfile, updatePassword, updateProfile, getAllUsers, getUserDetails, UpdateUserProfile, DeleteUser, resetPassword} = require('../controllers/authControllers.js');
const { IsAuthenticatedUser, authorizeRoles } = require('../middlewares/auth.js');
const router= express.Router();

router.route('/register').post(register)
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/password/forgot').post(forgotPassword)
router.route('/password/reset/:token').put(resetPassword)

router.route('/update/password').put(IsAuthenticatedUser , updatePassword)
router.route('/me/update').put(IsAuthenticatedUser , updateProfile)
// so only admin can get all users
router.route('/admin/users').get(IsAuthenticatedUser,authorizeRoles('admin'), getAllUsers)
router.route('/admin/user/:id').get(IsAuthenticatedUser,authorizeRoles('admin'), getUserDetails)
.put(IsAuthenticatedUser, authorizeRoles('admin'), UpdateUserProfile ).delete(IsAuthenticatedUser, authorizeRoles('admin'), DeleteUser)
// my full profile
router.route('/me').get(IsAuthenticatedUser , getUserProfile)
module.exports = router;