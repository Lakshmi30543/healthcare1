import React, { useState } from "react";
import { Link, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import eCareLogo from "../assets/images/eCareLogo.webp";
import profile from "../assets/images/profile.jpg";

import Consultation from "./PatientNavBar/Consultation";
import CheckUp from "./PatientNavBar/CheckUp";
import Vaccination from "./PatientNavBar/Vaccination";
import Appointment from "./PatientNavBar/Appointment";
import PatientHome from "./PatientHome";
import BloodService from "./BloodService";
import ApplyBlood from "./ApplyBlood";
import MyAppointments from "./MyAppointments"
import "./styles/pnavbar.css";
import PatientProfile from "./PatientProfile";

function PatientNavbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { setIsPatientLoggedIn } = useAuth();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("isPatientLoggedIn");
    setIsPatientLoggedIn(false);
    navigate("/login");
  };

  return (
    <>
      {/* Unified Top Navigation Bar */}
      <div className="pnavbar">
        <div className="navbar-left">
          <img src={eCareLogo} alt="eCare Logo" className="navbar-logo" />
        </div>

        <div className="navbar-center">
          <Link to="/patient/home" className={`nav-link ${location.pathname === "/patient/home" ? "active" : ""}`}>Home</Link>
          <Link to="/patient/consultation" className={`nav-link ${location.pathname === "/patient/consultation" ? "active" : ""}`}>Consultation</Link>
          <Link to="/patient/checkup" className={`nav-link ${location.pathname === "/patient/checkup" ? "active" : ""}`}>CheckUp</Link> 
          <Link to="/patient/vaccination" className={`nav-link ${location.pathname === "/patient/vaccination" ? "active" : ""}`}>Vaccination</Link>
          <Link to="/patient/bloodservice" className={`nav-link ${location.pathname === "/patient/bloodservice" ? "active" : ""}`}>Blood Service</Link>
          <Link to="/patient/myappointments" className={`nav-link ${location.pathname === "/patient/myappointments" ? "active" : ""}`}>My Appointments</Link>
        </div>

        <div className="navbar-right">
          <img
            src={profile}
            alt="Profile"
            className="profile-img"
            onClick={toggleDropdown}
          />
          {dropdownOpen && (
            <div className="dropdown-menu">
              <Link to="/patient/profile" className="dropdown-item">Profile</Link>
              <Link to="/patient/settings" className="dropdown-item">Settings</Link>
              <button onClick={handleLogout} className="dropdown-item logout">Logout</button>
            </div>
          )}
        </div>
      </div>

      {/* Dynamic Content Display */}
      <div className="patient-content">
        <Routes>
          <Route path="/patient/home" element={<PatientHome />} />
          <Route path="/patient/consultation" element={<Consultation />} />
          <Route path="/patient/checkup" element={<CheckUp />} />
          <Route path="/patient/appointment" element={<Appointment />} />
          <Route path="/patient/vaccination" element={<Vaccination />} />
          <Route path="/patient/bloodservice" element={<BloodService />} />
          <Route path="/patient/applyblood" element={<ApplyBlood />} />
          <Route path="/patient/myappointments" element={<MyAppointments/>}/>
          <Route path="/patient/myappointments" element={<MyAppointments/>}/>
          <Route path="/patient/profile" element={<PatientProfile/>}/>
          
        </Routes>
      </div>
    </>
  );
}

export default PatientNavbar;
