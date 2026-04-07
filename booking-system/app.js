// app.js
const express = require('express'); 
const cors = require('cors'); 
require('dotenv').config(); 

const bookingRoutes = require('./routes/bookings'); 
const { initializeDatabase } = require('./utils/database'); 

const app = express(); 

// Middleware 
app.use(cors()); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

// Initialize database but avoid it during testing 

if (process.env.NODE_ENV !== 'test') {
    initializeDatabase(); 
}

// Routes 
app.get('/', (req, res) => {
    res.json({
        message: 'Pizza Store Booking API', 
        version: '1.0.0', 
        endpoints: {
            bookings: '/api/bookings', 
        },

    }); 
}); 


app.use('/api/bookings', bookingRoutes); 

// Error handling middleware 
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || err.status || 500).json({
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

//404 handler 
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found'}); 
}); 

// I export because Jest/Supertest wants to import my Express app without actually starting the server on the port 
module.exports = app; 

