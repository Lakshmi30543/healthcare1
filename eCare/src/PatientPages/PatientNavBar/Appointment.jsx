// src/pages/Appointment.jsx
import React, { useState } from "react";
import { FaHospital, FaVideo } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../../config"; // Adjust path if needed
import "../styles/appointment.css";

export default function Appointment() {
  const location = useLocation();
  const navigate = useNavigate();
  const doctor = location.state?.doctor; // Get doctor details from the passed state

  const [appointmentType, setAppointmentType] = useState("physical");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState(null);
  const patientId = sessionStorage.getItem("userId");
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute of ["00", "30"]) {
        const period = hour < 12 ? "AM" : "PM";
        const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
        slots.push(`${formattedHour}:${minute} ${period}`);
      }
    }
    return slots;
  };

  const handleConfirm = async () => {
    if (!selectedDate || !selectedTime || !doctor) {
      alert("Please select date and time.");
      return;
    }

    try {
      // Step 1: Create Razorpay order
      const paymentRes = await axios.post(`${config.url}/eCare/payment/createOrder`, {
        amount: doctor.prize,
      });

      const { id, amount, currency } = paymentRes.data;

      const options = {
        key: "rzp_test_RefqIEzM75megk", // 🔐 Replace with your Razorpay key
        amount: amount,
        currency: currency,
        name: "eCare",
        description: "Doctor Consultation Payment",
        order_id: id,
        handler: async function (response) {
          try {
            const patientId = sessionStorage.getItem("userId");

            if (!patientId) {
              alert("User not logged in or session expired.");
              return;
            }

            // Step 2: Book the appointment
            const bookingRes = await axios.post(`${config.url}/eCare/patient/bookappointment`, {
              doctorId: doctor.id,         // Directly from the doctor object
              patientId: patientId,        // From sessionStorage
              date: selectedDate,
              time: selectedTime,
              appointmentType: appointmentType,
              paymentId: response.razorpay_payment_id, // Payment ID from Razorpay
            });

            if (bookingRes.status === 200) {
              alert("Appointment booked successfully!");
              navigate("/patient/myappointments");
            } else {
              alert("Failed to book appointment. Please try again.");
            }
          } catch (bookingError) {
            console.error("Booking failed:", bookingError);
            alert("Appointment booking failed after successful payment!");
          }
        },
        prefill: {
          name: "Your Name",
          email: "user@example.com",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response) {
        alert("Payment Failed. Please try again.");
        console.error("Payment Failed:", response.error);
      });

      rzp.open();
    } catch (err) {
      console.error("Payment init failed:", err);
      alert("Something went wrong during payment. Please try again.");
    }
  };

  const timeSlots = generateTimeSlots();

  return (
    <div className="appointment-container">
      <h2>Book Your Doctor Appointment</h2>

      {doctor && (
        <div className="doctor-summary">
          <h3>Consulting: Dr. {doctor.fullName}</h3>
          <p><strong>Specialization:</strong> {doctor.specialization}</p>
          <p><strong>Fee:</strong> ₹{doctor.prize}</p>
        </div>
      )}
       

      <div className="appointment-type">
        <button
          className={appointmentType === "physical" ? "active" : ""}
          onClick={() => setAppointmentType("physical")}
        >
          <FaHospital size={20} /> Physical Visit
        </button>
        <button
          className={appointmentType === "virtual" ? "active" : ""}
          onClick={() => setAppointmentType("virtual")}
        >
          <FaVideo size={20} /> Virtual Consultation
        </button>
      </div>

      <div className="date-time-section">
        <label>Select Date</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />

        <div className="time-slots">
          {timeSlots.map((slot, index) => (
            <button
              key={index}
              className={selectedTime === slot ? "active" : ""}
              onClick={() => setSelectedTime(slot)}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>

      <div className="confirm-btn">
        <button
          disabled={!selectedDate || !selectedTime}
          onClick={handleConfirm}
        >
          Confirm & Pay
        </button>
      </div>
    </div>
  );
}
