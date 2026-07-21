import React from "react";

function MenuItems({ category, items, addToCart }) {
  return (
    <div className="menu-items rounded-lg bg-gray-900 p-4 font-italian font-bold text-white sm:p-6">
      <h3 className="mb-6 text-center text-2xl font-semibold text-green-400 sm:text-left">
        {category}
      </h3>

      <ul className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {items.map((item, index) => (
          <li
            key={`${item.name}-${index}`}
            className="flex min-w-0 flex-col rounded-lg border border-gray-700 bg-gray-800 p-4 shadow-sm"
          >
            <div className="mb-3 flex min-w-0 flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
              <h4 className="min-w-0 break-words text-lg font-bold text-white">
                {item.name}
              </h4>

              <span className="shrink-0 whitespace-nowrap font-bold text-green-400">
                £{item.price.toFixed(2)}
              </span>
            </div>

            <p className="mb-4 flex-1 break-words text-gray-300">
              {item.description}
            </p>

            <button
              type="button"
              onClick={() => addToCart(item)}
              className="mt-auto w-full rounded-lg bg-red-500 px-4 py-2 text-lg font-semibold text-white transition-colors duration-200 hover:bg-red-600 sm:w-auto sm:self-start"
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