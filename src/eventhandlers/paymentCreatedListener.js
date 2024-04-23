const { connect, StringCodec } = require('nats');

async function paymentCreatedListener(subject, createOrder) {
  const client = await connect({
    servers: 'nats://localhost:4222',
  });
  console.log('Listener connected to NATS');
  const sc = StringCodec();
  client.subscribe(subject, {
    queue: 'order-service',
    callback: (err, msg) => {
      if (err) {
        console.log(err.message);
      } else {
        console.log(`Received message: ${sc.decode(msg.data)}`);
        createOrder(sc.decode(msg.data));
      }
    },
  });
}

module.exports = { paymentCreatedListener };
