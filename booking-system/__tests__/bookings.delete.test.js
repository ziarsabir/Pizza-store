// SETUP

// ACT 

// ASSERT

const request = require('supertest');

jest.mock('../utils/database', () => ({
  initializeDatabase: jest.fn(),
  readBookings: jest.fn(),
  writeBookings: jest.fn(),
  getBookingById: jest.fn(),
  createBooking: jest.fn(),
  updateBooking: jest.fn(),
  deleteBooking: jest.fn(),
  getBookingsByDate: jest.fn(),
  getBookingsByStatus: jest.fn(),
  getAllBookingsFlat: jest.fn(),
}));

const app = require('../app');
const db = require('../utils/database');

describe('DELETE /api/bookings/:id', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('deletes a booking and returns 200', async () => {
    db.deleteBooking.mockResolvedValue(true);

    const res = await request(app).delete('/api/bookings/test-id');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe('Booking deleted successfully');
    expect(db.deleteBooking).toHaveBeenCalledWith('test-id');
  });

  test('returns 404 when booking is not found', async () => {
    db.deleteBooking.mockResolvedValue(false);

    const res = await request(app).delete('/api/bookings/non-existent-id');

    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe('Booking not found');
    expect(db.deleteBooking).toHaveBeenCalledWith('non-existent-id');
  });
});