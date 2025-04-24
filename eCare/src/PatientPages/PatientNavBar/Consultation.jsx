import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../../config';
import { useNavigate } from 'react-router-dom'; // ✅ Import this
import '../styles/consultation.css';

export default function Consultation() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  const navigate = useNavigate(); // ✅ Initialize

  const specializations = [
    'Cardiology', 'Dermatology', 'Neurology', 'Pediatrics',
    'Oncology', 'Orthopedics', 'Gynecology', 'Psychiatry',
    'Ophthalmology', 'Radiology', 'Urology', 'Internal Medicine'
  ];

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(`${config.url}/eCare/patient/viewAllDoctors`);
        if (response.status === 200) {
          setDoctors(response.data);
        }
      } catch (error) {
        setError('Failed to fetch doctor data.');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleAppointmentClick = (doctor) => {
    navigate('/patient/appointment', { state: { doctor } }); // ✅ Pass doctor info
  };

  const filteredDoctors = selectedSpecialization
    ? doctors.filter((doctor) => doctor.specialization === selectedSpecialization)
    : doctors;

  if (loading) return <div>Loading doctors...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="doctor-list">
      <h2>Available Doctors</h2>

      <div className="specialization-dropdown">
        <label htmlFor="specialization">Filter by Specialization</label>
        <select
          id="specialization"
          value={selectedSpecialization}
          onChange={(e) => setSelectedSpecialization(e.target.value)}
        >
          <option value="">All Specializations</option>
          {specializations.map((specialization, index) => (
            <option key={index} value={specialization}>{specialization}</option>
          ))}
        </select>
      </div>

      <div className="doctor-container">
        {filteredDoctors.map((doctor) => (
          <div key={doctor.id} className="doctor-card">
            <div className="doctor-info">
              <h3>{doctor.fullName}</h3>
              <p><strong>Specialization:</strong> {doctor.specialization}</p>
              <p><strong>Experience:</strong> {doctor.experienceYears} years</p>
              <p><strong>Qualification:</strong> {doctor.qualification}</p>
              <p><strong>Medical License:</strong> {doctor.medicalLicenseNumber}</p>
              <p><strong>Bio:</strong> {doctor.bio}</p>
              <p><strong>Consultation Fee:</strong> ₹{doctor.prize}</p>
              <p><strong>Address:</strong> {doctor.address}</p>
              <button onClick={() => handleAppointmentClick(doctor)}>Book Appointment</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
