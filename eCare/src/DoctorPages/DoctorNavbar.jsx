import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Bell, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

import logo from '../assets/images/eCareLogo.webp';
import './styles/dnavbar.css';

import DoctorHome from './DoctorHome';
import Appointments from './DoctorNavbar/Appointments';
import Sidebar from './Sidebar';
import Patients from './DoctorNavbar/Patients';
import Profile from './DoctorNavbar/Profile';
import Schedule from './DoctorNavbar/Schedule';


export default function DoctorNavbar() {
  const { setIsDoctorLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("isDoctorLoggedIn");
    setIsDoctorLoggedIn(false);
    navigate("/login");
  };

  return (
    <div>
      <Sidebar />
      <nav className="navbar">
        <div className="navbar-container">
          <div className="logo-container">
            <img src={logo} alt="Healthcare Logo" className="logo-image" />
          </div>

          <div className="search-container">
            <input type="text" placeholder="Search" className="search-input" />
            <Search className="search-icon" size={20} />
          </div>

          <div className="icons-profile-container">
            <div className="notification-icon">
              <Bell size={24} />
              <span className="notification-badge">3</span>
            </div>
            <div className="profile-section">
              <img src="/src/assets/images/doctor.avif" alt="Profile Pic" className="profile-image" />
              <span className="profile-name">Dr. Kim</span>
            </div>
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </div>
        </div>
      </nav>

      <div className="doctor-content">
        <Routes>
          <Route path="/doctor/home" element={<DoctorHome />} />
          <Route path="/doctor/appointments" element={<Appointments />} />
          <Route path="/doctor/patients" element={<Patients />} />
          <Route path="/doctor/profile" element={<Profile />} />
          
          <Route path="/doctor/schedule" element={<Schedule />} />
        </Routes>
      </div>
    </div>
  );
}
