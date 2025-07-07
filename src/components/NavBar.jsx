import React from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

// Added `setBookingMode` prop
function NavBar({ cart, setFormState }) {  
    return (
        <div id="Nav-bar" className="font-italian font-bold bg-gray-900 text-white py-3 px-6 flex justify-around fixed top-0 left-0 w-full z-50 shadow-lg">
            <div>
                <Link to="/" className="hover:text-green-400">
                    Home
                </Link>
            </div>

            <div>
                <HashLink smooth to="/#Menu" className="hover:text-green-400">
                    Menu
                </HashLink>
            </div>

            <div>
                <HashLink smooth to="/#Services" className="hover:text-green-400">
                    Services
                </HashLink>
            </div>

            <div>
                <HashLink smooth to='/#Blog' className="hover:text-green-400">
                    Blog
                </HashLink> 
            </div>

            <div>
                <HashLink smooth to="/#About" className="hover:text-green-400">
                    About Us 
                </HashLink>
            </div>

            {/* Contact Us Link */}
            <div>
                <HashLink smooth to="/#LandingPageForm" className="hover:text-green-400"
                  onClick={() => { 
                  setFormState('contact-us');
                }} 
                >
                    Contact Us
                </HashLink>
            </div>

            {/* New "Book a Table" Link - Triggers Booking Mode */}
            <div>
                <HashLink smooth to="/#LandingPageForm" className="hover:text-green-400"
                  onClick={(e) => {
                    setFormState('booking-form'); 
                  }} 
                
                >
                    Book a Table
                </HashLink>
            </div>

            {/* Shopping Cart Icon */}
            <div className="relative">
                <Link to="/cart">
                    <ShoppingCartIcon className="size-8" />
                    {cart.length > 0 && (
                        <span className="absolute top-0 right-0 bg-green-400 text-gray-800 text-xs font-bold px-2 py-1 rounded-full">
                            {cart.reduce((total, item) => total + item.quantity, 0)}
                        </span>
                    )}
                </Link>
            </div>
        </div>
    );
}

export default NavBar;
