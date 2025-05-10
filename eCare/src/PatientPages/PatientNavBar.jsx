import React, { useState } from "react";
import { Link, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import eCareLogo from "../assets/images/eCareLogo.webp";
import profile from "../assets/images/profile.jpg";

import { FaHome, FaStethoscope, FaHeartbeat, FaSyringe, FaTint, FaCalendarCheck } from "react-icons/fa"; // <-- Add this line

import Consultation from "./PatientNavBar/Consultation";
import CheckUp from "./PatientNavBar/CheckUp";
import Vaccination from "./PatientNavBar/Vaccination";
import Appointment from "./PatientNavBar/Appointment";
import PatientHome from "./PatientHome";
import BloodService from "./BloodService";
import ApplyBlood from "./ApplyBlood";
import MyAppointments from "./MyAppointments";
import "./styles/pnavbar.css";
import PatientProfile from "./PatientProfile";
import Report from "./Report";

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
          <Link to="/patient/home" className={`nav-link ${location.pathname === "/patient/home" ? "active" : ""}`}>
            <FaHome style={{marginRight: "7px"}} /> Home
          </Link>
          <Link to="/patient/consultation" className={`nav-link ${location.pathname === "/patient/consultation" ? "active" : ""}`}>
            <FaStethoscope style={{marginRight: "7px"}} /> Consultation
          </Link>
          <Link to="/patient/checkup" className={`nav-link ${location.pathname === "/patient/checkup" ? "active" : ""}`}>
            <FaHeartbeat style={{marginRight: "7px"}} /> CheckUp
          </Link> 
          <Link to="/patient/vaccination" className={`nav-link ${location.pathname === "/patient/vaccination" ? "active" : ""}`}>
            <FaSyringe style={{marginRight: "7px"}} /> Vaccination
          </Link>
          <Link to="/patient/bloodservice" className={`nav-link ${location.pathname === "/patient/bloodservice" ? "active" : ""}`}>
            <FaTint style={{marginRight: "7px"}} /> Blood Service
          </Link>
          <Link to="/patient/myappointments" className={`nav-link ${location.pathname === "/patient/myappointments" ? "active" : ""}`}>
            <FaCalendarCheck style={{marginRight: "7px"}} /> My Appointments
          </Link>
          <Link to="/patient/report" className={`nav-link ${location.pathname === "/patient/report" ? "active" : ""}`}>
            <FaCalendarCheck style={{marginRight: "7px"}} /> Report
          </Link>
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
          <Route path="/patient/profile" element={<PatientProfile/>}/>
          <Route path="/patient/report" element={<Report/>}/>
          
        </Routes>
      </div>
    </>
  );
}

export default PatientNavbar;
