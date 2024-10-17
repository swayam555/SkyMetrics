document.getElementById('fetchWeather').addEventListener('click', async () => {
    try {
        const response = await fetch('/api/weather/fetch');
        const data = await response.json();
        document.getElementById('weatherData').innerText = JSON.stringify(data, null, 2);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
});
