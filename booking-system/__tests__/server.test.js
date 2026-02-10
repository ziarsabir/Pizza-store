const request = require('supertest'); 
const path = require('path'); 
const app = require(path.join(__dirname, '..', 'app')); 

describe('API basics', () => {
    test('GET / returns API info', async () => {
        const res = await request(app).get('/'); 

        expect(res.status).toBe(200); 
        expect(res.body).toHaveProperty('message', 'Pizza Store Booking API'); 
        expect(res.body).toHaveProperty('endpoints'); 
        expect(res.body.endpoints).toHaveProperty('bookings', '/api/bookings'); 
    });

    test('Unknown route returns 404 JSON', async () => {
        const res = await request(app).get('/does-not-exist'); 

        expect(res.status).toBe(404); 
        expect(res.body).toEqual({ message: 'Route not found' }); 
    }); 
}); 

// API BASICS TESTING: 

//Passed tests mean that: 1. Express app responds correctly on /, 2. My 404 handler returns JSON properly, 3. My test runner is being correctly wired up. 