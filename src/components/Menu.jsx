import React, { useState } from 'react';
import MenuItems from './MenuItems';
import MenuObjectsItems from './MenuObjectsItems';
import { useNavigate } from 'react-router-dom'; 


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
            description: "Freshly chopped and seasoned tomatoes with a pinch of garlic",
        }
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
        }
    ],
    Pizzas: [
        {
            name: "Pepporoni Pizza",
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
            description: "Tomato, mozzarella, spicy Nduja sausage and rocket, serves 2",
        },
        {
            name: "Parma",
            price: 10.5,
            description: "Tomato, mozzarella, prosciutto Parma and rocket",
        }
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
        }
    ],
    Drinks: {
        Alcoholic: [
            {
                name: "The Long White Sauvignon Blanc White Wine",
                price: 24.0,
                description: "Aromas of meadow flowers and exotic fruit with hints of almonds."
            },
            {
                name: "Peroni Beer",
                price: 5.0,
                description: "Brewed in Italy since 1963, a delicate balance of bitterness."
            }
        ],
        'Non-Alcoholic': [
            {
                name: "Lemonade",
                price: 3.0
            },
            {
                name: "Iced Tea",
                price: 3.5
            }
        ]
    }
};

function Menu({ addToCart }) {
    const categories = [];
    for (let category in menu) {
        categories.push(category);
    }

    const [activeCategory, setActiveCategory] = useState(categories[0]);
    const navigate = useNavigate();

    const handleCategoryClick = (category) => {
        setActiveCategory(category);
    };

    return (
        <section id="Menu" className="p-6 bg-gray-900 text-white">
            <h2 className="font-italian font-bold text-4xl text-center font-semibold mb-4 text-green-400">Our Menu</h2>
            <p className="font-italian font-bold text-center mb-6">Explore our diverse range of delicious offerings.</p>

            {/* View Full Menu Button */}
            <div className="font-italian font-bold flex justify-center mb-6">
                <button 
                    onClick={() => navigate('/full-menu')} 
                    className="px-4 py-2 bg-red-500 text-white rounded-lg text-lg font-semibold hover:bg-red-600 transition"
                >
                    View Full Menu
                </button>
            </div>


            {/* Row of buttons for categories */}
            <div className="font-italian font-bold flex justify-center gap-4 mb-6">
                {categories.map((category, index) => {
                    let classActive = category === activeCategory ? 'bg-green-400' : 'bg-green-500';
                    return (
                        <button
                            key={index}
                            className={`px-4 py-2 text-white rounded hover:bg-green-600 ${classActive}`}
                            onClick={() => handleCategoryClick(category)}
                        >
                            {category}
                        </button>
                    );
                })}
            </div>

            {/* Placeholder for menu items */}
            <div className="menu-container bg-gray-800 p-6 rounded-lg shadow-md">
                {categories.map((category, index) => {
                    if (category === activeCategory) {
                        return Array.isArray(menu[category]) ? (
                            <MenuItems key={index} category={category} items={menu[category]} addToCart={addToCart} />
                        ) : (
                            <MenuObjectsItems key={index} category={category} items={menu[category]} addToCart={addToCart} />
                        );
                    }
                    return null;
                })}
            </div>
        </section>
    );
}

export default Menu;