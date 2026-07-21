import React, { useState } from "react";
import QuantityAdjuster from "../components/QuantityAdjuster";
import ConfirmDeleteItemModal from "../components/ConfirmDeleteItemModal";

export default function CartPage({ cart, setCart }) {
  const [openModal, setOpenModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  function calcTotalPrice() {
    let total = 0;

    for (let i = 0; i < cart.length; i++) {
      total += cart[i].price * cart[i].quantity;
    }

    return total;
  }

  function increaseQuantity(index) {
    const updatedCart = [...cart];

    updatedCart[index] = {
      ...updatedCart[index],
      quantity: updatedCart[index].quantity + 1,
    };

    setCart(updatedCart);
  }

  function decreaseQuantity(index) {
    const updatedCart = [...cart];

    if (updatedCart[index].quantity > 1) {
      updatedCart[index] = {
        ...updatedCart[index],
        quantity: updatedCart[index].quantity - 1,
      };

      setCart(updatedCart);
    } else {
      setDeleteIndex(index);
      setOpenModal(true);
    }
  }

  function confirmDelete() {
    const updatedCart = [...cart];

    updatedCart.splice(deleteIndex, 1);

    setCart(updatedCart);
    setOpenModal(false);
    setDeleteIndex(null);
  }

  function closeDeleteModal() {
    setOpenModal(false);
    setDeleteIndex(null);
  }

  return (
    <div className="mt-14 min-h-screen bg-gray-900 p-6 font-italian font-bold text-white">
      <h3 className="mb-6 text-center text-3xl font-semibold">
        Shopping Cart
      </h3>

      {cart.length === 0 ? (
        <p className="text-center text-gray-400">Your cart is empty.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-fixed border border-gray-700 text-center">
            <colgroup>
              <col className="w-2/5" />
              <col className="w-1/5" />
              <col className="w-1/5" />
              <col className="w-1/5" />
            </colgroup>

            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="border border-gray-700 p-3">Item</th>
                <th className="border border-gray-700 p-3">Price</th>
                <th className="border border-gray-700 p-3">Quantity</th>
                <th className="border border-gray-700 p-3">Total</th>
              </tr>
            </thead>

            <tbody>
              {cart.map((item, index) => (
                <tr
                  key={`${item.name}-${index}`}
                  className="border border-gray-700"
                >
                  <td className="p-3">{item.name}</td>

                  <td className="p-3 font-semibold">
                    £{item.price.toFixed(2)}
                  </td>

                  <td className="p-3">
                    <div className="mx-auto flex w-28 items-center justify-center">
                      <QuantityAdjuster
                        quantity={item.quantity}
                        increaseQuantity={() => increaseQuantity(index)}
                        decreaseQuantity={() => decreaseQuantity(index)}
                      />
                    </div>
                  </td>

                  <td className="p-3 font-semibold">
                    £{(item.price * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {cart.length > 0 && (
        <div className="mt-6 text-right">
          <h4 className="text-2xl font-semibold">
            Total: £{calcTotalPrice().toFixed(2)}
          </h4>

          <button
            type="button"
            className="mt-4 rounded-lg bg-red-500 px-6 py-2 text-white shadow-md transition-colors duration-200 hover:bg-red-600"
          >
            Proceed to Checkout
          </button>
        </div>
      )}

      <ConfirmDeleteItemModal
        open={openModal}
        handleClose={closeDeleteModal}
        handleConfirm={confirmDelete}
      />
    </div>
  );
}