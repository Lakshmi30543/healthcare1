import React, { useState, useEffect } from 'react';
import './styles/adminhome.css';
import { FaUserMd, FaHeart, FaUsers, FaClipboardList, FaStethoscope } from 'react-icons/fa';
import axios from 'axios';
import config from '../config';

const AdminHome = () => {
  const [approvedDoctors, setApprovedDoctors] = useState(0);
  const [totalPatients, setTotalPatients] = useState(0);
  const [pendingDoctorApprovals, setPendingDoctorApprovals] = useState(0);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const approvedDoctorsResponse = await axios.get(`${config.url}/eCare/admin/approvedDoctorsCount`);
      setApprovedDoctors(approvedDoctorsResponse.data);

      const totalPatientsResponse = await axios.get(`${config.url}/eCare/admin/totalPatients`);
      setTotalPatients(totalPatientsResponse.data);

      const pendingDoctorApprovalsResponse = await axios.get(`${config.url}/eCare/admin/pendingDoctorApprovalsCount`);
      setPendingDoctorApprovals(pendingDoctorApprovalsResponse.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  return (
    <div className="admin-home">
      <div className="admin-header">
        <h1>Admin Dashboard 🩺</h1>
        <p>Your healthcare system at a glance 🌟</p>
      </div>

      <div className="stats-container">
        <div className="stat-card">
          <FaUserMd className="stat-icon" />
          <h3>Approved Doctors 👩‍⚕️👨‍⚕️</h3>
          <p>{approvedDoctors}</p>
        </div>

        <div className="stat-card">
          <FaUsers className="stat-icon" />
          <h3>Total Patients 👩‍🦰🧑‍🦳</h3>
          <p>{totalPatients}</p>
        </div>

        <div className="stat-card">
          <FaClipboardList className="stat-icon" />
          <h3>Pending Doctor Approvals ⏳</h3>
          <p>{pendingDoctorApprovals}</p>
        </div>
      </div>

      <div className="system-health">
        <h3>System Health 🏥</h3>
        <div className="health-status">
          <FaStethoscope className="status-icon" />
          <p>All systems operational</p>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
