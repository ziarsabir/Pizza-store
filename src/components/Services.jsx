import React from "react";
import { FaLeaf, FaMotorcycle, FaPizzaSlice } from "react-icons/fa"; 

function Services() {
  return (
    <section id="Services" className="font-bold font-italian p-6 bg-[#E3C29D] text-[#2F5233]"> 
      <h2 className="text-3xl text-center mb-4 font-semibold text-[#1E3A34]">Our Services</h2>
      <p className="text-center mb-8 text-[#4A4A4A]">
        We proudly serve the people of London with the best, cheesiest, and most authentic Italian pizza for over 31 years.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        
        {/* Healthy Food */}
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <div className="bg-red-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaLeaf className="text-white text-3xl" /> 
          </div>
          <h3 className="text-xl font-semibold mb-2 text-[#1E3A34]">Healthy Food</h3>
          <p className="text-[#4A4A4A]">We use only the freshest ingredients to ensure every slice is delicious and nutritious.</p>
        </div>

        {/* Fastest Delivery */}
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <div className="bg-green-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaMotorcycle className="text-white text-3xl" /> 
          </div>
          <h3 className="text-xl font-semibold mb-2 text-[#1E3A34]">Fastest Delivery</h3>
          <p className="text-[#4A4A4A]">Your pizza will arrive hot and fresh, right at your doorstep in record time.</p>
        </div>

        {/* Original Recipes */}
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <div className="bg-red-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaPizzaSlice className="text-white text-3xl" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-[#1E3A34]">Original Recipes</h3>
          <p className="text-[#4A4A4A]">Authentic Italian recipes passed down through generations to ensure an unforgettable experience.</p>
        </div>

      </div>
    </section>
  );
}

export default Services;