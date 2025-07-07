import React, { useState } from "react";

function MapImage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="text-center p-6">
      <h3 className="font-italian font-bold text-4xl font-bold text-green-800 mb-4">Find Us</h3>

      {/* Small Clickable Image */}
      <div className="cursor-pointer inline-block" onClick={() => setIsOpen(true)}>
        <img
          src="/images/brick-lane.jpeg"
          alt="Brick Lane Map"
          className="w-64 h-40 object-cover rounded-lg shadow-md hover:opacity-80 transition"
        />
        <p className="font-italian font-bold text-green-800 mt-2 text-3xl">Click to enlarge</p>
      </div>

      {/* Modal for Larger Image */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
          <div className="relative p-4">
            <button
              className="absolute top-0 right-0 text-white text-3xl font-bold p-2"
              onClick={() => setIsOpen(false)}
            >
              &times;
            </button>
            <img
              src="/images/brick-lane.jpeg"
              alt="Brick Lane Map"
              className="max-w-full max-h-[80vh] rounded-lg shadow-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default MapImage;
