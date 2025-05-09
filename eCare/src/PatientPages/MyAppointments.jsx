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
        <div className="appointments-table-wrapper">
          <table className="appointments-table">
            <thead>
              <tr>
                <th>Doctor</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Payment Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td>Dr. {appointment.doctor?.fullName}</td>
                  <td>{appointment.appointmentDate}</td>
                  <td>{appointment.appointmentTime}</td>
                  <td>{appointment.status}</td>
                  <td>{appointment.paymentStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="no-appointments">
          <p>No appointments found.</p>
        </div>
      )}
    </div>
  );
}
