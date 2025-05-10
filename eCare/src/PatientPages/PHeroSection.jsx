import React from "react";
import PHeroImg from "../assets/images/phero.jpg";
import "./styles/pherosection.css";

export default function PHeroSection() {
  return (
    <div className="mouse-hero-container">
      <div className="mouse-hero-content">
        <h1>Your Health, Our Priority</h1>
        <p>Book appointments, checkups, and vaccinations seamlessly.</p>
      </div>
      <div className="mouse-hero-image-wrapper">
        <img 
          src={PHeroImg} 
          alt="Healthcare Hero" 
          className="mouse-hero-image" 
        />
      </div>
    </div>
  );
}