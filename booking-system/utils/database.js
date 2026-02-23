const fs = require('fs').promises;
const path = require('path');

const DATA_DIR = path.join(__dirname, '../data');
const BOOKINGS_FILE = path.join(DATA_DIR, 'bookings.json');

const { isSlotAvailable } = require('./bookingHelpers'); 

// Ensure data directory exists
async function ensureDataDirectory() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch (error) {
    console.error('Error creating data directory:', error);
  }
}

// Initialize database file if it doesn't exist
async function initializeDatabase() {
  await ensureDataDirectory();
  try {
    await fs.access(BOOKINGS_FILE);
  } catch (error) {
    // File doesn't exist, create it with empty array
    await fs.writeFile(BOOKINGS_FILE, JSON.stringify([], null, 2));
    console.log('Database initialized');
  }
}

// Read all bookings
async function readBookings() {
  try {
    const data = await fs.readFile(BOOKINGS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading bookings:', error);
    return [];
  }
}

// Write bookings to file
async function writeBookings(bookings) {
  try {
    await fs.writeFile(BOOKINGS_FILE, JSON.stringify(bookings, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing bookings:', error);
    throw error;
  }
}

// Get booking by ID
async function getBookingById(id) {
  const bookings = await readBookings();
  return bookings.find(booking => booking.id === id);
}

// Create new booking
async function createBooking(bookingData) {
  const bookings = await readBookings();

  const { available } = isSlotAvailable(bookings, bookingData.date, bookingData.time); 
  if (!available) {
    const err = new Error('Time slot is not available!'); 
    err.statusCode = 409; 
    throw err; 
  }

  const newBooking = {
    // ...bookingData already has ID so it will override the first one. 
    id: bookingData.id,
    ...bookingData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  bookings.push(newBooking);
  await writeBookings(bookings);
  return newBooking;
}

// Update booking
async function updateBooking(id, updates) {
  const bookings = await readBookings();
  const index = bookings.findIndex(booking => booking.id === id);
  
  if (index === -1) {
    return null;
  }
  
  bookings[index] = {
    ...bookings[index],
    ...updates,
    updatedAt: new Date().toISOString()
  };
  
  await writeBookings(bookings);
  return bookings[index];
}

// Delete booking
async function deleteBooking(id) {
  const bookings = await readBookings();
  // loop over every booking and only keep those whose ID does not match the one we want to delete. 
  // IMMUTABLE - don't mutate original array - create new array 
  const filteredBookings = bookings.filter(booking => booking.id !== id);
  
  // if no id was removed then array stays the same  - ID didn't exist, nothing was deleted 
  if (filteredBookings.length === bookings.length) {
    return false; // Booking not found - route layer responds with 404 Not found and clear error message - prevents silent failure 
  }
  
  // writes updated booking array back to JSON file - permanently deletes booking from storage 
  await writeBookings(filteredBookings);
  // Delete was successful 
  return true;
}

// Get bookings by date
async function getBookingsByDate(date) {
  const bookings = await readBookings();
  return bookings.filter(booking => booking.date === date);
}

// Get bookings by status
async function getBookingsByStatus(status) {
  const bookings = await readBookings();
  return bookings.filter(booking => booking.status === status);
}

module.exports = {
  initializeDatabase,
  readBookings,
  writeBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking,
  getBookingsByDate,
  getBookingsByStatus
};

