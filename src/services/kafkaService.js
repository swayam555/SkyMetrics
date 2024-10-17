const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'skymetrics',
  brokers: ['localhost:9092'], // Change this if your Kafka broker is running on a different host
});

const producer = kafka.producer();

const sendWeatherAlert = async (message) => {
  await producer.send({
    topic: 'weather-alerts',
    messages: [{ value: message }],
  });
};

const runProducer = async () => {
  await producer.connect();
  console.log('Kafka Producer connected');
};

module.exports = {
  sendWeatherAlert,
  runProducer,
};
