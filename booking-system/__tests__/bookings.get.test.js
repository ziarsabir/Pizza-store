const request = require('supertest'); 

// Setup 
jest.mock('../utils/database', () => ({
    readBookings: jest.fn(), 
    getBookingsByDate: jest.fn(), 
    getBookingsByStatus: jest.fn(), 
}));

const app = require('../app');
const db = require('../utils/database'); 

describe('GET /api/bookings', () => {
    test('returns fake bookings and returns 200 status code', async () => {

        //Setup (defining what the mocked database should return)
        const fakeBookings = [
            {
                id: '1', 
                customerName: 'Ziar Sabir', 
                date: '2026-02-09', 
                time: '19:30', 
                status: 'confirmed'
            }
        ]; 

        db.readBookings.mockResolvedValue(fakeBookings); 

        // Act 
        const res = await request(app).get('/api/bookings'); 

        // Assert 
        expect(res.status).toBe(200); 
        expect(res.body.success).toBe(true); 
        expect(res.body.count).toBe(1); 
        expect(res.body.data).toHaveLength(1); 
        expect(res.body.data[0].customerName).toBe('Ziar Sabir'); 


    })
}); 



