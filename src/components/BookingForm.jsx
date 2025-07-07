import React from 'react'

export default function BookingForm() {
  return (
    <form className="max-w-lg mx-auto bg-[#4A1C1C] p-6 rounded-lg shadow-md">
        {/* Name Field */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-white">Name</label>
          <input
            type="text"
            id="name"
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
            className="w-full mt-2 p-3 border border-gray-400 rounded bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Your Email"
            required
          />
        </div>

            {/* Date Field */}
            <div className="mb-4">
              <label htmlFor="date" className="block text-white">Select Date</label>
              <input
                type="date"
                id="date"
                className="w-full mt-2 p-3 border border-gray-400 rounded bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            {/* Time Field */}
            <div className="mb-4">
              <label htmlFor="time" className="block text-white">Select Time</label>
              <input
                type="time"
                id="time"
                className="w-full mt-2 p-3 border border-gray-400 rounded bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            {/* Number of Guests */}
            <div className="mb-4">
              <label htmlFor="guests" className="block text-white">Number of Guests</label>
              <select
                id="guests"
                className="w-full mt-2 p-3 border border-gray-400 rounded bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              >
                <option value="1">1 Person</option>
                <option value="2">2 People</option>
                <option value="3">3 People</option>
                <option value="4">4 People</option>
                <option value="5">5 People</option>
                <option value="6">6 People</option>
                <option value="7+">7+ People</option>
              </select>
            </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-[#800020] text-white py-3 px-6 rounded-lg text-2xl font-bold hover:bg-red-600 transition-all"
          >
            Book Table
          </button>
        </div> 
      </form>
  )
}
