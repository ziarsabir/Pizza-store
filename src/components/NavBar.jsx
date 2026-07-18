import React, { useState } from "react";
import {
  ShoppingCartIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

function NavBar({ cart, setFormState }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const cartQuantity = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const desktopLinkStyles =
    "whitespace-nowrap px-2 py-2 text-lg transition-colors duration-200 hover:text-green-400";

  const mobileLinkStyles =
    "w-full rounded-lg py-3 text-center text-lg transition-colors duration-200 hover:bg-gray-800 hover:text-green-400";

  return (
    <nav
      id="Nav-bar"
      className="fixed left-0 top-0 z-50 w-full bg-gray-900 font-italian font-bold text-white shadow-lg"
    >
      <div className="mx-auto flex max-w-screen-2xl items-center justify-between px-4 py-3 sm:px-6 xl:px-8">
        {/* Brand */}
        <Link
          to="/"
          onClick={closeMenu}
          className="whitespace-nowrap text-xl text-green-400 transition-colors duration-200 hover:text-green-300 sm:text-2xl"
        >
          🍕 Papa Z&apos;s Pizza
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-7 xl:flex 2xl:gap-10">
          <HashLink
            smooth
            to="/#Menu"
            className={desktopLinkStyles}
          >
            Menu
          </HashLink>

          <HashLink
            smooth
            to="/#Services"
            className={desktopLinkStyles}
          >
            Services
          </HashLink>

          <HashLink
            smooth
            to="/#Blog"
            className={desktopLinkStyles}
          >
            Blog
          </HashLink>

          <HashLink
            smooth
            to="/#About"
            className={desktopLinkStyles}
          >
            About Us
          </HashLink>

          <HashLink
            smooth
            to="/#LandingPageForm"
            className={desktopLinkStyles}
            onClick={() => setFormState("contact-us")}
          >
            Contact Us
          </HashLink>

          <HashLink
            smooth
            to="/#LandingPageForm"
            className={desktopLinkStyles}
            onClick={() => setFormState("booking-form")}
          >
            Book a Table
          </HashLink>
        </div>

        {/* Cart and hamburger */}
        <div className="flex items-center gap-4">
          <Link
            to="/cart"
            onClick={closeMenu}
            className="relative rounded-full p-1 transition-colors duration-200 hover:text-green-400"
            aria-label={`Shopping cart with ${cartQuantity} items`}
          >
            <ShoppingCartIcon className="h-8 w-8" />

            {cartQuantity > 0 && (
              <span className="absolute -right-2 -top-2 flex h-6 min-w-6 items-center justify-center rounded-full bg-green-400 px-1 text-xs font-bold text-gray-900">
                {cartQuantity}
              </span>
            )}
          </Link>

          <button
            type="button"
            className="rounded-lg p-1 transition-colors duration-200 hover:bg-gray-800 hover:text-green-400 xl:hidden"
            onClick={() => setMenuOpen((previous) => !previous)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <XMarkIcon className="h-8 w-8" />
            ) : (
              <Bars3Icon className="h-8 w-8" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile and tablet navigation */}
      {menuOpen && (
        <div className="border-t border-gray-700 bg-gray-900 px-4 py-4 xl:hidden">
          <div className="mx-auto flex max-w-md flex-col gap-1">
            <HashLink
              smooth
              to="/#Menu"
              onClick={closeMenu}
              className={mobileLinkStyles}
            >
              Menu
            </HashLink>

            <HashLink
              smooth
              to="/#Services"
              onClick={closeMenu}
              className={mobileLinkStyles}
            >
              Services
            </HashLink>

            <HashLink
              smooth
              to="/#Blog"
              onClick={closeMenu}
              className={mobileLinkStyles}
            >
              Blog
            </HashLink>

            <HashLink
              smooth
              to="/#About"
              onClick={closeMenu}
              className={mobileLinkStyles}
            >
              About Us
            </HashLink>

            <HashLink
              smooth
              to="/#LandingPageForm"
              className={mobileLinkStyles}
              onClick={() => {
                setFormState("contact-us");
                closeMenu();
              }}
            >
              Contact Us
            </HashLink>

            <HashLink
              smooth
              to="/#LandingPageForm"
              className={mobileLinkStyles}
              onClick={() => {
                setFormState("booking-form");
                closeMenu();
              }}
            >
              Book a Table
            </HashLink>
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavBar;