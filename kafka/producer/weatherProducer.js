const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: 'skymetrics',
    brokers: ['localhost:9092'],
});

const producer = kafka.producer();

const sendAlert = async (message) => {
    await producer.connect();
    await producer.send({
        topic: 'weather-alerts',
        messages: [{ value: message }],
    });
    await producer.disconnect();
};

module.exports = {
    sendAlert,
};
