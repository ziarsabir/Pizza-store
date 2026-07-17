import React, { useState } from 'react'
import { createBooking } from '../services/bookingApi'

export default function BookingForm() {
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    numberOfGuests: 1,
    specialRequests: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Get today's date in YYYY-MM-DD format for min date
  const today = new Date().toISOString().split('T')[0];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error when user starts typing
    if (error) setError(null);
    if (success) setSuccess(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Convert numberOfGuests - handle "7+" case
      let numberOfGuests = formData.numberOfGuests;
      if (numberOfGuests === '7+') {
        numberOfGuests = 7; // Set to 7 for backend, or you can handle differently
      } else {
        numberOfGuests = parseInt(numberOfGuests, 10);
      }

      const bookingData = {
        ...formData,
        numberOfGuests: numberOfGuests
      };

      const result = await createBooking(bookingData);
      
      // Use the success message from backend, or default message
      const successMessage = result.message || '🎉 Congratulations! Your booking was successful!';
      setSuccess(successMessage);
      
      // Reset form after successful submission
      setFormData({
        customerName: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        numberOfGuests: 1,
        specialRequests: ''
      });

      // Auto-close success modal after 8 seconds
      setTimeout(() => {
        setSuccess(null);
      }, 8000);
      
    } catch (err) {
      // Handle error response from API
      // The error could be an object with message property or a string
      if (typeof err === 'string') {
        setError(err);
      } else if (err.message) {
        setError(err.message);
      } else if (err.errors && Array.isArray(err.errors)) {
        setError(err.errors.join(', '));
      } else {
        setError('Failed to create booking. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Success Modal Popup */}
      {success && (
        <div className="scroll-mt-16 fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6 relative animate-fadeIn">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-3xl font-bold leading-none"
              onClick={() => setSuccess(null)}
              aria-label="Close"
            >
              &times;
            </button>
            <div className="text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-green-600 mb-4">Booking Confirmed!</h3>
              <div className="text-gray-700 text-base leading-relaxed mb-6 px-2 max-h-64 overflow-y-auto">
                {success}
              </div>
              <button
                onClick={() => setSuccess(null)}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-all shadow-lg"
              >
                Great!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error Modal Popup */}
      {error && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6 relative animate-fadeIn">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-3xl font-bold leading-none"
              onClick={() => setError(null)}
              aria-label="Close"
            >
              &times;
            </button>
            <div className="text-center">
              <div className="text-6xl mb-4">⚠️</div>
              <h3 className="text-2xl font-bold text-red-600 mb-4">Booking Error</h3>
              <div className="text-gray-700 text-base leading-relaxed mb-6 px-2 max-h-64 overflow-y-auto">
                {error}
              </div>
              <button
                onClick={() => setError(null)}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-all shadow-lg"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-[#4A1C1C] p-6 rounded-lg shadow-md">

      {/* Name Field */}
      <div className="mb-4">
        <label htmlFor="customerName" className="block text-white">Name</label>
        <input
          type="text"
          id="customerName"
          name="customerName"
          value={formData.customerName}
          onChange={handleChange}
          className="w-full mt-2 p-3 border border-gray-400 rounded bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Your Name"
          required
        />
      </div>

      {/* Email Field */}
      <div className="mb-4">
        <label htmlFor="email" className="block text-white">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full mt-2 p-3 border border-gray-400 rounded bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Your Email"
          required
        />
      </div>

      {/* Phone Field */}
      <div className="mb-4">
        <label htmlFor="phone" className="block text-white">Phone Number</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full mt-2 p-3 border border-gray-400 rounded bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Your Phone Number"
          required
        />
      </div>

      {/* Date Field */}
      <div className="mb-4">
        <label htmlFor="date" className="block text-white">Select Date</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          min={today}
          className="w-full mt-2 p-3 border border-gray-400 rounded bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
      </div>

      {/* Time Field */}
      <div className="mb-4">
        <label htmlFor="time" className="block text-white">Select Time</label>
       <select
          id="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          className="w-full mt-2 p-3 border border-gray-400 rounded bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        >
          <option value="">Select a time</option>
          <option value="11:00">11:00 AM</option>
          <option value="11:15">11:15 AM</option>
          <option value="11:30">11:30 AM</option>
          <option value="11:45">11:45 AM</option>
          <option value="12:00">12:00 PM</option>
          <option value="12:15">12:15 PM</option>
          <option value="12:30">12:30 PM</option>
          <option value="12:45">12:45 PM</option>
          <option value="13:00">1:00 PM</option>
          <option value="13:15">1:15 PM</option>
          <option value="13:30">1:30 PM</option>
          <option value="13:45">1:45 PM</option>
          <option value="14:00">2:00 PM</option>
          <option value="14:15">2:15 PM</option>
          <option value="14:30">2:30 PM</option>
          <option value="14:45">2:45 PM</option>
          <option value="15:00">3:00 PM</option>
          <option value="15:15">3:15 PM</option>
          <option value="15:30">3:30 PM</option>
          <option value="15:45">3:45 PM</option>
          <option value="16:00">4:00 PM</option>
          <option value="16:15">4:15 PM</option>
          <option value="16:30">4:30 PM</option>
          <option value="16:45">4:45 PM</option>
          <option value="17:00">5:00 PM</option>
          <option value="17:15">5:15 PM</option>
          <option value="17:30">5:30 PM</option>
          <option value="17:45">5:45 PM</option>
          <option value="18:00">6:00 PM</option>
          <option value="18:15">6:15 PM</option>
          <option value="18:30">6:30 PM</option>
          <option value="18:45">6:45 PM</option>
          <option value="19:00">7:00 PM</option>
          <option value="19:15">7:15 PM</option>
          <option value="19:30">7:30 PM</option>
          <option value="19:45">7:45 PM</option>
          <option value="20:00">8:00 PM</option>
        </select>
        <p className="text-gray-300 text-sm mt-1">Restaurant hours: 11:00 AM - 10:00 PM</p>
        <p className="text-yellow-300 text-sm mt-1 font-semibold">⏰ Each booking is for 2 hours. Please ensure your selected time allows for a 2-hour reservation.</p>
      </div>

      {/* Number of Guests */}
      <div className="mb-4">
        <label htmlFor="numberOfGuests" className="block text-white">Number of Guests</label>
        <select
          id="numberOfGuests"
          name="numberOfGuests"
          value={formData.numberOfGuests}
          onChange={handleChange}
          className="w-full mt-2 p-3 border border-gray-400 rounded bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        >
          <option value="1">1 Person</option>
          <option value="2">2 People</option>
          <option value="3">3 People</option>
          <option value="4">4 People</option>
          <option value="5">5 People</option>
          <option value="6">6 People</option>
          <option value="7">7 People</option>
          <option value="8">8 People</option>
          <option value="9">9 People</option>
          <option value="10">10 People</option>
          <option value="11">11 People</option>
          <option value="12">12 People</option>
          <option value="13">13 People</option>
          <option value="14">14 People</option>
          <option value="15">15 People</option>
          <option value="16">16 People</option>
          <option value="17">17 People</option>
          <option value="18">18 People</option>
          <option value="19">19 People</option>
          <option value="20">20 People</option>
        </select>
      </div>

      {/* Special Requests (Optional) */}
      <div className="mb-4">
        <label htmlFor="specialRequests" className="block text-white">Special Requests (Optional)</label>
        <textarea
          id="specialRequests"
          name="specialRequests"
          value={formData.specialRequests}
          onChange={handleChange}
          rows="3"
          maxLength={500}
          className="w-full mt-2 p-3 border border-gray-400 rounded bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Any special requests or dietary requirements..."
        />
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <button
          type="submit"
          disabled={loading}
          className="bg-[#800020] text-white py-3 px-6 rounded-lg text-2xl font-bold hover:bg-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Booking...' : 'Book Table'}
        </button>
      </div> 
    </form>
    </>
  )
}
