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
    // This ensures brand new database starts as an object 
    await fs.writeFile(BOOKINGS_FILE, JSON.stringify({}, null, 2));
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
    return {};
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

async function getBookingById(id) {
  const allBookings = await getAllBookingsFlat();
  return allBookings.find(b => b.id === id);
}

// Create new booking
async function createBooking(bookingData) {
  const bookingsByDate = await readBookings(); // now an object

  const { available } = isSlotAvailable(bookingsByDate, bookingData.date, bookingData.time);
  if (!available) {
    const err = new Error('Time slot is not available!');
    err.statusCode = 409;
    throw err;
  }

  const newBooking = {
    id: bookingData.id,
    ...bookingData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  // Ensure date bucket exists
  if (!bookingsByDate[bookingData.date]) {
    bookingsByDate[bookingData.date] = [];
  }

  // Add to that date’s array
  bookingsByDate[bookingData.date].push(newBooking);

  await writeBookings(bookingsByDate);
  return newBooking;
}

async function updateBooking(id, updates) {
  const bookingsByDate = await readBookings();

  for (const date in bookingsByDate) {
    const index = bookingsByDate[date].findIndex(b => b.id === id);

    if (index !== -1) {
      bookingsByDate[date][index] = {
        ...bookingsByDate[date][index],
        ...updates,
        updatedAt: new Date().toISOString()
      };

      await writeBookings(bookingsByDate);
      return bookingsByDate[date][index];
    }
  }

  return null;
}
// Delete booking
async function deleteBooking(id) {
  const bookingsByDate = await readBookings();
  let deleted = false;

  for (const date in bookingsByDate) {
    const before = bookingsByDate[date].length;
    bookingsByDate[date] = bookingsByDate[date].filter(b => b.id !== id);

    if (bookingsByDate[date].length !== before) {
      deleted = true;

      // optional tidy: remove empty date keys
      if (bookingsByDate[date].length === 0) {
        delete bookingsByDate[date];
      }

      break;
    }
  }

  if (!deleted) return false;

  await writeBookings(bookingsByDate);
  return true;
}

// Get ALL bookings as a flat array (useful for filtering/sorting)
async function getAllBookingsFlat() {
  const bookingsByDate = await readBookings();
  const all = [];

  for (const date in bookingsByDate) {
    all.push(...bookingsByDate[date]);
  }

  return all;
}

// Get bookings by date (dictionary storage)
async function getBookingsByDate(date) {
  const bookingsByDate = await readBookings();
  return bookingsByDate[date] || [];
}
// Get bookings by status (works with dictionary storage)
async function getBookingsByStatus(status) {
  const allBookings = await getAllBookingsFlat();
  return allBookings.filter(booking => booking.status === status);
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
  getBookingsByStatus, 
  getAllBookingsFlat 
};

