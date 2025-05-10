package com.sdp.health.service;

import java.util.List;

import com.sdp.health.dto.PrescriptionDTO;
import com.sdp.health.model.Prescription;

public interface PrescriptionService {
    
    /**
     * Creates a new prescription based on the provided DTO
     * 
     * @param prescriptionDTO The prescription data
     * @return The created prescription
     */
    Prescription createPrescription(PrescriptionDTO prescriptionDTO);
    
    /**
     * Gets all prescriptions for a specific patient
     * 
     * @param patientId The ID of the patient
     * @return List of prescriptions
     */
    List<Prescription> getPrescriptionsByPatient(Long patientId);
    
    /**
     * Gets all prescriptions for a specific appointment
     * 
     * @param appointmentId The ID of the appointment
     * @return List of prescriptions
     */
    List<Prescription> getPrescriptionsByAppointment(Long appointmentId);
}