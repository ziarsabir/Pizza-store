// Validation utilities for booking data

function validateBooking(bookingData) {
  const errors = [];

  // Required fields
  if (!bookingData.customerName || bookingData.customerName.trim() === '') {
    errors.push('Customer name is required');
  }

  if (!bookingData.email || bookingData.email.trim() === '') {
    errors.push('Email is required');
  } else if (!isValidEmail(bookingData.email)) {
    errors.push('Invalid email format');
  }

  if (!bookingData.phone || bookingData.phone.trim() === '') {
    errors.push('Phone number is required');
  }

  if (!bookingData.date || bookingData.date.trim() === '') {
    errors.push('Date is required');
  } else if (!isValidDate(bookingData.date)) {
    errors.push('Invalid date format. Use YYYY-MM-DD');
  } else if (isPastDate(bookingData.date)) {
    errors.push('Date cannot be in the past');
  }

  if (!bookingData.time || bookingData.time.trim() === '') {
    errors.push('Time is required');
  } else if (!isValidTime(bookingData.time)) {
    errors.push('Invalid time format. Use HH:MM (24-hour format)');
  }

  if (!bookingData.numberOfGuests || bookingData.numberOfGuests < 1) {
    errors.push('Number of guests must be at least 1');
  } else if (bookingData.numberOfGuests > 20) {
    errors.push('Maximum 20 guests per booking');
  }

  // Optional fields validation
  if (bookingData.specialRequests && bookingData.specialRequests.length > 500) {
    errors.push('Special requests cannot exceed 500 characters');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidDate(dateString) {
  //regular expression that enforces the format 
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  //checks whether the string matches the format 
  if (!dateRegex.test(dateString)) {
    return false;
  }
  //attempts to convert the string into a javascript date object 
  const date = new Date(dateString);
  //this means it's a date date object and a usable real date as underlying number exists. 
  return date instanceof Date && !isNaN(date);
}

function isPastDate(dateString) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const bookingDate = new Date(dateString);
  return bookingDate < today;
}

function isValidTime(timeString) {
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
  return timeRegex.test(timeString);
}

function validateTimeSlot(date, time) {
  const bookingDateTime = new Date(`${date}T${time}`);
  const hour = bookingDateTime.getHours();
  const day = bookingDateTime.getDay(); // 0 = Sunday, 6 = Saturday

  // Example: Restaurant hours (adjust as needed)
  // Open: 11:00 - 22:00 (11 AM - 10 PM)
  // Closed: Monday (day === 1)
  
  if (day === 1) {
    return { isValid: false, message: 'Restaurant is closed on Mondays' };
  }

  if (hour < 11 || hour >= 22) {
    return { isValid: false, message: 'Booking time must be between 11:00 and 22:00' };
  }

  // Check if booking would extend past closing time (each booking is 2 hours)
  // Restaurant closes at 22:00, so last booking can be at 20:00 (20:00-22:00)
  if (hour > 20) {
    return { isValid: false, message: 'Booking time must be at or before 20:00 to allow for 2-hour reservation (restaurant closes at 22:00)' };
  }

  return { isValid: true };
}

/**
 * Check if a time slot conflicts with existing bookings
 * Each booking occupies a 2-hour slot
 * @param {string} date - Booking date (YYYY-MM-DD)
 * @param {string} time - Booking time (HH:MM)
 * @param {Array} existingBookings - Array of existing bookings for the same date
 * @param {string} excludeBookingId - Optional: booking ID to exclude from conflict check (for updates)
 * @returns {Object} - { hasConflict: boolean, conflictingBooking: Object|null, message: string }
 */
function checkTimeSlotConflict(date, time, existingBookings, excludeBookingId = null) {
  const requestedTime = new Date(`${date}T${time}`);
  const requestedStart = requestedTime.getTime();
  const requestedEnd = requestedStart + (2 * 60 * 60 * 1000); // 2 hours in milliseconds

  for (const booking of existingBookings) {
    // Skip cancelled bookings and the booking being updated
    if (booking.status === 'cancelled' || (excludeBookingId && booking.id === excludeBookingId)) {
      continue;
    }

    const existingTime = new Date(`${booking.date}T${booking.time}`);
    const existingStart = existingTime.getTime();
    const existingEnd = existingStart + (2 * 60 * 60 * 1000); // 2 hours in milliseconds

    // Check for overlap: requested time overlaps if it starts before existing ends and ends after existing starts
    if (requestedStart < existingEnd && requestedEnd > existingStart) {
      const existingEndTime = new Date(existingEnd);
      const existingEndHour = existingEndTime.getHours();
      const existingEndMinute = existingEndTime.getMinutes();
      const endTimeStr = `${existingEndHour.toString().padStart(2, '0')}:${existingEndMinute.toString().padStart(2, '0')}`;
      
      return {
        hasConflict: true,
        conflictingBooking: booking,
        message: `This time slot is not available. The table is already booked from ${booking.time} to ${endTimeStr}. Please choose another time.`
      };
    }
  }

  return {
    hasConflict: false,
    conflictingBooking: null,
    message: null
  };
}

module.exports = {
  validateBooking,
  validateTimeSlot,
  checkTimeSlotConflict
};

