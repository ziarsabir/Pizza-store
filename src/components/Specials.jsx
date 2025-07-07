import React from "react";

function Specials() {
  return (
    <section id="Specials" className="font-bold font-italian p-6 bg-[#7A1C1C] text-white">
      <h2 className="text-4xl text-center mb-4 font-semibold text-green-400">Today's Specials</h2>
      <p className="text-center mb-6 text-gray-300">Discover our chef's picks, specially curated for today.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Margherita Pizza */}
        <div className="p-4 bg-gray-800 rounded-lg shadow-md text-center">
          <img 
            src="/images/margherita.jpeg" 
            alt="Margherita Pizza" 
            className="w-40 h-40 object-cover mx-auto rounded-lg mb-4"
          />
          <h3 className="text-xl font-semibold mb-2 text-green-400">Margherita Pizza</h3>
          <p className="text-gray-300">A classic delight with fresh mozzarella, basil, and tomato sauce.</p>
        </div>

        {/* Spicy Pepperoni */}
        <div className="p-4 bg-gray-800 rounded-lg shadow-md text-center">
          <img 
            src="/images/spicy-pepperoni.jpeg" 
            alt="Spicy Pepperoni" 
            className="w-40 h-40 object-cover mx-auto rounded-lg mb-4"
          />
          <h3 className="text-xl font-semibold mb-2 text-green-400">Spicy Pepperoni</h3>
          <p className="text-gray-300">A bold mix of pepperoni, chili flakes, and melted cheese.</p>
        </div>

        {/* Vegetarian Feast */}
        <div className="p-4 bg-gray-800 rounded-lg shadow-md text-center">
          <img 
            src="/images/vegetarian-feast.jpeg" 
            alt="Vegetarian Feast" 
            className="w-40 h-40 object-cover mx-auto rounded-lg mb-4"
          />
          <h3 className="text-xl font-semibold mb-2 text-green-400">Vegetarian Feast</h3>
          <p className="text-gray-300">Loaded with garden-fresh vegetables and rich flavors.</p>
        </div>
      </div>
    </section>
  );
}

export default Specials;