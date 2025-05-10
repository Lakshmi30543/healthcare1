import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../config"; // Adjust path as needed

const Report = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  const patientId = sessionStorage.getItem("userId");

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await axios.get(`${config.url}/ecare/prescriptions/patient/${patientId}`);
        setPrescriptions(response.data);
      } catch (error) {
        console.error("Error fetching prescriptions:", error);
      } finally {
        setLoading(false);
      }
    };

    if (patientId) {
      fetchPrescriptions();
    }
  }, [patientId]);

  if (loading) {
    return <div style={{ textAlign: "center", marginTop: "50px" }}>Loading...</div>;
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>My Prescription Reports</h2>
      {prescriptions.length === 0 ? (
        <p style={{ textAlign: "center", color: "gray" }}>No prescriptions found.</p>
      ) : (
        prescriptions.map((prescription) => (
          <div key={prescription.id} style={{
            border: "1px solid #ccc",
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9"
          }}>
            <p><strong>Date:</strong> {new Date(prescription.createdAt).toLocaleDateString()}</p>
            <p><strong>Doctor:</strong> {prescription.doctorName}</p>
            <p><strong>Prescription:</strong> {prescription.prescriptionText}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Report;
