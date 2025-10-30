import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../config";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Report = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  const patientId = sessionStorage.getItem("userId");

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await axios.get(`${config.url}/eCare/prescriptions/patient/${patientId}`);
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

  // 🧾 Download only the formatted prescription content (not button)
  const downloadSinglePDF = async (prescription) => {
    const pdf = new jsPDF("p", "mm", "a4");

    // Header Background
    pdf.setFillColor(41, 128, 185);
    pdf.rect(0, 0, 210, 40, 'F');

    // Title/Header
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(22);
    pdf.setFont("helvetica", "bold");
    pdf.text("E-Care Health Center", 105, 18, { align: "center" });

    pdf.setFontSize(14);
    pdf.setFont("helvetica", "normal");
    pdf.text("Medical Prescription Report", 105, 28, { align: "center" });

    // Reset text color
    pdf.setTextColor(0, 0, 0);

    // Date with background
    pdf.setFillColor(236, 240, 241);
    pdf.rect(15, 45, 180, 12, 'F');
    pdf.setFontSize(12);
    pdf.setFont("helvetica", "bold");
    pdf.text(`Issue Date: ${new Date(prescription.createdAt).toLocaleDateString()}`, 20, 53);
    
    // Patient Information Section
    pdf.setFillColor(52, 152, 219);
    pdf.rect(15, 65, 180, 8, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(14);
    pdf.setFont("helvetica", "bold");
    pdf.text("PATIENT INFORMATION", 20, 71);
    
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(11);
    pdf.setFont("helvetica", "normal");
    
    // Patient details in two columns
    pdf.text(`Full Name: ${prescription.patient?.fullName || "N/A"}`, 20, 83);
    pdf.text(`Username: ${prescription.patient?.username || "N/A"}`, 110, 83);
    pdf.text(`Date of Birth: ${prescription.patient?.dob || "N/A"}`, 20, 93);
    pdf.text(`Contact: ${prescription.patient?.contact || "N/A"}`, 110, 93);
    pdf.text(`Gender: ${prescription.patient?.gender || "N/A"}`, 20, 103);
    pdf.text(`Blood Group: ${prescription.patient?.bloodGroup || "N/A"}`, 110, 103);
    
    // Address (full width)
    const addressLines = pdf.splitTextToSize(`Address: ${prescription.patient?.address || "N/A"}`, 170);
    pdf.text(addressLines, 20, 113);
    
    // Medical Information Section
    pdf.setFillColor(46, 204, 113);
    pdf.rect(15, 125, 180, 8, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(14);
    pdf.setFont("helvetica", "bold");
    pdf.text("MEDICAL INFORMATION", 20, 131);
    
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(11);
    pdf.setFont("helvetica", "normal");
    pdf.text(`Attending Doctor: ${prescription.doctor?.fullName || "N/A"}`, 20, 143);
    pdf.text(`Medical Issue: ${prescription.medicalIssue || "N/A"}`, 20, 153);
    pdf.text(`Diagnosis: ${prescription.diagnosis || "N/A"}`, 20, 163);

    // Prescription Section
    pdf.setFillColor(231, 76, 60);
    pdf.rect(15, 175, 180, 8, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(14);
    pdf.setFont("helvetica", "bold");
    pdf.text("PRESCRIPTION", 20, 181);
    
    // Prescription content with border
    pdf.setDrawColor(189, 195, 199);
    pdf.setLineWidth(0.5);
    pdf.rect(15, 190, 180, 50);
    
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(11);
    pdf.setFont("helvetica", "normal");
    const textLines = pdf.splitTextToSize(prescription.prescriptionText || "No prescription provided.", 170);
    pdf.text(textLines, 20, 200);

    // Footer
    pdf.setDrawColor(52, 73, 94);
    pdf.setLineWidth(1);
    pdf.line(15, 260, 195, 260);
    
    pdf.setFontSize(10);
    pdf.setFont("helvetica", "italic");
    pdf.setTextColor(127, 140, 141);
    pdf.text("This is a system-generated prescription report from E-Care Health Center.", 105, 270, { align: "center" });
    pdf.text(`Generated on: ${new Date().toLocaleString()}`, 105, 280, { align: "center" });

    // Save file
    const fileName = `Prescription_${prescription.patient?.fullName}_${new Date(prescription.createdAt).toLocaleDateString().replace(/\//g, '-')}.pdf`;
    pdf.save(fileName);
  };

  if (loading) {
    return <div style={{ textAlign: "center", marginTop: "50px" }}>Loading...</div>;
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>My Prescription Reports</h2>

      {prescriptions.length === 0 ? (
        <p style={{ textAlign: "center", color: "gray" }}>No prescriptions found.</p>
      ) : (
        prescriptions.map((prescription, index) => (
          <div
            key={prescription.id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "20px",
              borderRadius: "8px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <p><strong>Date:</strong> {new Date(prescription.createdAt).toLocaleDateString()}</p>
            <p><strong>Doctor:</strong> {prescription.doctor?.fullName}</p>
            <p><strong>Medical Issue:</strong> {prescription.medicalIssue}</p>
            <p><strong>Diagnosis:</strong> {prescription.diagnosis}</p>
            <p><strong>Prescription:</strong> {prescription.prescriptionText}</p>

            {/* PDF Button */}
            <div style={{ textAlign: "right", marginTop: "10px" }}>
              <button
                onClick={() => downloadSinglePDF(prescription)}
                style={{
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Download PDF
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Report;
