const orderService = require('../services/orderService');
// eslint-disable-next-line max-len
const { orderCancelledPublisher } = require('../eventhandlers/orderCancelledPublisher');

async function cancelOrder(req, res, next) {
  try {
    const orderId = req.params.orderId;
    const order = orderService.getOrderDetails(orderId);
    if (!order) {
      return res.status(404).json({
        message: `Cannot find order with the id: ${orderId}.`,
      });
    }
    const paymentId = order.paymentId;
    orderCancelledPublisher('order:cancelled', paymentId);
  } catch (error) {
    next(error);
  }
}

async function getOrderById(req, res, next) {
  try {
    const orderId = req.params.orderId;
    const order = await orderService.getOrderDetails(orderId);
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
    const userId = req.body.userId;
    const orders = await orderService.getOrdersOfUser(userId);
    res.status(200).json({
      orders,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { cancelOrder, getOrderById, getOrdersByUser };
