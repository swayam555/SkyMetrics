const request = require('supertest');
const app = require('../src/server'); // Assuming server.js exports the app

describe('Alert API', () => {
    it('should fetch alerts successfully', async () => {
        const res = await request(app).get('/api/alerts');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Alerts fetched successfully');
    });
});
