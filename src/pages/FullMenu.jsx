import React, { useEffect } from 'react';
import MenuItems from '../components/MenuItems';
import MenuObjectsItems from '../components/MenuObjectsItems';
import { Link } from 'react-router-dom';

const menu = {
    Starters: [
        { name: "Garlic Bread", price: 5.0, description: "Freshly baked with butter and herbs, serves 3" },
        { name: "Tomato Soup", price: 4.5, description: "Creamy tomato soup served with crispy croutons." },
        { name: "Pomodoro Bruschetta", price: 5.0, description: "Freshly chopped and seasoned tomatoes with a pinch of garlic" },
        { name: "Arancini", price: 6.0, description: "Crispy risotto balls stuffed with cheese and served with marinara sauce." },
        { name: "Calamari Fritti", price: 7.5, description: "Crispy fried calamari served with a lemon aioli dip." }
    ],
    Mains: [
        { name: "Spaghetti Carbonara", price: 10.0, description: "Pasta with creamy cheesy sauce and lovely bacon." },
        { name: "Grilled Chicken", price: 15.0, description: "Tender grilled chicken served with fresh vegetables." },
        { name: "Lasagna al Forno", price: 12.5, description: "Oven-baked lasagna with rich meat sauce and melted cheese." },
        { name: "Risotto Funghi", price: 13.0, description: "Creamy risotto with wild mushrooms and parmesan cheese." }
    ],
    Pizzas: [
        { name: "Pepperoni Pizza", price: 12.0, description: "Cheesy and mouth-watering pepperoni pizza, serves 2" },
        { name: "Margherita", price: 9.0, description: "The classic tomato and mozzarella, serves 2" },
        { name: "Reggio Calabria", price: 10.5, description: "Tomato, mozzarella, spicy Nduja sausage and rocket, serves 2" },
        { name: "Parma", price: 10.5, description: "Tomato, mozzarella, prosciutto Parma and rocket" },
        { name: "Quattro Formaggi", price: 11.0, description: "Four cheese pizza with mozzarella, gorgonzola, parmesan, and ricotta." },
        { name: "Diavola", price: 11.5, description: "Spicy salami, mozzarella, tomato sauce, and fresh basil." }
    ],
    Desserts: [
        { name: "Chocolate Cake", price: 6.0, description: "Rich and moist chocolate cake topped with ganache." },
        { name: "Ice Cream", price: 4.0, description: "Two scoops of creamy ice cream in various flavors." },
        { name: "Tiramisu", price: 7.0, description: "Classic Italian dessert with layers of coffee-soaked sponge and mascarpone cream." },
        { name: "Panna Cotta", price: 6.5, description: "Creamy vanilla dessert with a berry compote." }
    ],
    Drinks: {
        Alcoholic: [
            { name: "The Long White Sauvignon Blanc White Wine", price: 24.0, description: "Aromas of meadow flowers and exotic fruit with hints of almonds." },
            { name: "Peroni Beer", price: 5.0, description: "Brewed in Italy since 1963, a delicate balance of bitterness." },
            { name: "Aperol Spritz", price: 8.0, description: "Refreshing Italian cocktail with Aperol, Prosecco, and soda." },
            { name: "Negroni", price: 9.0, description: "Classic Italian cocktail with gin, vermouth, and Campari." }
        ],
        'Non-Alcoholic': [
            { name: "Lemonade", price: 3.0 },
            { name: "Iced Tea", price: 3.5 },
            { name: "San Pellegrino", price: 3.5, description: "Sparkling Italian mineral water." },
            { name: "Espresso", price: 2.5, description: "Strong and bold Italian coffee." }
        ]
    }
};

function FullMenu({ addToCart }) {
    const categories = []; 
    for (let category in menu) {
        categories.push(category);
    }

    // Scroll to the top when the component loads
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <section id="FullMenu" className="font-italian font-bold p-6 bg-gray-900 text-white mt-14">
            <h2 className="text-3xl text-center text-green-400 font-semibold mb-4">Full Menu</h2>
            <p className="text-center text-gray-300 mb-6">See our complete selection of dishes.</p>

            {/* Navigation Buttons for Scrolling */}
            <div className="flex justify-center gap-4 mb-6 flex-wrap">
                {categories.map((category, index) => (
                    <button
                        key={index}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 shadow-md"
                        onClick={() => {
                            const section = document.getElementById(category);
                            if (section) {
                                section.scrollIntoView({ behavior: "smooth" });
                            }
                        }}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Back to Home Page Button */}
            <div className="flex justify-center mb-6">
                <Link to="/" className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 shadow-md">
                    Back to Home
                </Link>
            </div>

            {/* Display All Categories */}
            {categories.map((category, index) => (
                <div key={index} id={category} className="mb-8">
                    <h3 className="text-2xl text-green-400 font-semibold border-b pb-2 mb-4">{category}</h3>
                    {Array.isArray(menu[category]) ? (
                        <MenuItems category={category} items={menu[category]} addToCart={addToCart} />
                    ) : (
                        <MenuObjectsItems category={category} items={menu[category]} addToCart={addToCart} />
                    )}
                </div>
            ))}
        </section>
    );
}

export default FullMenu;