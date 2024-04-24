const { connect, StringCodec } = require('nats');

async function paymentCreatedListener(subject, createOrder) {
  const client = await connect({
    servers: 'nats://localhost:4222',
  });
  console.log('Listener connected to NATS');
  const sc = StringCodec();
  client.subscribe(subject, {
    queue: 'payment-listener',
    callback: (err, msg) => {
      if (err) {
        console.log(err.message);
      } else {
        const message = JSON.parse(sc.decode(msg.data))
        console.log(`Received message: ${sc.decode(msg.data)}`);
        createOrder(message);
      }
    },
  });
}

module.exports = { paymentCreatedListener };
