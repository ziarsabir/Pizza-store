import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuItems from "./MenuItems";
import MenuObjectsItems from "./MenuObjectsItems";

const menu = {
  Starters: [
    {
      name: "Garlic Bread",
      price: 5.0,
      description: "Freshly baked with butter and herbs, serves 3",
    },
    {
      name: "Tomato Soup",
      price: 4.5,
      description: "Creamy tomato soup served with crispy croutons.",
    },
    {
      name: "Pomodoro Bruschetta",
      price: 5.0,
      description:
        "Freshly chopped and seasoned tomatoes with a pinch of garlic",
    },
  ],

  Mains: [
    {
      name: "Spaghetti Carbonara",
      price: 10.0,
      description: "Pasta with creamy cheesy sauce and lovely bacon.",
    },
    {
      name: "Grilled Chicken",
      price: 15.0,
      description: "Tender grilled chicken served with fresh vegetables.",
    },
  ],

  Pizzas: [
    {
      name: "Pepperoni Pizza",
      price: 12.0,
      description: "Cheesy and mouth-watering pepperoni pizza, serves 2",
    },
    {
      name: "Margherita",
      price: 9.0,
      description: "The classic tomato and mozzarella, serves 2",
    },
    {
      name: "Reggio Calabria",
      price: 10.5,
      description:
        "Tomato, mozzarella, spicy Nduja sausage and rocket, serves 2",
    },
    {
      name: "Parma",
      price: 10.5,
      description: "Tomato, mozzarella, prosciutto Parma and rocket",
    },
  ],

  Desserts: [
    {
      name: "Chocolate Cake",
      price: 6.0,
      description: "Rich and moist chocolate cake topped with ganache.",
    },
    {
      name: "Ice Cream",
      price: 4.0,
      description: "Two scoops of creamy ice cream in various flavors.",
    },
  ],

  Drinks: {
    Alcoholic: [
      {
        name: "The Long White Sauvignon Blanc White Wine",
        price: 24.0,
        description:
          "Aromas of meadow flowers and exotic fruit with hints of almonds.",
      },
      {
        name: "Peroni Beer",
        price: 5.0,
        description:
          "Brewed in Italy since 1963, a delicate balance of bitterness.",
      },
    ],

    "Non-Alcoholic": [
      {
        name: "Lemonade",
        price: 3.0,
      },
      {
        name: "Iced Tea",
        price: 3.5,
      },
    ],
  },
};

function Menu({ addToCart }) {
  const categories = Object.keys(menu);
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const navigate = useNavigate();

  return (
    <section
      id="Menu"
      className="scroll-mt-16 bg-gray-900 px-4 py-10 text-white sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-4 text-center font-italian text-4xl font-bold text-green-400 sm:text-5xl">
          Our Menu
        </h2>

        <p className="mb-6 text-center font-italian text-lg font-bold sm:text-xl">
          Explore our diverse range of delicious offerings.
        </p>

        <div className="mb-8 flex justify-center font-italian font-bold">
          <button
            type="button"
            onClick={() => navigate("/full-menu")}
            className="rounded-lg bg-red-500 px-6 py-3 text-lg font-semibold text-white transition-colors duration-200 hover:bg-red-600 sm:px-8 sm:text-xl"
          >
            View Full Menu
          </button>
        </div>

        <div className="mb-8 w-full">
          <div className="mx-auto grid w-full max-w-xl grid-cols-2 gap-3 font-italian font-bold sm:grid-cols-3 lg:grid-cols-5">
            {categories.map((category) => {
              const activeStyles =
                category === activeCategory
                  ? "bg-green-400 text-gray-900"
                  : "bg-green-500 text-white";

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`w-full min-w-0 rounded-lg px-2 py-3 text-sm transition-colors duration-200 hover:bg-green-600 sm:px-4 sm:text-base ${activeStyles}`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        <div className="menu-container rounded-lg bg-gray-800 p-4 shadow-md sm:p-6">
          {Array.isArray(menu[activeCategory]) ? (
            <MenuItems
              category={activeCategory}
              items={menu[activeCategory]}
              addToCart={addToCart}
            />
          ) : (
            <MenuObjectsItems
              category={activeCategory}
              items={menu[activeCategory]}
              addToCart={addToCart}
            />
          )}
        </div>
      </div>
    </section>
  );
}

export default Menu;