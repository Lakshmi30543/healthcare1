import React from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Adjust path if needed

import AdminHome from "./AdminHome";
import ManageDoctors from "./ManageDoctors";
import ManagePatients from "./ManagePatients";
import Appointments from "./Appointments";
import Settings from "./Settings";
import "./styles/AdminNavbar.css"
import AddDoctor from "./AddDoctor";

const AdminNavbar = () => {
  const { setIsAdminLoggedIn } = useAuth();
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    sessionStorage.removeItem("isAdminLoggedIn");
    setIsAdminLoggedIn(false);
    navigate("/login"); // Redirect to login
  };

  return (
    <div>
      {/* Admin Navbar */}
      <nav className="admin-navbar">
        <div className="logo">
          <h2>eCare Admin</h2>
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/admin/home">Home</Link>
          </li>
          <li>
            <Link to="/admin/doctors">Manage Doctors</Link>
          </li>
          <li>
            <Link to="/admin/patients">Manage Patients</Link>
          </li>
          <li>
            <Link to="/admin/appointments">Appointments</Link>
          </li>
          <li>
            <Link to="/admin/settings">Settings</Link>
          </li>
          <li>
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </li>
        </ul>
      </nav>

      {/* Routes Inside Admin Navbar */}
      <div className="admin-content">
        <Routes>
          <Route path="/admin/home" element={<AdminHome />} />
          <Route path="/admin/doctors" element={<ManageDoctors />} />
          <Route path="/admin/patients" element={<ManagePatients />} />
          <Route path="/admin/appointments" element={<Appointments />} />
          <Route path="/admin/addDoctor" element={<AddDoctor/>}/>
          <Route path="/admin/settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminNavbar;
