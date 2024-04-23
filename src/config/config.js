require('dotenv')
  .config()

const PORT = process.env.PORT
const SERVICE_NAME = process.env.SERVICE_NAME
const SERVICE_HOST = process.env.SERVICE_HOST

const MONGODB_URI = process.env.ATLAS_URI

const SERVICE_REGISTRY_BASE_URI = 'http://localhost:3001'

const NATS_CLUSTERID = 'paymentcreation_cluster';
const NATS_CLIENTID = 'paymentcreation-client';
const NATS_SUBJECT = 'payment:created';
const NATS_QUEUEGROUPNAME = 'order-service';

module.exports = {
  PORT,
  SERVICE_NAME,
  SERVICE_HOST,
  MONGODB_URI,
  SERVICE_REGISTRY_BASE_URI,
  NATS_CLUSTERID,
  NATS_CLIENTID,
  NATS_SUBJECT,
  NATS_QUEUEGROUPNAME,
}
