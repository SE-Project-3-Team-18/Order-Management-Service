const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// router.post('/api/orders', orderController.createOrder);
// router.get('/api/orders', orderController.getOrders);
router.get('orders/:orderId', orderController.getOrderById);
// router.delete('/api/orders/:orderId', orderController.deleteOrder);
router.post('cancel/:orderId', orderController.cancelOrder);
router.get('orders', orderController.getOrdersByUser);
