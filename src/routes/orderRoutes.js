const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.get('/:orderId', orderController.getOrderById);
router.post('/create', orderController.createOrder);
router.post('/cancel/:orderId', orderController.cancelOrder);
router.get('/all', orderController.getOrdersByUser);

module.exports = router;
