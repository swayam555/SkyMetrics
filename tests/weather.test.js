const request = require('supertest');
const app = require('../src/server'); // Assuming server.js exports the app
const mongoose = require('mongoose');

describe('Weather API', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI);
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });

    it('should fetch weather data successfully', async () => {
        const res = await request(app).get('/api/weather/fetch');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Weather data processed successfully');
    });
});
