import React from "react";
import HeroSection from "../HomePages/HeroSection";
import HighlightedDoctors from "../HomePages/HighlightedDoctors";
import About from "../HomePages/HomePageNavbar/About";
import Program from "../HomePages/HomePageNavbar/Program";
import Footer from "../HomePages/Footer";
import Blog from "./HomePageNavbar/Blog";
// import logo from "../assets/images/eCareLogo.webp"; // Ensure the logo import
function Home() {
  return (
    <>
      {/* Header */}
      {/* Main Content */}
      <HeroSection />
      <HighlightedDoctors />
      <About />
      <Program />
      <Blog/>
      <Footer />
    </>
  );
}

export default Home;
