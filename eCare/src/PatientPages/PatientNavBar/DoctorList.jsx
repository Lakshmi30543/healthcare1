import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/doctorlist.css"

import doctor1 from "../../assets/images/doctor-1.webp";
import doctor2 from "../../assets/images/doctor-2.webp";
import doctor3 from "../../assets/images/doctor-3.webp";
import doctor4 from "../../assets/images/doctor-4.webp";
import doctor5 from "../../assets/images/doctor-5.webp";
import doctor6 from "../../assets/images/doctor-6.webp";
import doctor7 from "../../assets/images/doctor-7.webp";
import doctor8 from "../../assets/images/doctor-8.webp";
import doctor9 from "../../assets/images/doctor-9.webp";
import doctor10 from "../../assets/images/doctor-10.webp";
import doctor11 from "../../assets/images/doctor-11.webp";
import doctor12 from "../../assets/images/doctor-12.webp";
import doctor13 from "../../assets/images/doctor-13.webp";
import doctor14 from "../../assets/images/doctor-14.webp";
import doctor15 from "../../assets/images/doctor-15.webp";
import doctor16 from "../../assets/images/doctor-16.webp";
import doctor17 from "../../assets/images/doctor-17.webp";
import doctor18 from "../../assets/images/doctor-18.webp";
import doctor19 from "../../assets/images/doctor-19.webp";
import doctor20 from "../../assets/images/doctor-20.webp";
import doctor21 from "../../assets/images/doctor-21.webp";




const doctorsData = {
  "Cancer Care": [
    { id: 1, name: "Dr. Alice Johnson", experience: "10 years", image: doctor1 },
    { id: 2, name: "Dr. Bob Smith", experience: "12 years", image:doctor2 },
    { id: 3, name: "Dr. Carol Davis", experience: "8 years", image: doctor3 },
    { id: 4, name: "Dr. Daniel Lee", experience: "15 years", image: doctor4 },
  ],
  "Cardiology": [
    { id: 5, name: "Dr. Emma Wilson", experience: "14 years", image: doctor5 },
    { id: 6, name: "Dr. Frank Brown", experience: "11 years", image: doctor6 },
    { id: 7, name: "Dr. Grace White", experience: "9 years", image: doctor7 },
    { id: 8, name: "Dr. Henry Scott", experience: "13 years", image: doctor8 },
  ],
  "Orthopedics": [
    { id: 9, name: "Dr. Irene Miller", experience: "16 years", image: doctor9 },
    { id: 10, name: "Dr. Jake Carter", experience: "10 years", image: doctor10 },
    { id: 11, name: "Dr. Kate Adams", experience: "7 years", image: doctor11 },
    { id: 12, name: "Dr. Liam Turner", experience: "12 years", image: doctor12 },
  ],
  "Neurology": [
    { id: 13, name: "Dr. Noah Hill", experience: "18 years", image: doctor13 },
    { id: 14, name: "Dr. Olivia Parker", experience: "10 years", image: doctor14 },
    { id: 15, name: "Dr. Paul Walker", experience: "9 years", image: doctor15 },
    { id: 16, name: "Dr. Quincy Harris", experience: "14 years", image: doctor16 },
  ],
  "Gastroenterology": [
    { id: 17, name: "Dr. Rachel Green", experience: "12 years", image: doctor17 },
    { id: 18, name: "Dr. Samuel Adams", experience: "15 years", image: doctor18 },
    { id: 19, name: "Dr. Tina Roberts", experience: "11 years", image: doctor19 },
    { id: 20, name: "Dr. Ulysses Clarke", experience: "9 years", image: doctor20 },
  ],
  "Pulmonology": [
    { id: 21, name: "Dr. Vanessa King", experience: "14 years", image: doctor21 },
    { id: 22, name: "Dr. William Clark", experience: "10 years", image: doctor1 },
    { id: 23, name: "Dr. Xander Lewis", experience: "7 years", image: doctor2 },
    { id: 24, name: "Dr. Yvonne Brown", experience: "16 years", image: doctor3 },
  ],
  "Ophthalmology": [
    { id: 25, name: "Dr. Zachary Green", experience: "13 years", image: doctor4 },
    { id: 26, name: "Dr. Ava Thomas", experience: "11 years", image: doctor5 },
    { id: 27, name: "Dr. Benjamin Adams", experience: "9 years", image: doctor6 },
    { id: 28, name: "Dr. Charlotte Moore", experience: "14 years", image: doctor7 },
  ],
  "Dentistry": [
    { id: 29, name: "Dr. Daniel Reed", experience: "12 years", image: doctor8 },
    { id: 30, name: "Dr. Emma White", experience: "10 years", image: doctor9 },
    { id: 31, name: "Dr. Finn Carter", experience: "7 years", image: doctor10 },
    { id: 32, name: "Dr. Grace Hall", experience: "15 years", image: doctor11 },
  ],
  "Pediatrics": [
    { id: 33, name: "Dr. Isabella Lewis", experience: "10 years", image: doctor12 },
    { id: 34, name: "Dr. James Robinson", experience: "8 years", image: doctor13 },
    { id: 35, name: "Dr. Kelly Adams", experience: "12 years", image: doctor14 },
    { id: 36, name: "Dr. Logan Carter", experience: "15 years", image: doctor15 },
  ],
  "Pathology": [
    { id: 37, name: "Dr. Mia Bennett", experience: "11 years", image: doctor16 },
    { id: 38, name: "Dr. Nathan Hall", experience: "14 years", image: doctor17 },
    { id: 39, name: "Dr. Olivia Scott", experience: "9 years", image: doctor18 },
    { id: 40, name: "Dr. Peter Wilson", experience: "13 years", image: doctor19 },
  ],
  "General Medicine": [
    { id: 41, name: "Dr. Quinn Harper", experience: "15 years", image: doctor20 },
    { id: 42, name: "Dr. Rebecca Clark", experience: "10 years", image: doctor21 },
    { id: 43, name: "Dr. Samuel Lewis", experience: "8 years", image: doctor1 },
    { id: 44, name: "Dr. Taylor Moore", experience: "12 years", image: doctor2 },
  ],
};

export default function DoctorList() {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedSpeciality = location.state?.speciality || "Cancer Care";

  return (
    <div className="doctor-list-container">
      <h2>Doctors in {selectedSpeciality}</h2>
      <div className="doctor-grid">
        {doctorsData[selectedSpeciality]?.map((doctor) => (
          <div key={doctor.id} className="doctor-card">
            <img src={doctor.image} alt={doctor.name} className="doctor-img" />
            <h3 className="doctor-name">{doctor.name}</h3>
            <p><strong>Experience:</strong> {doctor.experience}</p>
            <div className="doctor-actions">
              <button onClick={() => navigate("/appointment", { state: { doctor } })}>Book Appointment</button>
              <button onClick={() => navigate("/doctor-profile", { state: { doctor } })}>Profile</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}