import React, { useState, useEffect } from "react";
import PHeroImg from "../assets/images/PHeroImg.jpeg";
import PHeroImg2 from "../assets/images/PHeroImg2.jpeg";
import PHeroImg3 from "../assets/images/PHeroImg3.jpeg";
import "./styles/pherosection.css"
const slides = [
  {
    image: PHeroImg,
    title: "Your Health, Our Priority",
    description: "Book appointments, checkups, and vaccinations seamlessly.",
  },
  {
    image: PHeroImg2,
    title: "24/7 Healthcare Services",
    description: "Connect with doctors anytime, anywhere.",
  },
  {
    image: PHeroImg3,
    title: "Easy & Quick Appointments",
    description: "Schedule appointments with just one click!",
  },
];

export default function PHeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000); // Change entire slide every 5 seconds

    return () => clearInterval(interval); // Cleanup function
  }, []);

  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1>{slides[currentIndex].title}</h1>
        <p>{slides[currentIndex].description}</p>
        <button className="hero-btn">Get Started</button>
      </div>
      <div className="hero-image">
        <img src={slides[currentIndex].image} alt="Healthcare Hero" />
      </div>
    </div>
  );
}
