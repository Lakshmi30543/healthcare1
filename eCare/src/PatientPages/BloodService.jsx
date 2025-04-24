import React from "react";
import "./styles/bloodservice.css"

import { useNavigate } from "react-router-dom";

const bloodGroups = [
  { id: 1, type: "A+", price: "$100" },
  { id: 2, type: "A-", price: "$120" },
  { id: 3, type: "B+", price: "$110" },
  { id: 4, type: "B-", price: "$130" },
  { id: 5, type: "AB+", price: "$150" },
  { id: 6, type: "AB-", price: "$170" },
  { id: 7, type: "O+", price: "$90" },
  { id: 8, type: "O-", price: "$140" },
];

export default function BloodService() {
  const navigate = useNavigate();

  const handleApply = (bloodType) => {
    navigate("/patient/applyblood", { state: { bloodType } });
  };

  return (
    <div className="blood-service-container">
      <h2>Blood Services</h2>
      <div className="blood-list">
        {bloodGroups.map((blood) => (
          <div key={blood.id} className="blood-card">
            <h3>{blood.type}</h3>
            <p className="blood-price">{blood.price}</p>
            <button className="apply-btn" onClick={() => handleApply(blood.type)}>
              Apply
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
