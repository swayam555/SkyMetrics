const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const weatherRoutes = require('./routes/weatherRoutes');
const alertRoutes = require('./routes/alertRoutes');
const { runProducer } = require('./services/kafkaService');
const { processWeatherData } = require('./services/weatherService');
const { wss } = require('./websockets/wsServer'); // Import the WebSocket server

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Routes
app.use('/api/weather', weatherRoutes);
app.use('/api/alerts', alertRoutes);

// Start the Kafka producer
runProducer();

// Periodically process weather data
setInterval(processWeatherData, 300000); // Fetch weather data every 5 minutes

// Create an HTTP server using Express
const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});

// Integrate WebSocket server with the HTTP server
server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});
