import axios from 'axios';

// API base URL - can be configured via REACT_APP_API_URL environment variable
// Default: http://localhost:3001/api/bookings (matches booking-system server default port)
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api/bookings';

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
    // Return the full response data which includes success, message, and data
    return response.data;
  } catch (error) {
    // If error has response data, throw that (it contains the error message from backend)
    if (error.response?.data) {
      throw error.response.data;
    }
    // Otherwise throw a generic error
    throw { message: error.message || 'Failed to create booking' };
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

