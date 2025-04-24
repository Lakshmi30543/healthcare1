import React from "react";
import { useNavigate } from "react-router-dom";
import { FaStethoscope, FaUserMd, FaSyringe, FaTint } from "react-icons/fa";
import "./styles/ourservices.css"

export default function Services() {
  const navigate = useNavigate();

  const services = [
    {
      id: 1,
      icon: <FaStethoscope size={30} color="white" />,
      title: "Health Checkup",
      subtitle: "Find a suitable package",
      description: "Choose the best health check-up packages that match your needs.",
      linkText: "View CheckUps",
      route: "/patient/checkup", // ✅ updated
      stateLabel: "Health Checkup",
    },
    {
      id: 2,
      icon: <FaUserMd size={30} color="white" />,
      title: "Doctor Consultation",
      subtitle: "Easily book an appointment",
      description: "Consult with top doctors across specialties for any health issue.",
      linkText: "View Doctors",
      route: "/patient/consultation", // ✅ updated
      stateLabel: "Doctor Consultation",
    },
    {
      id: 3,
      icon: <FaSyringe size={30} color="white" />,
      title: "Vaccination Package",
      subtitle: "Find a suitable package",
      description: "Choose the best vaccination packages that match your needs.",
      linkText: "View Packages",
      route: "/patient/vaccination", // ✅ updated
      stateLabel: "Vaccination",
    },
    {
      id: 4,
      icon: <FaTint size={30} color="white" />,
      title: "Blood Service",
      subtitle: "Find blood donors & services",
      description: "Get access to blood donation services and find donors easily.",
      linkText: "Find Blood",
      route: "/patient/bloodservice", // ✅ if you have this page defined
      stateLabel: "Blood Service",
    },
  ];
  
  const handleNavigation = (route, stateLabel) => {
    navigate(route, { state: { service: stateLabel } });
  };

  return (
    <section className="services">
      <div className="services-header">
        <div className="icon-circle">
          <FaStethoscope size={25} color="white" />
        </div>
        <h2>Our Services</h2>
      </div>

      <div className="services-container">
        {services.map((service) => (
          <div key={service.id} className="service-card">
            <div className="service-icon">{service.icon}</div>
            <h3>{service.title}</h3>
            <p className="subtitle">{service.subtitle}</p>
            <p>{service.description}</p>
            <button
              className="service-link"
              onClick={() => handleNavigation(service.route, service.stateLabel)}
            >
              {service.linkText}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
