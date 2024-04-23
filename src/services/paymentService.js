const ServiceRegistryClient = require('../utils/serviceRegistry');
const { CustomError } = require('../utils/error');
const axios = require('axios');

async function getPaymentDetailsById(paymentId) {
  try {
    // eslint-disable-next-line max-len
    const PaymentServiceUrl = await ServiceRegistryClient.getInstance().getUrl('Payment');
    const response = await axios.get(`${PaymentServiceUrl}/get`,
      { params: { paymentId } }
    );

    if (!response.ok) {
      throw new CustomError('HTTP error! in fetching cart details', 500, false);
    }

    const data = await response.json();
    console.log('payment data from order service side', data);
  } catch (error) {
    console.error('Error fetching cart details:', error.message);
    throw error;
  }
}

module.exports = { getPaymentDetailsById };
