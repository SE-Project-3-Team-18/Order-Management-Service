/* eslint-disable max-len */
const orderService = require('../services/orderService');
const Order = require('../models/order');
const config = require('../config/config');
// eslint-disable-next-line max-len
const { orderCancelledPublisher } = require('../eventhandlers/orderCancelledPublisher');

async function cancelOrder(req, res, next) {
  try {
    const orderId = req.params.orderId;
    const userId = req.get('X-User-Id');
    const order = await orderService.getOrderDetails(orderId);
    if (!order) {
      return res.status(404).json({
        message: `Cannot find order with the id: ${orderId}.`,
      });
    }
    if (order.userId !== userId) {
      return res.status(403).json({
        message: 'You are not authorized to cancel this order.',
      });
    }
    if (order.orderStatus === 'cancelled') {
      return res.status(400).json({
        message: `Order with id ${orderId} is already cancelled.`,
      })
    }
    if (order.orderStatus === 'delivered') {
      return res.status(400).json({
        message: `Order with id ${orderId} is already delivered.`,
      })
    }
    const paymentId = order.paymentId;
    orderCancelledPublisher(config.ORDER_CANCELLED, paymentId);
    // eslint-disable-next-line no-unused-vars
    const updatedOrder = await Order.findByIdAndUpdate(orderId, { orderStatus: 'cancelled' }, { new: true });
    res.status(200).json({
      message: 'Order with id ' + orderId + ' has been cancelled successfully.',
    });
  } catch (error) {
    next(error);
  }
}

async function getOrderById(req, res, next) {
  try {
    const orderId = req.params.orderId;
    const userId = req.get('X-User-Id');
    const order = await orderService.getOrderDetails(orderId);
    if (order.userId !== userId) {
      return res.status(403).json({
        message: 'You are not authorized to view this order.',
      });
    }
    if (!order) {
      return res.status(404).json({
        message: `Cannot find order with the id: ${orderId}.`,
      });
    }
    res.status(200).json({
      order,
    });
  } catch (error) {
    next(error);
  }
}

async function getOrdersByUser(req, res, next) {
  try {
    const userId = req.get('X-User-Id');
    const orders = await orderService.getOrdersOfUser(userId);
    if (!orders) {
      return res.status(404).json({
        message: `Cannot find orders for the user with id: ${userId}.`,
      });
    }
    if (orders.length === 0) {
      return res.status(200).json({
        message: 'No orders found for the user.',
      });
    }
    if (orders[0].userId !== userId) {
      return res.status(403).json({
        message: 'You are not authorized to view these orders.',
      });
    }
    res.status(200).json({
      orders,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { cancelOrder, getOrderById, getOrdersByUser };
