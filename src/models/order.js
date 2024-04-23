const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderStatus = {
  pending: 'pending',
  completed: 'delivered',
  cancelled: 'cancelled',
};

const OrderItemSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    products: [OrderItemSchema],

    customerAddress: {
      line1: { type: String, required: true },
      line2: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
      postal_code: { type: String, required: true },
    },
    paymentId: {
      type: Schema.Types.ObjectId,
      ref: 'Payment',
    },
    orderStatus: {
        type: String,
        enum: Object.values(orderStatus),
        default: orderStatus.pending
    },
    checkoutSessionId: {
        type: String,
        default: null
    },
    isOrderDelivered: {
        type: Boolean,
        default: false
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', OrderSchema);
