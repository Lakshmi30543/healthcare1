import React from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import "./styles/navbar.css"
import About from "../HomePages/HomePageNavbar/About";
import Program from "../HomePages/HomePageNavbar/Program";
import Pages from "../HomePages/HomePageNavbar/Pages";
import Blog from "../HomePages/HomePageNavbar/Blog";
import Contact from "../HomePages/HomePageNavbar/Contact";

import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Home from "./Home";
import Login from "./Login";
import DoctorRegistration from "./DoctorRegistration";
import PatientRegistration from "./PatientRegistration";
import logo from "../assets/images/eCareLogo.webp";

function Navbar() {
  const location = useLocation();

  // Hide Navbar on login & registration pages
  const hideNavbar = ["/login", "/register/doctor", "/register/patient"].includes(location.pathname);

  return (
    <>
      {!hideNavbar && (
        <>
          {/* Fixed navbar only */}
          <nav className="homepage-navbar fixed">
            <div className="navbar-container">
              {/* Logo on left */}
              <div className="navbar-logo">
                <Link to="/">
                  <img src={logo} alt="Logo" className="logo-image" />
                </Link>
              </div>
              
              {/* Navigation links */}
              <ul className="nav-links">
                <li><Link to="/"><i className="fas fa-home"></i> Home</Link></li>
                <li><Link to="/about"><i className="fas fa-info-circle"></i> About</Link></li>
                <li><Link to="/program"><i className="fas fa-calendar-alt"></i> Program</Link></li>
                <li><Link to="/pages"><i className="fas fa-file-alt"></i> Pages</Link></li>
                <li><Link to="/blog"><i className="fas fa-blog"></i> Blog</Link></li>
                <li><Link to="/contact"><i className="fas fa-envelope"></i> Contact</Link></li>
              </ul>
              
              {/* Right-side buttons */}
              <div className="navbar-buttons">
                <Link to="/emergency" className="emergency-button">
                  <i className="fas fa-ambulance"></i> EMERGENCY
                </Link>
                <Link to="/login" className="homepage-appointment">
                  <i className="fas fa-calendar-check"></i> BOOK APPOINTMENT
                </Link>
              </div>
            </div>
          </nav>
        </>
      )}

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/program" element={<Program />} />
        <Route path="/pages" element={<Pages />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register/doctor" element={<DoctorRegistration />} />
        <Route path="/register/patient" element={<PatientRegistration />} />
      </Routes>
    </>
  );
}

export default Navbar;