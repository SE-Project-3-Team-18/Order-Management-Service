const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.get('/all', orderController.getOrdersByUser);
router.get('/:orderId', orderController.getOrderById);
router.post('/create', orderController.createOrder);
router.post('/cancel/:orderId', orderController.cancelOrder);

module.exports = router;
