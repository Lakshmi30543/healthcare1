package com.sdp.health.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sdp.health.model.Prescription;

@Repository
public interface PrescriptionRepository extends JpaRepository<Prescription, Long> {
    
    /**
     * Find all prescriptions for a specific patient
     * 
     * @param patientId the patient's ID
     * @return list of prescriptions
     */
    List<Prescription> findByPatientId(Long patientId);
    
    /**
     * Find all prescriptions for a specific appointment
     * 
     * @param appointmentId the appointment's ID
     * @return list of prescriptions
     */
    List<Prescription> findByAppointmentId(Long appointmentId);
}