import React from 'react';
import hero from '../assets/images/heroImage.jpg';
import "./styles/hero.css"

export default function HeroSection() {
  return (
    <div className="hero-container">
      <img 
        src={hero} 
        alt="Hero section showcasing our product or service" 
        className="hero-image"
      />
    </div>
  );
}
