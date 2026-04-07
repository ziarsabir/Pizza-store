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

describe('GET /api/bookings', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('returns all bookings and sorts them by date/time descending', async () => {
    const fakeBookings = [
      {
        id: '1',
        customerName: 'Older Booking',
        date: '2026-02-09',
        time: '19:30',
        status: 'confirmed',
      },
      {
        id: '2',
        customerName: 'Newer Booking',
        date: '2026-02-10',
        time: '20:00',
        status: 'confirmed',
      },
    ];

    db.getAllBookingsFlat.mockResolvedValue(fakeBookings);

    const res = await request(app).get('/api/bookings');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.count).toBe(2);
    expect(res.body.data).toHaveLength(2);

    // Most recent first
    expect(res.body.data[0].id).toBe('2');
    expect(res.body.data[1].id).toBe('1');
  });

  test('filters bookings by date', async () => {
    const dateBookings = [
      {
        id: '3',
        customerName: 'Ziar Sabir',
        date: '2026-02-09',
        time: '19:30',
        status: 'confirmed',
      },
    ];

    db.getBookingsByDate.mockResolvedValue(dateBookings);

    const res = await request(app).get('/api/bookings?date=2026-02-09');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.count).toBe(1);
    expect(res.body.data[0].customerName).toBe('Ziar Sabir');
    expect(db.getBookingsByDate).toHaveBeenCalledWith('2026-02-09');
  });

  test('filters bookings by status', async () => {
    const confirmedBookings = [
      {
        id: '4',
        customerName: 'Confirmed Guest',
        date: '2026-02-11',
        time: '18:00',
        status: 'confirmed',
      },
    ];

    db.getBookingsByStatus.mockResolvedValue(confirmedBookings);

    const res = await request(app).get('/api/bookings?status=confirmed');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.count).toBe(1);
    expect(res.body.data[0].status).toBe('confirmed');
    expect(db.getBookingsByStatus).toHaveBeenCalledWith('confirmed');
  });
});