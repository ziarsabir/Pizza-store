import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const navigate = useNavigate();

  // Background images
  const images = Array.from(
    { length: 13 },
    (_, index) => `/images/pizzaproject/${index + 1}.png`
  );

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (previousIndex) => (previousIndex + 1) % images.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section
      id="Hero-section"
      className="relative mt-16 min-h-[600px] bg-cover bg-center bg-no-repeat font-italian transition-all duration-1000 ease-in-out sm:min-h-[650px] lg:min-h-[calc(100vh-64px)]"
      style={{
        backgroundImage: `url("${images[currentImageIndex]}")`,
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Hero Content */}
      <div className="relative z-10 flex min-h-[600px] items-start px-4 pt-6 sm:min-h-[650px] sm:px-8 sm:pt-8 lg:min-h-[calc(100vh-64px)] lg:px-12 lg:pt-20">
        <div className="w-full max-w-lg rounded-xl bg-black/60 p-6 shadow-2xl backdrop-blur-sm">
          <p className="text-xl leading-relaxed text-gray-100 sm:text-2xl lg:text-3xl">
            Serving the{" "}
            <span className="font-bold text-[#3DBE57]">
              cheesiest
            </span>{" "}
            and most{" "}
            <span className="font-bold text-[#3DBE57]">
              authentic
            </span>{" "}
            Italian pizza in town.
          </p>

          <button
            type="button"
            className="mt-5 rounded-full bg-white px-8 py-3 text-lg font-bold text-[#3DBE57] shadow-lg transition-all duration-300 hover:scale-105 hover:bg-gray-100"
            onClick={() => navigate("/full-menu")}
          >
            🍕 Order Now
          </button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;