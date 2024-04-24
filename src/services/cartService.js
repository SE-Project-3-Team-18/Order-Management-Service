/* eslint-disable max-len */
const ServiceRegistryClient = require('../utils/serviceRegistry');
const axios = require('axios');

async function getCartDetails(userId) {
  try {
    const CartServiceUrl = await ServiceRegistryClient.getInstance().getUrl('Cart');
    const url = new URL(`/api/view/${userId}`, CartServiceUrl).toString()
    const response = await axios.get(url);

    const data = response.data;

    return data;
  } catch (error) {
    console.error('Error fetching cart details:', error.message);
    throw error;
  }
}

async function clearCart(userId) {
  try{
    const CartServiceUrl = await ServiceRegistryClient.getInstance().getUrl('Cart');
    const url = new URL(`/api/clear-cart/${userId}`, CartServiceUrl).toString()
    const response = axios.delete(url);
    return response.data;
  } catch (error) {
    console.error('Error in clearing cart:', error.message);
    throw error;
  }
}

module.exports = { getCartDetails, clearCart };
