# Booking System Integration Guide

## ✅ Integration Complete!

The booking system backend has been successfully integrated with your pizza store frontend.

## 🚀 Quick Start

### 1. Start the Backend Server

Open a terminal and navigate to the booking-system folder:

```bash
cd booking-system
npm install  # If you haven't already
npm start    # or npm run dev for auto-reload
```

The backend will start on **http://localhost:3001**

### 2. Start the Frontend

In another terminal, from the root directory:

```bash
npm start
```

The frontend will start on **http://localhost:3000** (or the next available port)

### 3. Test the Integration

1. Navigate to your pizza store homepage
2. Scroll to the "Contact Us or Book a Table" section
3. Click "Book a Table" button
4. Fill out the booking form and submit

## 📋 What Was Integrated

### ✅ Created Files
- `src/services/bookingApi.js` - API service for all booking operations

### ✅ Updated Files
- `src/components/BookingForm.jsx` - Now fully functional with:
  - State management
  - API integration
  - Form validation
  - Success/error messages
  - Phone field (required by backend)
  - Special requests field (optional)
  - Date/time constraints (11:00 AM - 10:00 PM)
  - Guest count up to 20 people

### ✅ Installed Dependencies
- `axios` - For making HTTP requests to the backend

## 🔧 Configuration

### Backend Port
The backend runs on port **3001** by default. If you need to change it:

1. Create a `.env` file in `booking-system/` folder:
```env
PORT=3001
```

2. Update `src/services/bookingApi.js` if you change the port:
```javascript
const API_BASE_URL = 'http://localhost:YOUR_PORT/api/bookings';
```

Or set an environment variable in your React app:
```env
REACT_APP_API_URL=http://localhost:YOUR_PORT/api/bookings
```

## 📝 Form Fields

The booking form includes:
- **Name** (required) → Maps to `customerName` in API
- **Email** (required)
- **Phone** (required)
- **Date** (required, cannot be in the past)
- **Time** (required, 11:00 AM - 10:00 PM)
- **Number of Guests** (required, 1-20)
- **Special Requests** (optional, max 500 characters)

## 🎯 Features

- ✅ Real-time form validation
- ✅ Success/error message display
- ✅ Automatic form reset after successful booking
- ✅ Time slot conflict detection (handled by backend)
- ✅ Date/time constraints matching restaurant hours
- ✅ Responsive design matching your pizza store theme

## 🐛 Troubleshooting

### Backend not connecting?
- Make sure the backend server is running on port 3001
- Check the browser console for CORS errors
- Verify the API URL in `src/services/bookingApi.js`

### Form submission fails?
- Check that all required fields are filled
- Ensure date is not in the past
- Ensure time is between 11:00-22:00
- Check browser console for error messages

### Port conflicts?
- Backend: Change PORT in `booking-system/.env` or `booking-system/server.js`
- Frontend: React will automatically use the next available port

## 📚 API Endpoints Available

All endpoints are accessible through `src/services/bookingApi.js`:

- `getBookings(filters)` - Get all bookings
- `getBooking(id)` - Get single booking
- `createBooking(data)` - Create new booking
- `updateBooking(id, updates)` - Update booking
- `updateBookingStatus(id, status)` - Update status
- `deleteBooking(id)` - Delete booking

## 🎉 Next Steps

You can now:
1. Test the booking form on your website
2. View bookings in `booking-system/data/bookings.json`
3. Build an admin dashboard to manage bookings
4. Add email notifications
5. Integrate with a real database (MongoDB, PostgreSQL, etc.)

Enjoy your integrated booking system! 🍕


