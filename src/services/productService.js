
// const ServiceRegistryClient = require('../utils/serviceRegistry');
// const { CustomError } = require('../utils/error');

// async function fetchProductDetails(productId) {
//   try {
//     const ProductServiceUrl = await ServiceRegistryClient.getInstance().getUrl('Product')
//     const response = await fetch(`${ProductServiceUrl}/api/get-product`, {
//       method: "GET",
//     });

//     if (!response.ok) {
//       throw new CustomError('HTTP error! in fetching product details', 500, false);
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error fetching product details:", error.message);
//     throw error;
//   }
// }

// // adding this function for testing purpose

// async function getProductDetails(productId) {
//   const products = {
//       'product-id-1': {
//           productId: 'product-id-1',
//           name: 'Product One',
//           price: 10.00,
//           quantity: 1
//       },
//       'product-id-2': {
//           productId: 'product-id-2',
//           name: 'Product Two',
//           price: 20.00,
//           quantity: 1
//       }
//   };

//   // Check if the product exists in the dummy data
//   if (products[productId]) {
//       return products[productId];
//   } else {
//       // Throw an error if no product matches the provided ID
//       throw new CustomError(`Product not found for ID: ${productId}`, 404, false);
//   }
// }

// module.exports = { fetchProductDetails, getProductDetails };