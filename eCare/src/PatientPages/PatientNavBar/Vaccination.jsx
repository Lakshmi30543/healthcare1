import React from "react";
import typhoid from "../../assets/images/typhoid.jpeg";
import rabies from "../../assets/images/rabies.jpeg";
import dpt from "../../assets/images/dpt.jpeg";
import rotavirus from "../../assets/images/rotavirus.jpeg";
import encephalitis from "../../assets/images/encephalitis.jpeg";
import varicella from "../../assets/images/varicella.jpeg";
import yellowFever from "../../assets/images/yellowFever.jpeg";
import cholera from "../../assets/images/cholera.jpeg";
import dengue from "../../assets/images/dengue.jpeg";
import "../styles/vacination.css"

const vaccinationData = [
  { title: "Typhoid Shield Vaccine", image: typhoid, price: "₹2,000" },
  { title: "Rabies Pre-Exposure Prophylaxis", image: rabies, price: "₹3,500" },
  { title: "DTP (Diphtheria, Tetanus, Pertussis)", image: dpt, price: "₹1,800" },
  { title: "Rotavirus Immunization", image: rotavirus, price: "₹2,400" },
  { title: "Japanese Encephalitis Vaccine", image: encephalitis, price: "₹3,800" },
  { title: "Varicella(Chickenpox)Vaccine", image: varicella, price: "₹2,500" },
  { title: "Yellow Fever Vaccine", image: yellowFever, price: "₹3,200" },
  { title: "Cholera Protection Shot", image: cholera, price: "₹2,100" },
  { title: "Dengue Vaccine", image: dengue, price: "₹4,000" },
];

export default function Vaccination() {
  return (
    <div className="vaccination-container">
      <h2 className="vaccination-title">Vaccination Packages</h2>
      <div className="vaccination-grid">
        {vaccinationData.map((vaccine, index) => (
          <div key={index} className="vaccine-card">
            <img src={vaccine.image} alt={vaccine.title} className="vaccine-image" />
            <h3 className="vaccine-title">{vaccine.title}</h3>
            <p className="vaccine-price">{vaccine.price}</p>
            <button className="add-to-cart-btn">Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}
