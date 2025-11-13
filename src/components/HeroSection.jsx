import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const navigate = useNavigate();

  // Image list using your correct filenames
  const images = Array.from({ length: 13 }, (_, i) => `/images/pizzaproject/${i + 1}.png`);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000); // change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      id="Hero-section"
      className="relative h-screen bg-cover bg-center bg-no-repeat font-italian transition-all duration-1000 ease-in-out"
      style={{ backgroundImage: `url('${images[currentImageIndex]}')` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>

      {/* Content Box */}
      <div className="absolute top-4 left-6 max-w-md bg-black bg-opacity-60 p-4 rounded-lg shadow-xl z-10">
        <h1 className="text-4xl font-bold leading-tight text-[#3DBE57]">
          Welcome to Papa Z's Pizza
        </h1>
        <p className="text-md text-gray-200 mt-3 italic">
          Serving the <span className="text-[#3DBE57]">cheesiest</span> and most
          <span className="text-[#3DBE57]"> authentic</span> Italian pizza in town!
        </p>
        <div className="text-left">
          <button
            className="mt-4 bg-[#7A1C1C] text-white py-4 px-10 rounded-full text-lg font-bold hover:bg-[#641616] transition duration-300 shadow-lg"
            onClick={() => navigate("/full-menu")}
          >
            🍕 ORDER NOW 🍕
          </button>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;