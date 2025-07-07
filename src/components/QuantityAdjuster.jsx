import React from "react";

function QuantityAdjuster({ quantity, increaseQuantity, decreaseQuantity }) {
  return (
    <div className="flex items-center">
      <button
        className="bg-red-500 px-2 py-1 rounded text-white"
        onClick={decreaseQuantity}
      >
        -
      </button>
      <span className="px-2">{quantity}</span>
      <button
        className="bg-green-500 px-2 py-1 rounded text-white"
        onClick={increaseQuantity}
      >
        +
      </button>
    </div>
  );
}

export default QuantityAdjuster;
