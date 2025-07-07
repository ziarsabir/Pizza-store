import React from "react";
import MapImage from "./MapImage";

function About() {
  return (
    <section id="About" className="font-italian font-bold flex flex-col md:flex-row p-10 bg-[#F5E6CC] text-green-800">
      {/* Left Side - About Content */}
      <div className="p-6 md:w-1/2">
        <h2 className="text-4xl mb-4 text-green-800">About Us</h2>
        <p className="mb-4 text-xl text-green-800">
          Papa Z's Pizza has been serving handmade pizza since 1993. Our mission is to bring 
          authentic Italian flavors to your table.
        </p>
        <p className="text-xl text-green-800">
          We pride ourselves on quality and customer satisfaction, using fresh ingredients to make every slice unforgettable.
        </p>

        {/* Enlarged Map Image */}
        <div className="mt-8">
          <MapImage />
        </div>
      </div>

      {/* Right Side - Enlarged Pizza Store Image */}
      <div className="md:w-1/2 flex justify-center items-center">
        <img 
          src="/images/pizza-store.jpeg" 
          alt="Pizza Store" 
          className="rounded-lg shadow-lg w-full max-w-lg md:max-w-xl"
        />
      </div>
    </section>
  );
}

export default About;
