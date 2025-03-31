import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import Menu from "../components/Menu";
import About from "../components/About";
import Footer from "../components/Footer";
import "../styles/landingPage.css";

function LandingPage() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <Menu />
      <About />
      <Footer />
    </div>
  );
}

export default LandingPage;