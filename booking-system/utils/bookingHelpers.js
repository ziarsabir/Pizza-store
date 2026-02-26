// For now only writing stubbed versions of functions that the 'gatekeeper' flow depends on. 
// Will refactor createBooking() inside database.js to act as a gatekeeper instead of automatically pushing it to the array. 

function timeToMinutes(time) {
    const parts = time.split(":"); 
    const hours = Number(parts[0]); 
    const minutes = Number(parts[1]); 

    return (hours * 60) + minutes; 
}

function overlaps(requestedTime, existingTime) {
    const reqStart = timeToMinutes(requestedTime); 
    // 2 hours from the start
    const reqEnd = reqStart + 120;

    const exStart = timeToMinutes(existingTime); 
    // 2 hours from the start 
    const exEnd = exStart + 120; 

    if (reqStart < exEnd && reqEnd > exStart) {
        return true; 
    }

    return false; 
}

function getBookingsForDate(bookingsByDate, date) {
    if (bookingsByDate[date]) {
        return bookingsByDate[date]; 
    }
    return []; 
}

function getOverlappingBookingsForSlot(bookingsForDate, requestedTime) {
    const overlapping = []; 

    for (const booking of bookingsForDate) {
        if (booking.status === 'cancelled') continue; 

        if (overlaps(requestedTime, booking.time)) {
            overlapping.push(booking); 
        }
    }

    // STUB: no overlaps for now. 
    return overlapping; 
}

function isSlotAvailable(bookingsByDate, date, requestedTime, maxTables = 5) {
    
    const todaysBookings = getBookingsForDate(bookingsByDate, date); 

    const overlappingBookings = getOverlappingBookingsForSlot(todaysBookings, requestedTime); 

    if (overlappingBookings.length < maxTables) {
        return { available: true, overlappingBookings}; 
    }

    return { available: false, overlappingBookings }; 

}

module.exports = {
    getBookingsForDate, 
    getOverlappingBookingsForSlot, 
    isSlotAvailable, 
}; 