const express = require('express');
const router= express.Router()
const { newOrder, getSingleOrder, getAllOrders, getAdminAllOrders, updateOrder, deleteOrder } = require('../controllers/orderControllers');
const { IsAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/order/new').post(IsAuthenticatedUser, newOrder)
router.route('/order/:id').get(IsAuthenticatedUser, getSingleOrder)
router.route('/orders/me').get(IsAuthenticatedUser, getAllOrders)
router.route('/admin/orders').get(IsAuthenticatedUser, authorizeRoles('admin'), getAdminAllOrders)
router.route('/admin/order/:id').put(IsAuthenticatedUser, authorizeRoles('admin'), updateOrder)
.delete(IsAuthenticatedUser, authorizeRoles('admin'), deleteOrder)

module.exports = router;