import React, { useState } from 'react';

import cardiologyImage from '../../assets/images/program-01.png';
import pulmonaryImage from '../../assets/images/program-02.png';
import nephrologyImage from '../../assets/images/program-03.png';
import ophthalmologyImage from '../../assets/images/program-04.png';
import neurologyImage from '../../assets/images/program-05.png';
import orthopedicsImage from '../../assets/images/program-06.png';
import gastroenterologyImage from '../../assets/images/program-07.png';
import endocrinologyImage from '../../assets/images/program-08.png';

import "../styles/program.css"

export default function Program() {
  const programCategories = [
    {
      id: 'cardiology',
      title: 'Cardiology',
      description: 'Comprehensive heart care including preventive screenings, diagnostics, and treatment options.',
      image: cardiologyImage,
      services: [
        'Cardiac Rehabilitation', 'Heart Disease Prevention', 'Pacemaker Management', 'Echocardiography', 'Coronary Care'
      ]
    },
    {
      id: 'pulmonary',
      title: 'Pulmonary',
      description: 'Specialized care for respiratory conditions and lung health management.',
      image: pulmonaryImage,
      services: [
        'Asthma Management', 'COPD Treatment', 'Pulmonary Function Testing', 'Sleep Apnea Care', 'Respiratory Therapy'
      ]
    },
    {
      id: 'nephrology',
      title: 'Nephrology',
      description: 'Expert kidney care including disease management, dialysis, and transplant support.',
      image: nephrologyImage,
      services: [
        'Chronic Kidney Disease Management', 'Dialysis Services', 'Kidney Transplant Support', 'Hypertension Management', 'Electrolyte Disorders'
      ]
    },
    {
      id: 'ophthalmology',
      title: 'Ophthalmology',
      description: 'Complete eye care from routine examinations to advanced surgical procedures.',
      image: ophthalmologyImage,
      services: [
        'Comprehensive Eye Exams', 'Cataract Surgery', 'Glaucoma Treatment', 'Diabetic Eye Care', 'LASIK Surgery'
      ]
    },
    {
      id: 'neurology',
      title: 'Neurology',
      description: 'Specialized care for neurological disorders affecting the brain, spine, and nervous system.',
      image: neurologyImage,
      services: [
        'Stroke Care', 'Seizure Management', 'Headache Clinic', 'Multiple Sclerosis Treatment', 'Neurosurgical Procedures'
      ]
    },
    {
      id: 'orthopedics',
      title: 'Orthopedics',
      description: 'Complete musculoskeletal care for bones, joints, muscles, and related tissues.',
      image: orthopedicsImage,
      services: [
        'Joint Replacement', 'Sports Medicine', 'Fracture Care', 'Spine Surgery', 'Physical Therapy'
      ]
    },
    {
      id: 'gastroenterology',
      title: 'Gastroenterology',
      description: 'Digestive health care addressing conditions of the esophagus, stomach, intestines, and more.',
      image: gastroenterologyImage,
      services: [
        'Colonoscopy', 'GERD Treatment', 'IBS Management', 'Liver Disease Care', 'Nutritional Counseling'
      ]
    },
    {
      id: 'endocrinology',
      title: 'Endocrinology',
      description: 'Specialized care for hormone-related conditions including diabetes and thyroid disorders.',
      image: endocrinologyImage,
      services: [
        'Diabetes Management', 'Thyroid Disorder Treatment', 'Hormone Replacement Therapy', 'Adrenal Disorders', 'Metabolic Syndrome Care'
      ]
    }
  ];

  const [visiblePrograms, setVisiblePrograms] = useState(5);
  const [selectedProgram, setSelectedProgram] = useState(null);

  const loadMorePrograms = () => {
    setVisiblePrograms((prevCount) =>
      prevCount + 5 <= programCategories.length ? prevCount + 5 : programCategories.length
    );
  };

  const viewProgramDetails = (program) => {
    setSelectedProgram(program);
  };

  const closeDetails = () => {
    setSelectedProgram(null);
  };

  const renderProgramRows = () => {
    const rows = [];
    const programsToShow = programCategories.slice(0, visiblePrograms);

    for (let i = 0; i < programsToShow.length; i += 5) {
      const rowPrograms = programsToShow.slice(i, i + 5);
      const isLastRow = i + 5 >= visiblePrograms;
      const hasMore = visiblePrograms < programCategories.length;
      
      rows.push(
        <div className="health-programs-row" key={i}>
          {rowPrograms.map((program) => (
            <div className="health-program-item" key={program.id} onClick={() => viewProgramDetails(program)}>
              <div className="health-program-image">
                <img src={program.image} alt={program.title} />
              </div>
              <div className="health-program-content">
                <h3 className="health-program-heading">{program.title}</h3>
                <p className="health-program-description">{program.description}</p>
                <button className="health-program-btn">View Details</button>
              </div>
            </div>
          ))}
        </div>
      );
    }
    
    // Add the view more button outside of the row if there are more programs
    if (visiblePrograms < programCategories.length) {
      rows.push(
        <div className="health-view-more-container" key="view-more">
          <button className="health-view-more-btn" onClick={loadMorePrograms}>
            View More Programs
          </button>
        </div>
      );
    }

    return rows;
  };

  return (
    <section className="health-programs-section">
      <div className="health-container">
        <div className="health-section-header">
          <h2>Our Healthcare Programs</h2>
          <p>Comprehensive care for every part of your body</p>
        </div>

        {selectedProgram ? (
          <div className="health-program-details">
            <button className="health-back-button" onClick={closeDetails}>← Back to All Programs</button>
            <div className="health-program-detail-content">
              <div className="health-program-detail-header">
                <h3>{selectedProgram.title}</h3>
              </div>
              <div className="health-program-detail-body">
                <div className="health-program-image-large">
                  <img src={selectedProgram.image} alt={selectedProgram.title} />
                </div>
                <div className="health-program-info">
                  <p className="health-program-full-description">{selectedProgram.description}</p>
                  <div className="health-program-services">
                    <h4>Services Offered:</h4>
                    <ul>
                      {selectedProgram.services.map((service, index) => (
                        <li key={index}>{service}</li>
                      ))}
                    </ul>
                  </div>
                  <button className="health-appointment-button">Schedule an Appointment</button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {renderProgramRows()}
          </>
        )}
      </div>
    </section>
  );
}