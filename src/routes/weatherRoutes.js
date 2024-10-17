const express = require('express');
const { fetchWeatherData } = require('../controllers/weatherController');

const router = express.Router();

// Endpoint to trigger fetching and processing of weather data
router.get('/fetch', fetchWeatherData);

module.exports = router;
