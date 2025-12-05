# Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Install Dependencies
```bash
cd backend
npm install
```

### Step 2: Start the Server
```bash
npm run dev
```

The server will start on `http://localhost:5000`

### Step 3: Test the API

Open your browser or use curl:
```bash
# Check if server is running
curl http://localhost:5000

# Get all bookings (will be empty initially)
curl http://localhost:5000/api/bookings
```

## 📝 Create Your First Booking

```bash
curl -X POST http://localhost:5000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "John Doe",
    "email": "john@example.com",
    "phone": "123-456-7890",
    "date": "2024-12-25",
    "time": "19:00",
    "numberOfGuests": 4,
    "specialRequests": "Window seat please"
  }'
```

## 🔗 Connect Your React App

1. Make sure your React app is running (usually on port 3000)
2. The backend CORS is already configured to accept requests from any origin
3. Use the API base URL: `http://localhost:5000/api/bookings`
4. See `INTEGRATION.md` for detailed React integration examples

## 📚 Available Endpoints

- `GET /api/bookings` - Get all bookings
- `GET /api/bookings/:id` - Get single booking
- `POST /api/bookings` - Create booking
- `PUT /api/bookings/:id` - Update booking
- `PATCH /api/bookings/:id/status` - Update status
- `DELETE /api/bookings/:id` - Delete booking

## 💡 Tips

- Bookings are stored in `data/bookings.json`
- The file is created automatically on first run
- All dates must be in `YYYY-MM-DD` format
- All times must be in `HH:MM` format (24-hour)
- Restaurant hours: 11:00 - 22:00
- Restaurant closed on Mondays

## 🐛 Troubleshooting

**Port already in use?**
- Change PORT in `.env` file or use: `PORT=5001 npm start`

**CORS errors?**
- Make sure backend is running
- Check that you're using the correct API URL
- Verify CORS is enabled in `server.js`

**Validation errors?**
- Check date format: YYYY-MM-DD
- Check time format: HH:MM (24-hour)
- Ensure date is not in the past
- Ensure time is between 11:00-22:00

