
const ServiceRegistryClient = require('../utils/serviceRegistry');
const { CustomError } = require('../utils/error');
const axios = require('axios');

async function increaseProductQuantity(items){
  try {
    const ProductServiceUrl = await ServiceRegistryClient.getInstance().getUrl('Product');
    const newObject = {
      cart : items
    }
    const response = await axios.put(`${ProductServiceUrl}/api/product/refund`, newObject);
    return response.data; 
  } catch (error) {
    console.error("Error fetching product details:", error.message);
    throw error;
  }
}

module.exports = {increaseProductQuantity};
