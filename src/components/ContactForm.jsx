import React from "react";

function ContactForm() {  

  return (
    <>
      {/* Form Section */}
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
    
            {/* Message Field */}
            <div className="mb-4">
              <label htmlFor="message" className="block text-white">Message</label>
              <textarea
                id="message"
                className="w-full mt-2 p-3 border border-gray-400 rounded bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                rows="4"
                placeholder="Your Message"
              ></textarea>
            </div>


        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-[#800020] text-white py-3 px-6 rounded-lg text-2xl font-bold hover:bg-red-600 transition-all"
          >
            Send

          </button>
        </div> 
      </form>
    </>
  );
}

export default ContactForm;
