const axios = require('axios');
const Weather = require('../models/weatherModel');
const { sendWeatherAlert } = require('./kafkaService'); // Import Kafka service for alerts

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const CITIES = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];

const fetchWeatherData = async (city) => {
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHER_API_KEY}&units=metric`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching weather data for ${city}:`, error);
    return null;
  }
};

const processWeatherData = async () => {
  for (const city of CITIES) {
    const data = await fetchWeatherData(city);
    if (data) {
      const weatherData = {
        city: data.name,
        date: new Date().toISOString().split('T')[0], // Get current date in YYYY-MM-DD format
        averageTemp: data.main.temp,
        maxTemp: data.main.temp_max,
        minTemp: data.main.temp_min,
        dominantCondition: data.weather[0].description,
      };

      await saveWeatherData(weatherData);
    }
  }
};

const saveWeatherData = async (weatherData) => {
  try {
    const existingRecord = await Weather.findOne({ city: weatherData.city, date: weatherData.date });
    if (existingRecord) {
      // Update existing record
      existingRecord.averageTemp = weatherData.averageTemp;
      existingRecord.maxTemp = weatherData.maxTemp;
      existingRecord.minTemp = weatherData.minTemp;
      existingRecord.dominantCondition = weatherData.dominantCondition;
      await existingRecord.save();
    } else {
      // Create a new record
      const newWeather = new Weather(weatherData);
      await newWeather.save();
    }

    // Check for alert conditions
    if (weatherData.averageTemp > 35) {
      sendWeatherAlert(`Alert: High temperature in ${weatherData.city}: ${weatherData.averageTemp}°C`);
    }
  } catch (error) {
    console.error('Error saving weather data:', error);
  }
};

module.exports = {
  processWeatherData,
};
