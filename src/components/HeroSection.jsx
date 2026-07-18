import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const navigate = useNavigate();

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
      className="relative mt-16 min-h-[600px] overflow-hidden font-italian sm:min-h-[650px] lg:min-h-[calc(100vh-64px)]"
    >
      {/* Crossfading background images */}
      {images.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out ${
            index === currentImageIndex ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url("${image}")`,
          }}
        />
      ))}

      {/* Overall image overlay */}
      <div className="absolute inset-0 bg-black/25" />

      {/* Hero content */}
      <div className="relative z-10 flex min-h-[600px] items-start px-4 pt-16 sm:min-h-[650px] sm:px-8 sm:pt-20 lg:min-h-[calc(100vh-64px)] lg:px-14 lg:pt-24">
        <div className="w-full max-w-xl rounded-2xl border border-white/10 bg-black/35 p-5 shadow-xl backdrop-blur-sm sm:p-7">
          <p className="text-2xl font-semibold leading-relaxed text-white drop-shadow-md sm:text-3xl lg:text-4xl">
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
            onClick={() => navigate("/full-menu")}
            className="mt-6 rounded-full bg-[#F5E6C8] px-8 py-3 text-lg font-bold text-[#2E8B57] shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#E8D4AF] focus:outline-none focus:ring-2 focus:ring-white"
          >
            🍕 Order Now
          </button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;