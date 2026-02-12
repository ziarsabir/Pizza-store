const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

const {
  readBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking,
  getBookingsByDate,
  getBookingsByStatus
} = require('../utils/database');

const { validateBooking, validateTimeSlot, checkTimeSlotConflict } = require('../utils/validation');

// GET /api/bookings - Get all bookings (with optional filters)
router.get('/', async (req, res, next) => {
  try {
    const { date, status } = req.query;
    
    let bookings;
    if (date) {
      bookings = await getBookingsByDate(date);
    } else if (status) {
      bookings = await getBookingsByStatus(status);
    } else {
      bookings = await readBookings();
    }

    // Sort by date and time (most recent first)
    bookings.sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`);
      const dateB = new Date(`${b.date}T${b.time}`);
      return dateB - dateA;
    });

    res.json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/bookings/:id - Get a specific booking
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const booking = await getBookingById(id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.json({
      success: true,
      data: booking
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/bookings - Create a new booking
// what BACKEND is doing with the data before saving: 
router.post('/', async (req, res, next) => {
  try {
    // building the final booking object 
    const bookingData = {
      id: uuidv4(),
      // req.body is the exact JSON sent from my frontend (bookingData)
      ...req.body,
      status: 'confirmed' // Auto-confirm bookings when there's no conflict (keep it simple)
    };

    // Validate booking data - Field Validation 
    const validation = validateBooking(bookingData);
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validation.errors
      });
    }

    // Validate time slot - Business rules 
    const timeSlotValidation = validateTimeSlot(bookingData.date, bookingData.time);
    if (!timeSlotValidation.isValid) {
      return res.status(400).json({
        success: false,
        message: timeSlotValidation.message
      });
    }

    // Check for existing bookings with 2-hour time slot conflicts
    const existingBookings = await getBookingsByDate(bookingData.date);
    const conflictCheck = checkTimeSlotConflict(
      bookingData.date,
      bookingData.time,
      existingBookings
    );

    if (conflictCheck.hasConflict) {
      return res.status(409).json({
        success: false,
        message: conflictCheck.message
      });
    }

    // SAVE the create booking 
    const newBooking = await createBooking(bookingData);

    // Calculate end time for the booking (2 hours later)
    const bookingDateTime = new Date(`${bookingData.date}T${bookingData.time}`);
    const endDateTime = new Date(bookingDateTime.getTime() + (2 * 60 * 60 * 1000));
    const endHour = endDateTime.getHours();
    const endMinute = endDateTime.getMinutes();
    const endTime = `${endHour.toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')}`;
    
    //Express is sending JSON like this
    res.status(201).json({
      success: true,
      message: `🎉 Congratulations! Your table is booked successfully! Your reservation is for 2 hours from ${bookingData.time} to ${endTime} on ${bookingData.date}. We look forward to serving you!`,
      data: newBooking
    });
  } catch (error) {
    next(error);
  }
});

// PUT /api/bookings/:id - Update a booking
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Check if booking exists
    const existingBooking = await getBookingById(id);
    if (!existingBooking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // If updating date/time, validate
    if (updates.date || updates.time) {
      const date = updates.date || existingBooking.date;
      const time = updates.time || existingBooking.time;
      
      const timeSlotValidation = validateTimeSlot(date, time);
      if (!timeSlotValidation.isValid) {
        return res.status(400).json({
          success: false,
          message: timeSlotValidation.message
        });
      }


      // Check for conflicts with 2-hour time slot (excluding current booking)
      const existingBookings = await getBookingsByDate(date);
      const conflictCheck = checkTimeSlotConflict(
        date,
        time,
        existingBookings,
        id // Exclude current booking from conflict check
      );

      if (conflictCheck.hasConflict) {
        return res.status(409).json({
          success: false,
          message: conflictCheck.message
        });
      }
    }

    // Validate if updating required fields
    const updatedData = { ...existingBooking, ...updates };
    if (updates.customerName || updates.email || updates.phone || 
        updates.date || updates.time || updates.numberOfGuests) {
      const validation = validateBooking(updatedData);
      if (!validation.isValid) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: validation.errors
        });
      }
    }

    const updatedBooking = await updateBooking(id, updates);

    res.json({
      success: true,
      message: 'Booking updated successfully',
      data: updatedBooking
    });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/bookings/:id - Delete a booking
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await deleteBooking(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.json({
      success: true,
      message: 'Booking deleted successfully'
    });
  } catch (error) {
    next(error);
  }
});

// PATCH /api/bookings/:id/status - Update booking status
router.patch('/:id/status', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['pending', 'confirmed', 'cancelled', 'completed'];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Status must be one of: ${validStatuses.join(', ')}`
      });
    }

    const existingBooking = await getBookingById(id);
    if (!existingBooking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    const updatedBooking = await updateBooking(id, { status });

    res.json({
      success: true,
      message: 'Booking status updated successfully',
      data: updatedBooking
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

