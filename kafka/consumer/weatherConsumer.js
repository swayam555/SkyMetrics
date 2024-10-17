const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: 'skymetrics',
    brokers: ['localhost:9092'],
});

const consumer = kafka.consumer({ groupId: 'weather-group' });

const runConsumer = async () => {
    await consumer.connect();
    await consumer.subscribe({ topic: 'weather-alerts', fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log(`Received alert: ${message.value.toString()}`);
            // Additional processing for alerts can be added here
        },
    });

    console.log('Kafka Consumer connected');
};

runConsumer().catch(console.error);
