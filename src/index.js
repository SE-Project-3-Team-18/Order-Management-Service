const app = require('./app')
const http = require('http')
const config = require('./config/config')
// eslint-disable-next-line max-len
const { paymentCreatedListener } = require('./eventhandlers/paymentCreatedListener');
const { createOrder } = require('./services/orderService');
const ServiceRegistryClient = require('./utils/serviceRegistry')
const server = http.createServer(app)

const serviceRegistryClientInstance = new ServiceRegistryClient()
serviceRegistryClientInstance.initialise()

server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})

paymentCreatedListener(
  config.NATS_SUBJECT,
  createOrder
);
