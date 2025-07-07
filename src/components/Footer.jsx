import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">

          {/* ABOUT US SECTION */}
          <div>
            <h4 className="font-italian font-bold text-lg font-bold mb-2">ABOUT PAPA Z'S PIZZA</h4>
            <p className="font-italian font-bold text-sm text-white-400">
              Serving the finest Italian pizza with fresh ingredients and authentic flavors. 
              Our passion for quality and tradition brings you the best experience in London.
            </p>
          </div>

          {/* OPENING HOURS */}
          <div>
            <h4 className="font-italian font-bold text-lg font-bold mb-2">OPENING HOURS</h4>
            <ul className="font-italian font-bold list-none text-sm text-white-400 space-y-1">
              <li>Monday - Thursday: 11:00 AM - 10:00 PM</li>
              <li>Friday - Saturday: 11:00 AM - 11:30 PM</li>
              <li>Sunday: 12:00 PM - 9:00 PM</li>
            </ul>
          </div>

          {/* SERVICES SECTION */}
          <div>
            <h4 className="font-italian text-lg font-bold mb-2">OUR SERVICES</h4>
            <ul className="font-italian list-none text-sm text-white-400 space-y-1">
              <li>Wood-Fired Pizzas</li>
              <li>Freshly Made Pasta</li>
              <li>Dine-In & Takeaway</li>
              <li>Home Delivery Available</li>
            </ul>
          </div>

          {/* CONTACT / LOCATION SECTION */}
          <div>
            <h4 className="font-italian text-lg font-bold mb-2">FIND US</h4>
            <p className="font-italian font-bold text-sm text-white-400">123 Brick Lane, London E1 6QL</p>
            <p className="font-italian font-bold text-sm text-white-400">Phone: +44 20 7946 0123</p>
            <p className="font-italian font-bold text-sm text-white-400">Email: contact@papazpizza.co.uk</p>
          </div>
        </div>

        {/* FOOTER COPYRIGHT LINE */}
        <div className="font-italian font-bold text-center text-white-500 text-xs mt-6 border-t border-gray-700 pt-4">
          &copy; {new Date().getFullYear()} Papa Z's Pizza. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
