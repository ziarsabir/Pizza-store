# React Frontend Integration Guide

This guide will help you integrate the booking API with your React frontend.

## Quick Start

### 1. Install Axios (Recommended) or use Fetch API

```bash
npm install axios
```

### 2. Create API Service File

Create a file `src/services/bookingApi.js` in your React project:

```javascript
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/bookings';

const bookingApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Get all bookings
export const getBookings = async (filters = {}) => {
  try {
    const response = await bookingApi.get('/', { params: filters });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get single booking
export const getBooking = async (id) => {
  try {
    const response = await bookingApi.get(`/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Create booking
export const createBooking = async (bookingData) => {
  try {
    const response = await bookingApi.post('/', bookingData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Update booking
export const updateBooking = async (id, updates) => {
  try {
    const response = await bookingApi.put(`/${id}`, updates);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Update booking status
export const updateBookingStatus = async (id, status) => {
  try {
    const response = await bookingApi.patch(`/${id}/status`, { status });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Delete booking
export const deleteBooking = async (id) => {
  try {
    const response = await bookingApi.delete(`/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export default bookingApi;
```

### 3. Example React Component

```javascript
import React, { useState, useEffect } from 'react';
import { createBooking, getBookings } from './services/bookingApi';

function BookingForm() {
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    numberOfGuests: 1,
    specialRequests: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const result = await createBooking(formData);
      setSuccess(true);
      console.log('Booking created:', result.data);
      // Reset form
      setFormData({
        customerName: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        numberOfGuests: 1,
        specialRequests: '',
      });
    } catch (err) {
      setError(err.message || 'Failed to create booking');
      if (err.errors) {
        console.error('Validation errors:', err.errors);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">Booking created successfully!</div>}
      
      <input
        type="text"
        name="customerName"
        placeholder="Your Name"
        value={formData.customerName}
        onChange={handleChange}
        required
      />
      
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      
      <input
        type="tel"
        name="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleChange}
        required
      />
      
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        min={new Date().toISOString().split('T')[0]}
        required
      />
      
      <input
        type="time"
        name="time"
        value={formData.time}
        onChange={handleChange}
        min="11:00"
        max="22:00"
        required
      />
      
      <input
        type="number"
        name="numberOfGuests"
        placeholder="Number of Guests"
        value={formData.numberOfGuests}
        onChange={handleChange}
        min="1"
        max="20"
        required
      />
      
      <textarea
        name="specialRequests"
        placeholder="Special Requests (optional)"
        value={formData.specialRequests}
        onChange={handleChange}
        maxLength={500}
      />
      
      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Book Table'}
      </button>
    </form>
  );
}

export default BookingForm;
```

### 4. Example: Display Bookings

```javascript
import React, { useState, useEffect } from 'react';
import { getBookings, deleteBooking } from './services/bookingApi';

function BookingsList() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const result = await getBookings();
      setBookings(result.data);
    } catch (err) {
      setError(err.message || 'Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        await deleteBooking(id);
        fetchBookings(); // Refresh list
      } catch (err) {
        alert('Failed to delete booking');
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found</p>
      ) : (
        <ul>
          {bookings.map((booking) => (
            <li key={booking.id}>
              <h3>{booking.customerName}</h3>
              <p>Date: {booking.date} at {booking.time}</p>
              <p>Guests: {booking.numberOfGuests}</p>
              <p>Status: {booking.status}</p>
              <button onClick={() => handleDelete(booking.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BookingsList;
```

## Environment Variables

Create a `.env` file in your React project root:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

Then update your API service:

```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/bookings';
```

## CORS Configuration

The backend already has CORS enabled for all origins. If you need to restrict it:

In `backend/server.js`, update:
```javascript
app.use(cors({
  origin: 'http://localhost:3000', // Your React app URL
  credentials: true
}));
```

## Error Handling

Always handle errors properly:

```javascript
try {
  const result = await createBooking(data);
  // Success
} catch (error) {
  if (error.response) {
    // Server responded with error
    console.error('Error:', error.response.data);
    if (error.response.data.errors) {
      // Validation errors
      error.response.data.errors.forEach(err => console.error(err));
    }
  } else {
    // Network error
    console.error('Network error:', error.message);
  }
}
```

## Testing the API

You can test the API using:
- **Postman** - Import the endpoints
- **curl** - Command line
- **Browser** - For GET requests
- **React DevTools** - Network tab

Example curl commands:

```bash
# Get all bookings
curl http://localhost:5000/api/bookings

# Create booking
curl -X POST http://localhost:5000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "John Doe",
    "email": "john@example.com",
    "phone": "123-456-7890",
    "date": "2024-01-15",
    "time": "19:00",
    "numberOfGuests": 4
  }'
```

## Next Steps

1. Add loading states and error handling
2. Implement form validation on frontend
3. Add success/error notifications (toast messages)
4. Create admin dashboard for managing bookings
5. Add date/time pickers for better UX

