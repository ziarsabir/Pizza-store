import React from 'react';

function MenuItems({ category, items, addToCart }) {  
  return (
      <div className="font-bold font-italian menu-items bg-gray-900 text-white p-6 rounded-lg">
          <h3 className="text-2xl font-semibold text-green-400 mb-6">{category}</h3>
          <ul className="grid grid-cols-2 gap-6">
              {items.map((item, index) => (
                  <li key={index} className="p-4 border border-gray-700 rounded-lg shadow-sm bg-gray-800">
                      <div className="flex justify-between items-center mb-2">
                          <h4 className="text-lg font-bold text-white">{item.name}</h4>
                          <span className="text-green-400 font-bold">£{item.price.toFixed(2)}</span>
                      </div>
                      <p className="text-gray-300">{item.description}</p>
                      <button 
                          onClick={() => addToCart(item)}  
                          className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg text-lg font-semibold hover:bg-red-600 transition"
                      >
                          Add To Cart
                      </button>
                  </li>
              ))}
          </ul>
      </div>
  );
}

export default MenuItems;