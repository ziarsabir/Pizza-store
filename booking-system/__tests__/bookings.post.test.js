// Notes while testing POST /api/bookings:

// Goal: Test the behaviour of the route itself, not the database file writing.
// I want to confirm that:
// 1. Valid input returns 201
// 2. The response structure matches what the frontend expects
// 3. Business rules (validation + conflict check) affect status codes properly

// Important consideration:
// Since createBooking() writes to a JSON file, I don't want my test
// polluting the real data file or becoming state-dependent.

// Approach:
// - Mock the database layer so no real file writes happen.
// - Mock validation functions so I can control "happy path" vs "failure path".
// - Keep the test focused on route behaviour (status codes + response JSON).

// Why mock?
// Because this is a route-level test, not an integration test.
// I want to isolate the Express logic from persistence logic.

// Things to assert:
// - HTTP status (201 for success)
// - success flag
// - returned booking includes generated id + forced "confirmed" status
// - returned data contains submitted fields



const request = require('supertest');

// Mock uuid so the ID is predictable
jest.mock('uuid', () => ({
  v4: () => 'test-uuid-123',
}));

// Mock database functions so tests don’t touch my real JSON file
jest.mock('../utils/database', () => ({
  getBookingsByDate: jest.fn(),
  createBooking: jest.fn(),
  readBookings: jest.fn(),
  getBookingById: jest.fn(),
  updateBooking: jest.fn(),
  deleteBooking: jest.fn(),
  getBookingsByStatus: jest.fn(),
}));

// Mock validation so I can control pass/fail cases
jest.mock('../utils/validation', () => ({
  validateBooking: jest.fn(),
  validateTimeSlot: jest.fn(),
  checkTimeSlotConflict: jest.fn(),
}));

const app = require('../app');

const db = require('../utils/database');
const validation = require('../utils/validation');

describe('POST /api/bookings', () => {
  test('creates a booking and returns 201', async () => {
    // Arrange: dependencies behave like a “happy path”
    validation.validateBooking.mockReturnValue({ isValid: true, errors: [] });
    validation.validateTimeSlot.mockReturnValue({ isValid: true });
    validation.checkTimeSlotConflict.mockReturnValue({ hasConflict: false });

    db.getBookingsByDate.mockResolvedValue([]); // no existing bookings that day

    // createBooking returns what would be saved
    db.createBooking.mockImplementation(async (bookingData) => ({
      ...bookingData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));

    const payload = {
      customerName: 'Ziar Test',
      email: 'ziar@test.com',
      phone: '07123456789',
      date: '2026-02-09',
      time: '19:30',
      numberOfGuests: 2,
      specialRequests: '',
    };

    // Act
    const res = await request(app).post('/api/bookings').send(payload);

    // Assert
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeTruthy();

    // Route forces these:
    expect(res.body.data.id).toBe('test-uuid-123');
    expect(res.body.data.status).toBe('confirmed');

    // And it should include the submitted fields:
    expect(res.body.data.customerName).toBe(payload.customerName);
    expect(res.body.data.date).toBe(payload.date);
    expect(res.body.data.time).toBe(payload.time);
  });
}); 