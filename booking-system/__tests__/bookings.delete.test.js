// Setup 

// Mock deleteBooking() to return true. 


// ACT 

// Send: DELETE /api/bookings/:id 

// ASSERT 

// Status = 200 
// Success = true 
// message = "Booking deleted successfully"

const request = require('supertest'); 

// Setup: mock database layer 
jest.mock('../utils/database', () => ({
    deleteBooking: jest.fn(), 
})); 

const app = require('../app'); 
const db = require('../utils/database'); 

describe('DELETE /api/bookings/:id', () => {
    // testing success path 
    test('deletes a booking and returns 200', async () => {

        // Setup
        db.deleteBooking.mockResolvedValue(true); 

        // Act 
        const res = await request(app).delete('/api/bookings/test-id'); 

        // Assert 
        expect(res.status).toBe(200); 
        expect(res.body.success).toBe(true); 
        expect(res.body.message).toBe('Booking deleted successfully'); 
    }); 

    // testing failure path 
    test('returns 404 when booking is not found', async () => {
        // Setup
        db.deleteBooking.mockResolvedValue(false); 

        // Act
        const res = await request(app).delete('/api/bookings/non-existent-id'); 

        // Assert 
        expect(res.status).toBe(404); 
        expect(res.body.success).toBe(false); 
        expect(res.body.message).toBe('Booking not found'); 
    }); 
}); 


