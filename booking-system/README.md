# Pizza Store Booking System - Backend API

A RESTful API backend for managing restaurant bookings, built with Node.js and Express. Perfect for portfolio projects!

## Features

- ✅ Create, read, update, and delete bookings
- ✅ Booking validation (date, time, email, etc.)
- ✅ Time slot conflict detection
- ✅ Filter bookings by date or status
- ✅ Status management (pending, confirmed, cancelled, completed)
- ✅ CORS enabled for React frontend integration
- ✅ JSON file-based storage (easy to migrate to database later)

## Tech Stack

- **Node.js** - Runtime environment
- **Express** - Web framework
- **CORS** - Cross-origin resource sharing
- **UUID** - Unique ID generation
- **dotenv** - Environment variables

## Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (optional, defaults are used):
```bash
PORT=5000
NODE_ENV=development
```

## Running the Server

### Development mode (with auto-reload):
```bash
npm run dev
```

### Production mode:
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Base URL
```
http://localhost:5000/api/bookings
```

### Get All Bookings
```http
GET /api/bookings
```

**Query Parameters:**
- `date` - Filter by date (YYYY-MM-DD)
- `status` - Filter by status (pending, confirmed, cancelled, completed)

**Example:**
```bash
GET /api/bookings?date=2024-01-15
GET /api/bookings?status=confirmed
```

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": "uuid",
      "customerName": "John Doe",
      "email": "john@example.com",
      "phone": "123-456-7890",
      "date": "2024-01-15",
      "time": "19:00",
      "numberOfGuests": 4,
      "specialRequests": "Window seat please",
      "status": "confirmed",
      "createdAt": "2024-01-10T10:00:00.000Z",
      "updatedAt": "2024-01-10T10:00:00.000Z"
    }
  ]
}
```

### Get Single Booking
```http
GET /api/bookings/:id
```

**Response:**
```json
{
  "success": true,
  "data": { ... }
}
```

### Create Booking
```http
POST /api/bookings
```

**Request Body:**
```json
{
  "customerName": "John Doe",
  "email": "john@example.com",
  "phone": "123-456-7890",
  "date": "2024-01-15",
  "time": "19:00",
  "numberOfGuests": 4,
  "specialRequests": "Window seat please",
  "status": "pending"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Booking created successfully",
  "data": { ... }
}
```

### Update Booking
```http
PUT /api/bookings/:id
```

**Request Body:** (all fields optional)
```json
{
  "customerName": "Jane Doe",
  "numberOfGuests": 6,
  "status": "confirmed"
}
```

### Update Booking Status
```http
PATCH /api/bookings/:id/status
```

**Request Body:**
```json
{
  "status": "confirmed"
}
```

**Valid statuses:** `pending`, `confirmed`, `cancelled`, `completed`

### Delete Booking
```http
DELETE /api/bookings/:id
```

## Booking Schema

```javascript
{
  id: String (UUID),
  customerName: String (required),
  email: String (required, valid email),
  phone: String (required),
  date: String (required, YYYY-MM-DD),
  time: String (required, HH:MM 24-hour format),
  numberOfGuests: Number (required, 1-20),
  specialRequests: String (optional, max 500 chars),
  status: String (pending | confirmed | cancelled | completed),
  createdAt: String (ISO timestamp),
  updatedAt: String (ISO timestamp)
}
```

## Validation Rules

- **Customer Name**: Required, non-empty
- **Email**: Required, valid email format
- **Phone**: Required, non-empty
- **Date**: Required, YYYY-MM-DD format, cannot be in the past
- **Time**: Required, HH:MM format (24-hour), must be between 11:00-22:00
- **Number of Guests**: Required, between 1-20
- **Special Requests**: Optional, max 500 characters
- **Restaurant Hours**: 11:00 - 22:00 (11 AM - 10 PM)
- **Closed Days**: Monday

## Error Responses

### Validation Error (400)
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": ["Customer name is required", "Invalid email format"]
}
```

### Conflict Error (409)
```json
{
  "success": false,
  "message": "Time slot already booked. Please choose another time."
}
```

### Not Found (404)
```json
{
  "success": false,
  "message": "Booking not found"
}
```

## Integration with React Frontend

### Example API call from React:

```javascript
// Create a booking
const createBooking = async (bookingData) => {
  try {
    const response = await fetch('http://localhost:5000/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
};

// Get all bookings
const getBookings = async (filters = {}) => {
  const queryParams = new URLSearchParams(filters);
  const response = await fetch(`http://localhost:5000/api/bookings?${queryParams}`);
  return await response.json();
};
```

## Data Storage

Bookings are stored in `data/bookings.json`. This file is automatically created when the server starts.

To migrate to a real database (MongoDB, PostgreSQL, etc.), you can:
1. Replace the functions in `utils/database.js` with database queries
2. The API routes remain the same - no changes needed!

## Project Structure

```
backend/
├── data/
│   └── bookings.json          # JSON database file
├── routes/
│   └── bookings.js            # Booking routes
├── utils/
│   ├── database.js            # Database operations
│   └── validation.js          # Validation utilities
├── server.js                  # Express server
├── package.json
└── README.md
```

## Future Enhancements

- [ ] Add authentication/authorization
- [ ] Email notifications
- [ ] Database migration (MongoDB/PostgreSQL)
- [ ] Rate limiting
- [ ] Request logging
- [ ] Unit tests
- [ ] API documentation (Swagger)

## License

ISC

