const {
  connect,
  // StringCodec
} = require('nats');

async function orderCancelledPublisher(subject, paymentId) {
  const client = await connect({
    servers: ['nats://127.0.0.1:4222'],
  });
  // const sc = StringCodec();
  console.log('Publisher connected to NATS');
  client.publish(subject, JSON.stringify(paymentId));
}

module.exports = { orderCancelledPublisher };
