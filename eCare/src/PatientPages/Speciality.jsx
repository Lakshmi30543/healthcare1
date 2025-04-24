import React from "react";
import { FaUserMd, FaNotesMedical, FaHeartbeat, FaProcedures, FaBrain, FaUtensils, FaLungs, FaEye, FaTooth, FaBaby, FaFlask, FaClinicMedical } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./styles/speciality.css"

const categories = [
  { id: 1, icon: <FaNotesMedical size={40} color="white" />, name: "Cancer Care" },
  { id: 2, icon: <FaHeartbeat size={40} color="white" />, name: "Cardiology" },
  { id: 3, icon: <FaProcedures size={40} color="white" />, name: "Orthopedics" },
  { id: 4, icon: <FaBrain size={40} color="white" />, name: "Neurology" },
  { id: 5, icon: <FaUtensils size={40} color="white" />, name: "Gastroenterology" },
  { id: 6, icon: <FaLungs size={40} color="white" />, name: "Pulmonology" },
  { id: 7, icon: <FaEye size={40} color="white" />, name: "Ophthalmology" },
  { id: 8, icon: <FaTooth size={40} color="white" />, name: "Dentistry" },
  { id: 9, icon: <FaBaby size={40} color="white" />, name: "Pediatrics" },
  { id: 10, icon: <FaFlask size={40} color="white" />, name: "Pathology" },
  { id: 11, icon: <FaClinicMedical size={40} color="white" />, name: "General Medicine" },
];

export default function Speciality() {
  const navigate = useNavigate();

  const handleSpecialityClick = (speciality) => {
    navigate("/doctor-list", { state: { speciality } });
  };

  return (
    <section className="doctor-section">
      <div className="doctor-header">
        <div className="icon-circle">
          <FaUserMd size={25} color="white" />
        </div>
        <h2>Specialities</h2>
        <a href="#" className="view-all">More</a>
      </div>

      <div className="doctor-container">
        {categories.map((category) => (
          <div key={category.id} className="speciality-card" onClick={() => handleSpecialityClick(category.name)}>
            <div className="speciality-icon">{category.icon}</div>
            <p>{category.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
