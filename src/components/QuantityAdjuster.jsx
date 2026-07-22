import React from "react";

function QuantityAdjuster({
  quantity,
  increaseQuantity,
  decreaseQuantity,
}) {
  return (
    <div className="inline-flex items-center overflow-hidden rounded-lg border border-gray-600 bg-gray-900">
      <button
        type="button"
        onClick={decreaseQuantity}
        className="flex h-9 w-9 items-center justify-center bg-red-500 text-lg font-bold text-white transition-colors duration-200 hover:bg-red-600"
        aria-label="Decrease quantity"
      >
        −
      </button>

      <span
        className="flex h-9 min-w-10 items-center justify-center px-2 text-center text-base font-bold text-white"
        aria-live="polite"
      >
        {quantity}
      </span>

      <button
        type="button"
        onClick={increaseQuantity}
        className="flex h-9 w-9 items-center justify-center bg-green-500 text-lg font-bold text-white transition-colors duration-200 hover:bg-green-600"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}

export default QuantityAdjuster;