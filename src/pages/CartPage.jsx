import React, { useState } from "react";
import QuantityAdjuster from "../components/QuantityAdjuster";
import ConfirmDeleteItemModal from "../components/ConfirmDeleteItemModal";

export default function CartPage({ cart, setCart }) {
  const [openModal, setOpenModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  function increaseQuantity(index) {
    setCart((currentCart) =>
      currentCart.map((item, itemIndex) => {
        if (itemIndex !== index) {
          return item;
        }

        return {
          ...item,
          quantity: item.quantity + 1,
        };
      })
    );
  }

  function decreaseQuantity(index) {
    const selectedItem = cart[index];

    if (selectedItem.quantity === 1) {
      setDeleteIndex(index);
      setOpenModal(true);
      return;
    }

    setCart((currentCart) =>
      currentCart.map((item, itemIndex) => {
        if (itemIndex !== index) {
          return item;
        }

        return {
          ...item,
          quantity: item.quantity - 1,
        };
      })
    );
  }

  function confirmDelete() {
    if (deleteIndex === null) {
      return;
    }

    setCart((currentCart) =>
      currentCart.filter((_, index) => index !== deleteIndex)
    );

    setOpenModal(false);
    setDeleteIndex(null);
  }

  function closeDeleteModal() {
    setOpenModal(false);
    setDeleteIndex(null);
  }

  return (
    <main className="min-h-screen bg-gray-900 px-4 pb-10 pt-24 font-italian font-bold text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-center text-3xl font-semibold sm:text-4xl">
          Shopping Cart
        </h1>

        {cart.length === 0 ? (
          <div className="rounded-lg border border-gray-700 bg-gray-800 p-8 text-center">
            <p className="text-lg text-gray-300">
              Your cart is empty.
            </p>
          </div>
        ) : (
          <>
            {/* Mobile cart cards */}
            <div className="space-y-4 md:hidden">
              {cart.map((item, index) => (
                <article
                  key={`${item.name}-${index}`}
                  className="rounded-lg border border-gray-700 bg-gray-800 p-4 shadow-sm"
                >
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <h2 className="min-w-0 break-words text-lg font-bold text-white">
                      {item.name}
                    </h2>

                    <span className="shrink-0 whitespace-nowrap text-green-400">
                      £{item.price.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-end justify-between gap-4 border-t border-gray-700 pt-4">
                    <div>
                      <p className="mb-2 text-sm text-gray-400">
                        Quantity
                      </p>

                      <QuantityAdjuster
                        quantity={item.quantity}
                        increaseQuantity={() =>
                          increaseQuantity(index)
                        }
                        decreaseQuantity={() =>
                          decreaseQuantity(index)
                        }
                      />
                    </div>

                    <div className="text-right">
                      <p className="mb-1 text-sm text-gray-400">
                        Item total
                      </p>

                      <p className="whitespace-nowrap text-xl font-bold text-green-400">
                        £
                        {(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Tablet and desktop table */}
            <div className="hidden overflow-x-auto rounded-lg border border-gray-700 md:block">
              <table className="w-full min-w-[700px] table-fixed text-center">
                <colgroup>
                  <col className="w-[40%]" />
                  <col className="w-[18%]" />
                  <col className="w-[24%]" />
                  <col className="w-[18%]" />
                </colgroup>

                <thead>
                  <tr className="bg-gray-800 text-white">
                    <th className="border-b border-r border-gray-700 p-4">
                      Item
                    </th>

                    <th className="border-b border-r border-gray-700 p-4">
                      Price
                    </th>

                    <th className="border-b border-r border-gray-700 p-4">
                      Quantity
                    </th>

                    <th className="border-b border-gray-700 p-4">
                      Total
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {cart.map((item, index) => (
                    <tr
                      key={`${item.name}-${index}`}
                      className="bg-gray-900"
                    >
                      <td className="break-words border-r border-t border-gray-700 p-4 text-left">
                        {item.name}
                      </td>

                      <td className="whitespace-nowrap border-r border-t border-gray-700 p-4 font-semibold">
                        £{item.price.toFixed(2)}
                      </td>

                      <td className="border-r border-t border-gray-700 p-4">
                        <div className="flex justify-center">
                          <QuantityAdjuster
                            quantity={item.quantity}
                            increaseQuantity={() =>
                              increaseQuantity(index)
                            }
                            decreaseQuantity={() =>
                              decreaseQuantity(index)
                            }
                          />
                        </div>
                      </td>

                      <td className="whitespace-nowrap border-t border-gray-700 p-4 font-semibold text-green-400">
                        £
                        {(item.price * item.quantity).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex flex-col items-stretch gap-4 rounded-lg border border-gray-700 bg-gray-800 p-5 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-center text-2xl font-semibold sm:text-left">
                Total:{" "}
                <span className="whitespace-nowrap text-green-400">
                  £{totalPrice.toFixed(2)}
                </span>
              </h2>

              <button
                type="button"
                className="w-full rounded-lg bg-red-500 px-6 py-3 text-lg text-white shadow-md transition-colors duration-200 hover:bg-red-600 sm:w-auto"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}

        <ConfirmDeleteItemModal
          open={openModal}
          handleClose={closeDeleteModal}
          handleConfirm={confirmDelete}
        />
      </div>
    </main>
  );
}