import { CheckCircle, Edit, XCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../../config';
import '../styles/dappointments.css';

const Appointments = () => {
  const [activeTab, setActiveTab] = useState('unaccepted');
  const [appointments, setAppointments] = useState([]);

  const formatStatus = (status) => {
    switch (status) {
      case 'PENDING': return 'Pending';
      case 'APPROVED': return 'Approved';
      case 'REJECTED': return 'Rejected';
      default: return status;
    }
  };

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    if (!userId) return;

    axios.get(`${config.url}/eCare/doctor/appointments/${userId}`)
      .then((response) => setAppointments(response.data))
      .catch((error) => console.error("Error fetching appointments:", error));
  }, []);

  const handleApprove = (id) => {
    axios.put(`${config.url}/eCare/doctor/appointments/approve/${id}`)
      .then(() => {
        setAppointments((prev) =>
          prev.map((appointment) =>
            appointment.id === id ? { ...appointment, status: 'APPROVED' } : appointment
          )
        );
      })
      .catch((error) => console.error("Error approving appointment:", error));
  };

  const handleReject = (id) => {
    axios.put(`${config.url}/eCare/doctor/appointments/reject/${id}`)
      .then(() => {
        setAppointments((prev) =>
          prev.filter((appointment) => appointment.id !== id)
        );
      })
      .catch((error) => console.error("Error rejecting appointment:", error));
  };

  const handleReschedule = (id) => {
    const newDate = prompt("Enter new date (YYYY-MM-DD):");
    const newTime = prompt("Enter new time (e.g., 4:30 PM):");
  
    if (!newDate || !newTime) {
      alert("Both date and time are required.");
      return;
    }
  
    axios.put(`${config.url}/eCare/doctor/appointments/reschedule/${id}`, {
      date: newDate,
      time: newTime
    })
    .then(response => {
      alert("Appointment rescheduled successfully!");
      setAppointments(prev =>
        prev.map(appointment =>
          appointment.id === id
            ? { ...appointment, appointmentDate: newDate, appointmentTime: newTime, status: 'RESCHEDULED' }
            : appointment
        )
      );
    })
    .catch(error => {
      console.error("Error rescheduling appointment:", error);
      alert("Failed to reschedule. Please try again.");
    });
  };
  

  const filteredAppointments = appointments.filter((appointment) =>
    activeTab === 'unaccepted'
      ? appointment.status === 'PENDING'
      : appointment.status === 'APPROVED'
  );

  return (
    <div className="water-appointments-container">
      <h2 className="water-appointments-header">Appointments</h2>

      <div className="water-appointments-tabs">
        <button
          className={`water-tab-button ${activeTab === 'unaccepted' ? 'active' : ''}`}
          onClick={() => setActiveTab('unaccepted')}
        >
          Unaccepted
        </button>
        <button
          className={`water-tab-button ${activeTab === 'accepted' ? 'active' : ''}`}
          onClick={() => setActiveTab('accepted')}
        >
          Accepted
        </button>
      </div>

      <div className="water-appointments-list">
        {filteredAppointments.length === 0 ? (
          <div className="water-no-appointments">
            No {activeTab} appointments found
          </div>
        ) : (
          filteredAppointments.map((appointment) => (
            <div key={appointment.id} className="water-appointment-card">
              <img
                src={appointment.image || 'https://via.placeholder.com/100'}
                alt={appointment.patientName}
                className="water-patient-image"
              />
              <div className="water-appointment-details">
                <h3>{appointment.patientName}</h3>
                <div className="water-appointment-meta">
                  <span className="water-meta-item">📅 {appointment.appointmentDate}</span>
                  <span className="water-meta-item">⏰ {appointment.appointmentTime}</span>
                  <span className={`water-meta-item water-status-${appointment.status.toLowerCase()}`}>
                    🔵 {formatStatus(appointment.status)}
                  </span>
                </div>
              </div>

              <div className="water-appointment-actions">
                {activeTab === 'unaccepted' && (
                  <>
                    <button className="water-approve-button" onClick={() => handleApprove(appointment.id)}>
                      <CheckCircle size={14} /> Accept
                    </button>
                    <button className="water-cancel-button" onClick={() => handleReject(appointment.id)}>
                      <XCircle size={14} /> Reject
                    </button>
                  </>
                )}
                <button className="water-reschedule-button" onClick={() => handleReschedule(appointment.id)}>
                  <Edit size={14} /> Reschedule
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Appointments;
