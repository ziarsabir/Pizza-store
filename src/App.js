import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import FullMenu from "./pages/FullMenu";
import Menu from "./components/Menu";
import BlogDetails from "./pages/BlogDetails";
import ContactForm from "./components/ContactForm";

function App() {
    const [cart, setCart] = useState(
        JSON.parse(localStorage.getItem("cart")) || []
    );

    const [formState, setFormState] = useState('contact-us'); 

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    function addToCart(item) {
        let updatedCart = [...cart]; 
        let existingItemIndex = updatedCart.findIndex((cartItem) => cartItem.name === item.name);

        if (existingItemIndex !== -1) {
            updatedCart[existingItemIndex].quantity += 1;
        } else {
            updatedCart.push({ ...item, quantity: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setCart(updatedCart);
    }

    return (
        <Router>
            <NavBar cart={cart} setFormState={ setFormState } />
            <Routes>
                <Route path="/" element={<HomePage addToCart={addToCart} formState={ formState } setFormState={ setFormState } />} />
                <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} />} />
                <Route path="/full-menu" element={<FullMenu addToCart={addToCart} />} />
                <Route path="/menu" element={<Menu addToCart={addToCart} />} />
                <Route path="/blog/:id" element={<BlogDetails />} /> 
                <Route path="/contact" element={<ContactForm formState={ formState } />} />
            </Routes>
            
            <Footer />
        </Router>
    );
}

export default App;
