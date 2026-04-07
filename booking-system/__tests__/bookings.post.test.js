const request = require('supertest');

// Mock uuid so the generated booking ID is predictable in tests
jest.mock('uuid', () => ({
  v4: () => 'test-uuid-123',
}));

// Mock database functions so tests don't touch the real JSON file
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

// Mock validation functions so we can control valid / invalid scenarios
jest.mock('../utils/validation', () => ({
  validateBooking: jest.fn(),
  validateTimeSlot: jest.fn(),
  checkTimeSlotConflict: jest.fn(),
}));

const app = require('../app');
const db = require('../utils/database');
const validation = require('../utils/validation');

describe('POST /api/bookings', () => {
  let consoleErrorSpy;

  beforeEach(() => {
    jest.clearAllMocks();
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  test('creates a booking and returns 201', async () => {
    // SETUP:
    // Define how the mocked validation and database functions should behave
    validation.validateBooking.mockReturnValue({ isValid: true, errors: [] });
    validation.validateTimeSlot.mockReturnValue({ isValid: true });

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

    // ACT:
    // Send the POST request to the route being tested
    const res = await request(app).post('/api/bookings').send(payload);

    // ASSERT:
    // Check that the response matches what we expect
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeTruthy();
    expect(res.body.data.id).toBe('test-uuid-123');
    expect(res.body.data.status).toBe('confirmed');
    expect(res.body.data.customerName).toBe(payload.customerName);
    expect(res.body.data.date).toBe(payload.date);
    expect(res.body.data.time).toBe(payload.time);
  });

  test('returns 400 when booking validation fails', async () => {
    // SETUP:
    // Force validateBooking to fail so the route returns a validation error
    validation.validateBooking.mockReturnValue({
      isValid: false,
      errors: ['Email is required'],
    });

    const payload = {
      customerName: 'Ziar Test',
      email: '',
      phone: '07123456789',
      date: '2026-02-09',
      time: '19:30',
      numberOfGuests: 2,
    };

    // ACT:
    // Send invalid booking data to the POST route
    const res = await request(app).post('/api/bookings').send(payload);

    // ASSERT:
    // Confirm the route returns the correct validation response
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe('Validation failed');
    expect(res.body.errors).toContain('Email is required');
    expect(db.createBooking).not.toHaveBeenCalled();
  });

  test('returns 400 when time slot validation fails', async () => {
    // SETUP:
    // Booking field validation passes, but time slot validation fails
    validation.validateBooking.mockReturnValue({ isValid: true, errors: [] });
    validation.validateTimeSlot.mockReturnValue({
      isValid: false,
      message: 'Restaurant is closed on Mondays',
    });

    const payload = {
      customerName: 'Ziar Test',
      email: 'ziar@test.com',
      phone: '07123456789',
      date: '2026-02-09',
      time: '19:30',
      numberOfGuests: 2,
    };

    // ACT:
    // Send the POST request with a time slot that should be rejected
    const res = await request(app).post('/api/bookings').send(payload);

    // ASSERT:
    // Confirm the route returns the correct time-slot validation error
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe('Restaurant is closed on Mondays');
    expect(db.createBooking).not.toHaveBeenCalled();
  });

  test('returns 409 when createBooking rejects because slot is unavailable', async () => {
    // SETUP:
    // All validation passes, but the database layer rejects because the slot is unavailable
    validation.validateBooking.mockReturnValue({ isValid: true, errors: [] });
    validation.validateTimeSlot.mockReturnValue({ isValid: true });

    const conflictError = new Error('Time slot is not available!');
    conflictError.statusCode = 409;

    db.createBooking.mockRejectedValue(conflictError);

    const payload = {
      customerName: 'Ziar Test',
      email: 'ziar@test.com',
      phone: '07123456789',
      date: '2026-02-09',
      time: '19:30',
      numberOfGuests: 2,
    };

    // ACT:
    // Send the POST request that should hit the conflict path
    const res = await request(app).post('/api/bookings').send(payload);

    // ASSERT:
    // Confirm the route returns the correct conflict response
    expect(res.status).toBe(409);
    expect(res.body.message).toBe('Time slot is not available!');
  });
});