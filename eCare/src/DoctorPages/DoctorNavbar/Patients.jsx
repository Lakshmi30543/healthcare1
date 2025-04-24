import React, { useState } from 'react';
import { FaCalendarAlt, FaEnvelope, FaMapMarkerAlt, FaNotesMedical, FaPhone, FaPills, FaSearch, FaUserMd } from 'react-icons/fa';
import '../styles/dpatients.css';

export default function Patients() {
  const [search, setSearch] = useState('');
  const [hoveredPatient, setHoveredPatient] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const patients = [
    {
      id: 1,
      name: 'Alice Johnson',
      age: 30,
      contact: 'alice.johnson@example.com',
      phone: '+1 234 567 8901',
      location: 'New York, USA',
      image: 'https://randomuser.me/api/portraits/women/1.jpg',
      medicalConditions: ['Hypertension', 'Type 2 Diabetes'],
      currentMedications: ['Metformin 500mg', 'Lisinopril 10mg'],
      upcomingAppointment: '2024-02-15',
      lastVisit: '2024-01-10',
      treatmentPlan: 'Regular blood pressure monitoring, dietary management'
    },
    {
      id: 2,
      name: 'Bob Brown',
      age: 45,
      contact: 'bob.brown@example.com',
      phone: '+1 234 567 8902',
      location: 'Los Angeles, USA',
      image: 'https://randomuser.me/api/portraits/men/2.jpg',
      medicalConditions: ['Asthma', 'Allergic Rhinitis'],
      currentMedications: ['Albuterol inhaler', 'Cetirizine 10mg'],
      upcomingAppointment: '2024-02-20',
      lastVisit: '2024-01-15',
      treatmentPlan: 'Asthma management plan, regular peak flow monitoring'
    },
    {
      id: 3,
      name: 'Charlie Davis',
      age: 28,
      contact: 'charlie.davis@example.com',
      phone: '+1 234 567 8903',
      location: 'Chicago, USA',
      image: 'https://randomuser.me/api/portraits/men/3.jpg',
      medicalConditions: ['Anxiety Disorder', 'Insomnia'],
      currentMedications: ['Sertraline 50mg', 'Melatonin 5mg'],
      upcomingAppointment: '2024-02-18',
      lastVisit: '2024-01-12',
      treatmentPlan: 'Cognitive behavioral therapy, sleep hygiene improvement'
    },
    {
      id: 4,
      name: 'Diana Evans',
      age: 35,
      contact: 'diana.evans@example.com',
      phone: '+1 234 567 8904',
      location: 'Houston, USA',
      image: 'https://randomuser.me/api/portraits/women/4.jpg',
      medicalConditions: ['Migraine', 'Lower Back Pain'],
      currentMedications: ['Sumatriptan 50mg', 'Ibuprofen 400mg'],
      upcomingAppointment: '2024-02-25',
      lastVisit: '2024-01-20',
      treatmentPlan: 'Physical therapy, migraine trigger management'
    },
  ];

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(search.toLowerCase())
  );

  const handlePatientClick = (patient) => {
    setSelectedPatient(patient);
  };

  return (
    <div className="air-patients-container">
      <div className="air-patients-header-container">
        <h2 className="air-patients-header">Patients List</h2>
      </div>
      <div className="air-search-bar">
        <FaSearch className="air-search-icon" />
        <input 
          type="text" 
          placeholder="Search patients..." 
          value={search} 
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="air-content-wrapper">
        <div className="air-patients-list">
          {filteredPatients.map((patient) => (
            <div 
              key={patient.id} 
              className={`air-patient-card ${selectedPatient?.id === patient.id ? 'air-selected' : ''}`}
              onMouseEnter={() => setHoveredPatient(patient)}
              onMouseLeave={() => setHoveredPatient(null)}
              onClick={() => handlePatientClick(patient)}
            >
              <img src={patient.image} alt={patient.name} className="air-patient-image" />
              <div className="air-patient-info">
                <h3>{patient.name}</h3>
                <div className="air-patient-brief-info">
                  <p><FaUserMd /> {patient.age}y</p>
                  <p><FaPhone /> {patient.phone.substring(0, 10)}...</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Fixed Patient Details Card */}
        <div className="air-fixed-details-card">
          {selectedPatient || hoveredPatient ? (
            <>
              <div className="air-patient-details-header">
                <img src={(selectedPatient || hoveredPatient).image} alt={(selectedPatient || hoveredPatient).name} />
                <div>
                  <h3>{(selectedPatient || hoveredPatient).name}</h3>
                  <p className="air-patient-id">ID: #{(selectedPatient || hoveredPatient).id}</p>
                </div>
              </div>
              <div className="air-patient-details-info">
                <div className="air-info-row">
                  <div className="air-patient-details-item"><FaUserMd /><span>{(selectedPatient || hoveredPatient).age}y</span></div>
                  <div className="air-patient-details-item"><FaPhone /><span>{(selectedPatient || hoveredPatient).phone}</span></div>
                </div>
                <div className="air-info-row">
                  <div className="air-patient-details-item"><FaEnvelope /><span>{(selectedPatient || hoveredPatient).contact}</span></div>
                  <div className="air-patient-details-item"><FaMapMarkerAlt /><span>{(selectedPatient || hoveredPatient).location}</span></div>
                </div>
                
                <h4 className="air-details-section-title">Medical Info</h4>
                <div className="air-info-row">
                  <div className="air-patient-details-item"><FaNotesMedical /><span>{(selectedPatient || hoveredPatient).medicalConditions.join(', ')}</span></div>
                </div>
                <div className="air-info-row">
                  <div className="air-patient-details-item"><FaPills /><span>{(selectedPatient || hoveredPatient).currentMedications.join(', ')}</span></div>
                </div>
                
                <div className="air-info-row">
                  <div className="air-patient-details-item"><FaCalendarAlt /><span>Last: {(selectedPatient || hoveredPatient).lastVisit}</span></div>
                  <div className="air-patient-details-item"><FaCalendarAlt /><span>Next: {(selectedPatient || hoveredPatient).upcomingAppointment}</span></div>
                </div>
                
                <h4 className="air-details-section-title">Treatment</h4>
                <div className="air-patient-details-item air-treatment-plan"><FaNotesMedical /><span>{(selectedPatient || hoveredPatient).treatmentPlan}</span></div>
                
                <div className="air-patient-actions">
                  <button className="air-action-button air-view-history">History</button>
                  <button className="air-action-button air-schedule">Schedule</button>
                </div>
              </div>
            </>
          ) : (
            <div className="air-no-patient-selected">
              <FaUserMd size={30} color="#e2e8f0" />
              <p>Select a patient</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
