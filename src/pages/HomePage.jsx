import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import About from "../components/About";
import Blog from "../components/Blog";
import HeroSection from "../components/HeroSection";
import Menu from "../components/Menu";
import Services from "../components/Services";
import SocialisingImages from "../components/SocialisingImages";
import Specials from "../components/Specials";
import LandingPageForm from "../components/LandingPageForm";

export default function HomePage({ addToCart, formState, setFormState }) {
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const sectionId = params.get("scrollTo");

        if (sectionId) {
            const section = document.getElementById(sectionId);
            if (section) {
                section.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [location]);

    return (
        <div className="mt-14">
            <HeroSection />
            <About />
            <Services />
            <Specials />
            <Menu addToCart={addToCart} />
            <SocialisingImages />
            <Blog />
            <LandingPageForm formState={formState} setFormState={ setFormState } />
        </div>
    );
}