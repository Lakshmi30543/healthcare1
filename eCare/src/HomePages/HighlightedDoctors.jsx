import React, { useState, useEffect } from 'react';

import doctor1 from '../assets/images/about-01.webp';
import doctor2 from '../assets/images/doctor-2.webp';
import doctor3 from '../assets/images/doctor-3.webp';
import doctor4 from '../assets/images/doctor-4.webp';
import doctor5 from '../assets/images/doctor-1.webp'; 
import doctor6 from '../assets/images/doctor-2.webp'; 
import doctor7 from '../assets/images/doctor-3.webp'; 
import doctor8 from '../assets/images/doctor-4.webp'; 

import "./styles/highlighted.css"
const doctors = [
    {
        name: "Dr. Michael Brown",
        specialty: "Psychologist",
        location: "Minneapolis, MN",
        consultationTime: "30 Min",
        consultationFees: "$650",
        rating: 5.0,
        available: true,
        imageUrl: doctor1
    },
    {
        name: "Dr. Nicholas Tello",
        specialty: "Pediatrician",
        location: "Ogden, IA",
        consultationTime: "60 Min",
        consultationFees: "$400",
        rating: 4.6,
        available: true,
        imageUrl: doctor2
    },
    {
        name: "Dr. Harold Bryant",
        specialty: "Neurologist",
        location: "Winona, MS",
        consultationTime: "30 Min",
        consultationFees: "$500",
        rating: 4.8,
        available: true,
        imageUrl: doctor3
    },
    {
        name: "Dr. Sandra Jones",
        specialty: "Cardiologist",
        location: "Beckley, WV",
        consultationTime: "30 Min",
        consultationFees: "$550",
        rating: 4.8,
        available: true,
        imageUrl: doctor4
    },
    {
        name: "Dr. Emily Smith",
        specialty: "Dermatologist",
        location: "Austin, TX",
        consultationTime: "45 Min",
        consultationFees: "$600",
        rating: 4.7,
        available: true,
        imageUrl: doctor5
    },
    {
        name: "Dr. Robert Wilson",
        specialty: "Orthopedic",
        location: "Denver, CO",
        consultationTime: "50 Min",
        consultationFees: "$700",
        rating: 4.5,
        available: true,
        imageUrl: doctor6
    },
    {
        name: "Dr. Olivia Taylor",
        specialty: "ENT Specialist",
        location: "Seattle, WA",
        consultationTime: "40 Min",
        consultationFees: "$500",
        rating: 4.9,
        available: true,
        imageUrl: doctor7
    },
    {
        name: "Dr. James Anderson",
        specialty: "Urologist",
        location: "Phoenix, AZ",
        consultationTime: "35 Min",
        consultationFees: "$650",
        rating: 4.6,
        available: true,
        imageUrl: doctor8
    }
];

const HighlightedDoctors = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const pages = Math.ceil(doctors.length / 4);
    
    // Function to get doctors for current page
    const getCurrentDoctors = () => {
        const start = currentPage * 4;
        const end = start + 4;
        return doctors.slice(start, end);
    };
    
    // Automatic scrolling
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentPage((prevPage) => (prevPage + 1) % pages);
        }, 5000);
        
        return () => clearInterval(timer);
    }, [pages]);
    
    // Handle dot click
    const handleDotClick = (index) => {
        setCurrentPage(index);
    };
    
    return (
        <div className="highlighted-doctors">
            <h2>Our Highlighted Doctors</h2>
            
            <div className="carousel-container">
                <div className="doctors-cards">
                    {getCurrentDoctors().map((doctor, index) => (
                        <div key={index} className="doctor-card">
                            <div className="image-container">
                                <img 
                                    src={doctor.imageUrl} 
                                    alt={doctor.name} 
                                    className="doctor-image" 
                                />
                                <div className="doctor-rating">⭐ {doctor.rating}</div>
                            </div>
                            <div className="card-content">
                                <div className="doctor-info">
                                    <h3>{doctor.specialty}</h3>
                                    <h4>{doctor.name}</h4>
                                    <div className="location-time">
                                        <span>{doctor.location}</span>
                                        <span className="separator">•</span>
                                        <span>{doctor.consultationTime}</span>
                                    </div>
                                    <div className="fees">Fees: {doctor.consultationFees}</div>
                                </div>
                                <button className="book-button">Book Now</button>
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* Navigation dots directly below cards */}
                <div className="dots-container">
                    {Array.from({ length: pages }).map((_, index) => (
                        <button
                            key={index}
                            className={`dot ${currentPage === index ? 'active' : ''}`}
                            onClick={() => handleDotClick(index)}
                            aria-label={`Page ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HighlightedDoctors;