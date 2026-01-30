// this is a complete middleware and routing system 
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const bookingRoutes = require('./routes/bookings');
const { initializeDatabase } = require('./utils/database');

// router is created as a module 
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware function is loaded inside the module
app.use(cors());
// this middleware line parses incoming JSON into a JS object and places it on req.body. 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize database
initializeDatabase();

// Routes are defined 
app.get('/', (req, res) => {
  res.json({ 
    message: 'Pizza Store Booking API', 
    version: '1.0.0',
    endpoints: {
      bookings: '/api/bookings'
    }
  });
});

// this is mounting the router, this is why my router becomes: POST /api/booking and GET /api/booking etc. 
// therefore Axios  -> POST /api.bookings (from bookingApi.js) lands inside router.post('/') in bookings.js
app.use('/api/bookings', bookingRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const server = app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api/bookings`);
});

// Handle server errors gracefully
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use. Please stop the other process or use a different port.`);
    console.error(`💡 Tip: Run 'lsof -ti:${PORT} | xargs kill -9' to kill the process using port ${PORT}`);
    process.exit(1);
  } else {
    console.error('❌ Server error:', err);
    process.exit(1);
  }
});

