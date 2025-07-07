import React from 'react';

const cart = {
    items: [
        'pepperoni pizza', 
        'pasta', 
        'bruschetta'
    ], 
}

export default function CartPage() {
    return (
        <div className="p-6 bg-gray-900 text-white min-h-screen">
            {/* Notes: This table will need to be dynamically populated with cart items from state in Menu.jsx */}
            {/* We will need to implement addToCart and removeFromCart functions */}
            {/* We will need to incorporate addToCart to MenuItems and MenuObject items via onclick attribute */}
            {/* We will need to add removeFromCart function to this page */}
            {/* The total price should be dynamically calculated based on item prices and quantities */}
            
            <h3 className="text-2xl font-semibold mb-4">Shopping Cart</h3>
            <table className="w-full border border-gray-700">
                <thead>
                    <tr className="bg-gray-800 text-white">
                        <th className="p-2 border border-gray-700">Item</th>
                        <th className="p-2 border border-gray-700">Price</th>
                        <th className="p-2 border border-gray-700">Quantity</th>
                        <th className="p-2 border border-gray-700">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Example row: This should be dynamically rendered */}
                    <tr className="text-center border border-gray-700">
                        <td className="p-2">Pepperoni Pizza <br /> Large with 10 slices</td>
                        <td className="p-2">&pound;10.00</td>
                        <td className="p-2">
                        <button className="bg-red-500 px-2 py-1 rounded text-white">-</button>
                            <span className="px-2">1</span>
                            <button className="bg-green-500 px-2 py-1 rounded text-white">+</button>
                        </td>
                        <td className="p-2">&pound;10.00</td>
                            
                    </tr>
                    <tr className="text-center border border-gray-700">
                        <td className="p-2">Cheeseburger <br /> With extra cheese</td>
                        <td className="p-2">&pound;7.50</td>
                        <td className="p-2">
                            <button className="bg-red-500 px-2 py-1 rounded text-white">-</button>
                            <span className="px-2">2</span>
                            <button className="bg-green-500 px-2 py-1 rounded text-white">+</button>
                        </td>
                        <td className="p-2">&pound;15.00</td>
                    </tr>
                </tbody>
            </table>
            
            {/* Notes: The checkout button should eventually trigger a payment process */}
            <div className="mt-6 text-right">
                <h4 className="text-xl font-semibold">Total: &pound;25.00</h4>
                <button className="mt-2 bg-blue-500 px-4 py-2 rounded text-white">Proceed to Checkout</button>
            </div>
        </div>
    );
}