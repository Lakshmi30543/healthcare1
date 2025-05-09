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
  const [doctorImages, setDoctorImages] = useState({}); // <-- Add this line
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

          // Fetch images for each doctor
          const imagePromises = response.data.map(async (doctor) => {
            try {
              const imgRes = await axios.get(`${config.url}/eCare/doctor/profilepictureurl/${doctor.id}`);
              let imgUrl = imgRes.data;
              if (imgUrl && !imgUrl.startsWith('http')) {
                imgUrl = imgUrl; // e.g., "/profile_pics/filename.jpg"
              }
              return { id: doctor.id, url: imgUrl };
            } catch {
              return { id: doctor.id, url: null };
            }
          });

          const images = await Promise.all(imagePromises);
          const imagesMap = {};
          images.forEach(({ id, url }) => {
            imagesMap[id] = url;
          });
          setDoctorImages(imagesMap);
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
            <div className="doctor-card-content">
              <img
                src={doctorImages[doctor.id] || "/src/assets/images/doctor.png"}
                alt={doctor.fullName}
                className="doctor-profile-img"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/src/assets/images/doctor.png";
                }}
              />
              <div className="doctor-main-info">
                <div className="doctor-name">{doctor.fullName}</div>
                <div className="doctor-speciality">{doctor.specialization}</div>
                
              </div>
            </div>
            <div className="doctor-extra-info">
            <div className="doctor-info">Experience: {doctor.experienceYears} years</div>
              <div className="doctor-info">Qualification: {doctor.qualification}</div>
              <div className="doctor-info">Medical License: {doctor.medicalLicenseNumber}</div>
              <div className="doctor-info">Bio: {doctor.bio}</div>
              <div className="doctor-info">Consultation Fee: ₹{doctor.prize}</div> 
            </div>
            <button onClick={() => handleAppointmentClick(doctor)}>Book Appointment</button>
          </div>
        ))}
      </div>
    </div>
  );
}
