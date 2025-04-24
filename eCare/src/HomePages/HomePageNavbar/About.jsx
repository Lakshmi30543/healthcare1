import React from 'react';
import about1 from '../../assets/images/about-01.webp';
import about2 from '../../assets/images/about-02.jpg';
import "../styles/about.css"

export default function About() {
  return (
    <div className="about-us-container">
      <div className="about-us-content">
        {/* Left side with overlapping images */}
        <div className="about-us-images">
          <div className="image-wrapper primary-image">
            <img 
              src={about1} 
              alt="Medical professionals" 
              className="about-image-1" 
            />
          </div>
          <div className="image-wrapper secondary-image">
            <img 
              src={about2} 
              alt="Doctor with patient" 
              className="about-image-2" 
            />
            <div className="experience-badge">
              <span className="years">25+</span>
              <span className="text">Years of Experience</span>
            </div>
          </div>
        </div>
        
        {/* Right side content */}
        <div className="about-us-text">
          <span className="section-subtitle">About Us</span>
          <h2 className="section-title">The Great Place Of Medical Hospital Center.</h2>
          
          <p className="description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
            ut labore et dolore magna aliqua. Quis ipsum susp endisse ultrices gravida tempor incididu 
            t labore et dolore magna aliqua. Quis ipsum susp endisse ultrices gravida.
          </p>
          
          <ul className="services-list">
            <li><span className="check-icon">✓</span> Ambulance Services</li>
            <li><span className="check-icon">✓</span> Pharmacy On Clinic</li>
            <li><span className="check-icon">✓</span> 24/7 Medical Emergency</li>
            <li><span className="check-icon">✓</span> Oxygen On Wheel</li>
            <li><span className="check-icon">✓</span> On Duty Doctors</li>
          </ul>
          
          <button className="discover-button">
            Discover More
          </button>
        </div>
      </div>
    </div>
  );
}
