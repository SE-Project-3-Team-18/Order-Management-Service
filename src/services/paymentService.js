const ServiceRegistryClient = require('../utils/serviceRegistry');
const axios = require('axios');

async function getPaymentDetailsById(paymentId) {
  try {
    // eslint-disable-next-line max-len
    const PaymentServiceUrl = await ServiceRegistryClient.getInstance().getUrl('Payment');
    const url = new URL(`/api/payment/get/${paymentId}`, PaymentServiceUrl).toString();
    const response = await axios.get(url);

    const data = response.data;
    console.log('payment data from order service side', data);
  } catch (error) {
    console.error('Error fetching cart details:', error.message);
    throw error;
  }
}

async function refundPayment(paymentId) {
  try {
    const PaymentServiceUrl = await ServiceRegistryClient.getInstance().getUrl('Payment');
    const url = new URL(`/api/payment/refund/${paymentId}`, PaymentServiceUrl).toString();
    const response = await axios.post(url);
    const data = response.data;
    console.log('payment response from order service side', data);
  } catch (error) {
    console.error('Error while sending payment details to order service side', error);
    throw error;
  }
}

module.exports = { getPaymentDetailsById, refundPayment };
