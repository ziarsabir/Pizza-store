import React, { useState } from "react"; 
import QuantityAdjuster from "../components/QuantityAdjuster";
import ConfirmDeleteItemModal from "../components/ConfirmDeleteItemModal";

export default function CartPage({ cart, setCart }) {
    // const [items, setItems] = useState(cart); 
    // console.log('items', items);

    // Controls modal visibility
    const [openModal, setOpenModal] = useState(false);  
    // Tracks the item to be deleted
    const [deleteIndex, setDeleteIndex] = useState(null);  

    function calcTotalPrice() {
        let total = 0;
        for (let i = 0; i < cart.length; i++) {
            total += cart[i].price * cart[i].quantity;
        }
        return total;
    }

    function increaseQuantity(index) {
        let updatedCart = [...cart];
        updatedCart[index].quantity += 1;
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    }

    function decreaseQuantity(index) {
        let updatedCart = [...cart];

        if (updatedCart[index].quantity > 1) {
            updatedCart[index].quantity -= 1;
        } else {
            // Instead of deleting immediately, open the confirmation modal
            setDeleteIndex(index);
            setOpenModal(true);
            return; 
        }

        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    }

    function confirmDelete() {
        let updatedCart = [...cart];
        // Remove item after confirmation
        updatedCart.splice(deleteIndex, 1); 

        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));

        setOpenModal(false);
        setDeleteIndex(null);
    }

    return (
        <div className="font-italian font-bold p-6 bg-gray-900 text-white min-h-screen mt-14">
            <h3 className="text-3xl text-center font-semibold mb-6 text-white-400">Shopping Cart</h3>

            {cart.length === 0 ? (
                <p className="text-center text-gray-400">Your cart is empty.</p>
            ) : (
                <table className="w-full border border-gray-700 text-center">
                    <thead>
                        <tr className="bg-gray-800 text-white">
                            <th className="p-3 border border-gray-700">Item</th>
                            <th className="p-3 border border-gray-700">Price</th>
                            <th className="p-3 border border-gray-700">Quantity</th>
                            <th className="p-3 border border-gray-700">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((item, index) => (
                            <tr key={index} className="border border-gray-700">
                                <td className="p-3">{item.name}</td>
                                <td className="p-3 text-white-400 font-semibold">£{item.price.toFixed(2)}</td>
                                <td className="p-3">
                                    <QuantityAdjuster
                                        quantity={item.quantity}
                                        increaseQuantity={() => increaseQuantity(index)}
                                        decreaseQuantity={() => decreaseQuantity(index)}
                                    />
                                </td>
                                <td className="p-3 text-white-400 font-semibold">
                                    £{(item.price * item.quantity).toFixed(2)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <div className="mt-6 text-right">
                <h4 className="text-2xl font-semibold text-white-400">Total: £{calcTotalPrice().toFixed(2)}</h4>
                <button className="mt-4 bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 shadow-md">
                    Proceed to Checkout
                </button>
            </div>

            <ConfirmDeleteItemModal
                open={openModal}
                handleClose={() => setOpenModal(false)}
                handleConfirm={confirmDelete}
            />
        </div>
    );
}
