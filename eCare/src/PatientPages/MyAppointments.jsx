import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../config"; // Make sure this contains your base URL

export default function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!userId) {
        console.error("User ID not found in session storage!");
        return;
      }

      try {
        const res = await axios.get(`${config.url}/eCare/patient/myappointments/${userId}`);
        setAppointments(res.data);
      } catch (err) {
        console.error("Error fetching appointments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [userId]);

  return (
    <div className="appointments-container">
      <h2>My Appointments</h2>

      {loading ? (
        <p>Loading...</p>
      ) : appointments.length > 0 ? (
        <div className="appointments-list">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="appointment-item">
              <h3>Dr. {appointment.doctor?.fullName}</h3>
              <p><strong>Date:</strong> {appointment.appointmentDate}</p>
              <p><strong>Time:</strong> {appointment.appointmentTime}</p>
              <p><strong>Status:</strong> {appointment.status}</p>
              <p><strong>Payment Status:</strong> {appointment.paymentStatus}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-appointments">
          <p>No appointments found.</p>
        </div>
      )}
    </div>
  );
}
