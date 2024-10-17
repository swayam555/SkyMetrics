const weatherService = require('../services/weatherService');

const fetchWeatherData = async (req, res) => {
  try {
    await weatherService.processWeatherData();
    res.status(200).json({ message: 'Weather data processed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error processing weather data' });
  }
};

module.exports = {
  fetchWeatherData,
};
