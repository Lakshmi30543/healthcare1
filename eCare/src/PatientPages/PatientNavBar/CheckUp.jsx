import React from 'react';
import "../styles/checkup.css"

const checkupPackages = [
  { id: 1, name: "Basic Health Checkup", tests: "Blood, BP, Sugar", price: "₹499" },
  { id: 2, name: "Advanced Full Body Checkup", tests: "Liver, Kidney, Thyroid", price: "₹1999" },
  { id: 3, name: "Heart Checkup", tests: "ECG, Cholesterol, BP", price: "₹1499" },
  { id: 4, name: "Diabetes Package", tests: "HbA1c, Fasting Sugar", price: "₹899" },
  { id: 5, name: "Women's Wellness", tests: "Thyroid, CBC, Vitamin D", price: "₹1299" },
  { id: 6, name: "Men's Wellness", tests: "Prostate, Vitamin B12", price: "₹1299" },
  { id: 7, name: "Kidney Check", tests: "Creatinine, Urea", price: "₹999" },
  { id: 8, name: "Liver Function Test", tests: "SGPT, SGOT, Bilirubin", price: "₹1099" },
  { id: 9, name: "Thyroid Package", tests: "TSH, T3, T4", price: "₹599" },
  { id: 10, name: "Vitamin Deficiency", tests: "Vitamin D, B12", price: "₹699" },
  { id: 11, name: "Pre-Marital Checkup", tests: "CBC, HIV, Blood Group", price: "₹1599" },
  { id: 12, name: "Senior Citizen Checkup", tests: "BP, Sugar, Lipid Profile", price: "₹999" },
  { id: 13, name: "Child Health Screening", tests: "Growth, Immunity", price: "₹799" },
  { id: 14, name: "Fitness Check", tests: "BMI, CBC, ECG", price: "₹899" },
  { id: 15, name: "Executive Health Check", tests: "Full Panel Tests", price: "₹2499" },
];

export default function CheckUp() {
  return (
    <section className="checkup-section">
      <h2>Health Checkup Packages</h2>
      <div className="checkup-container">
        {checkupPackages.map((pkg) => (
          <div className="checkup-card" key={pkg.id}>
            <div className="checkup-icon">🩺</div>
            <h3>{pkg.name}</h3>
            <p>{pkg.tests}</p>
            <span className="price">{pkg.price}</span>
            <button className="book-btn">Book Now</button>
          </div>
        ))}
      </div>
    </section>
  );
}
