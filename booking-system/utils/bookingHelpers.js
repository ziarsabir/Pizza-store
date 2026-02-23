// For now only writing stubbed versions of functions that the 'gatekeeper' flow depends on. 

function getBookingsForDate(bookingsByDate, date) {
    // STUB: return empty list for now. 
    return []; 
}

function getOverlappingBookingsForSlot(bookingsForDate, requestedTime) {
    // STUB: no overlaps for now. 
    return []; 
}

function isSlotAvailable(bookingsByDate, date, requestedTime, maxTables = 5) {
    // Stub: always allow for now 
    return { available: true, overlappingBookings: [] }; 
}

module.exports = {
    getBookingsForDate, 
    getOverlappingBookingsForSlot, 
    isSlotAvailable, 
}; 