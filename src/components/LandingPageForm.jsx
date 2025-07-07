import React from 'react'
import BookingForm from './BookingForm';
import ContactForm from './ContactForm';


function LandingPageForm({ formState, setFormState }) {


    // const handleFormStatus = (form) => {

    //     setFormState(form); 
    // }
    return (
        <section id="LandingPageForm" className="font-italian p-6 bg-[#800020] text-white font-bold">
          <h2 className="text-4xl text-center mb-4 font-semibold text-white-400">Contact Us or Book a Table</h2>
          <p className="text-center mb-6 text-gray-300">
            Reach out to us or book a table at Papa Z's Pizza!
          </p>
    
          {/* Toggle Buttons for Contact or Booking */}
          <div className="flex justify-center gap-4 mb-6">
            <button
              className={`px-4 py-2 rounded-lg text-lg font-semibold transition-all ${
                formState === 'contact-us' ? "bg-green-500 text-white" : "bg-white text-gray-800"
              }`}
              onClick={() => setFormState('contact-us')}
            >
              Contact Us
            </button>
            <button
              className={`px-4 py-2 rounded-lg text-lg font-semibold transition-all ${
                formState === 'booking-form' ? "bg-green-500 text-white" : "bg-white text-gray-800"
              }`}
              onClick={() => setFormState('booking-form')}
            >
              Book a Table
            </button>
          </div>
          {formState === 'contact-us' ? <ContactForm/> : ''} 
          {formState === 'booking-form' ? <BookingForm/> : ''}
        </section>
    );
}
export default LandingPageForm