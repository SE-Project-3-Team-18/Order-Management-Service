const Order = require('../models/order')
const cartService = require('./cartService');
const { sendEmail } = require('./notificationService');
const createOrder = async (data) => {
  const userCart = await cartService.getCartDetails(data.userId)
  const customerAddress = JSON.parse(data.address);
  const products = userCart.items.map(item => ({
    productId: item.productId,
    name: item.name,
    price: item.price,
    quantity: item.cartQuantity,
    imageUrl: item.imageUrl,
  }
  ));

  const newOrder = new Order({
    userId: data.userId,
    products,
    customerAddress,
    paymentId: data.paymentId,
  });

  try {
    await newOrder.save();
  } catch (err) {
    console.error('Error saving payment details:', err);
  }
  try {
    await sendEmail(data.userId)
  } catch (err) {
    console.error('Error sending email:', err);
  }
};

const getOrderDetails = async (orderId) => {
  try {
    const order = await Order.findById(orderId);
    return order;
  } catch (err) {
    console.error('Error fetching order details:', err);
  }
}

const getOrdersOfUser = async (userId) => {
  try {
    const orders = await Order.find({ userId });
    return orders;
  } catch (err) {
    console.error('Error fetching orders by user:', err);
    throw err; // Propagate the error to the caller
  }
}

module.exports = { createOrder, getOrderDetails, getOrdersOfUser }
