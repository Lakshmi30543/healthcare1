package com.sdp.health.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sdp.health.dto.PrescriptionDTO;
import com.sdp.health.model.Appointment;
import com.sdp.health.model.Doctor;
import com.sdp.health.model.Patient;
import com.sdp.health.model.Prescription;
import com.sdp.health.repository.AppointmentRepository;
import com.sdp.health.repository.DoctorRepository;
import com.sdp.health.repository.PatientRepository;
import com.sdp.health.repository.PrescriptionRepository;

@Service
public class PrescriptionServiceImpl implements PrescriptionService {

    private final PrescriptionRepository prescriptionRepository;
    private final AppointmentRepository appointmentRepository;
    private final DoctorRepository doctorRepository;
    private final PatientRepository patientRepository;

    @Autowired
    public PrescriptionServiceImpl(
            PrescriptionRepository prescriptionRepository,
            AppointmentRepository appointmentRepository,
            DoctorRepository doctorRepository,
            PatientRepository patientRepository) {
        this.prescriptionRepository = prescriptionRepository;
        this.appointmentRepository = appointmentRepository;
        this.doctorRepository = doctorRepository;
        this.patientRepository = patientRepository;
    }

    @Override
    @Transactional
    public Prescription createPrescription(PrescriptionDTO prescriptionDTO) {
        System.out.println("Creating prescription from DTO: " + prescriptionDTO);

        // Validation
        if (prescriptionDTO.getAppointmentId() == null)
            throw new IllegalStateException("Appointment ID cannot be null");

        if (prescriptionDTO.getDoctorId() == null)
            throw new IllegalStateException("Doctor ID cannot be null");

        if (prescriptionDTO.getPatientId() == null)
            throw new IllegalStateException("Patient ID cannot be null");

        if (prescriptionDTO.getPrescriptionText() == null || prescriptionDTO.getPrescriptionText().trim().isEmpty())
            throw new IllegalStateException("Prescription text cannot be empty");

        if (prescriptionDTO.getMedicalIssue() == null || prescriptionDTO.getMedicalIssue().trim().isEmpty())
            throw new IllegalStateException("Medical issue cannot be empty");

        if (prescriptionDTO.getDiagnosis() == null || prescriptionDTO.getDiagnosis().trim().isEmpty())
            throw new IllegalStateException("Diagnosis cannot be empty");

        // Fetch related entities
        Appointment appointment = appointmentRepository.findById(prescriptionDTO.getAppointmentId())
                .orElseThrow(() -> new IllegalStateException("Appointment not found with ID: " + prescriptionDTO.getAppointmentId()));

        Doctor doctor = doctorRepository.findById(prescriptionDTO.getDoctorId())
                .orElseThrow(() -> new IllegalStateException("Doctor not found with ID: " + prescriptionDTO.getDoctorId()));

        Patient patient = patientRepository.findById(prescriptionDTO.getPatientId())
                .orElseThrow(() -> new IllegalStateException("Patient not found with ID: " + prescriptionDTO.getPatientId()));

        // Create and populate Prescription entity
        Prescription prescription = new Prescription();
        prescription.setAppointment(appointment);
        prescription.setDoctor(doctor);
        prescription.setPatient(patient);
        prescription.setPrescriptionText(prescriptionDTO.getPrescriptionText());
        prescription.setMedicalIssue(prescriptionDTO.getMedicalIssue());
        prescription.setDiagnosis(prescriptionDTO.getDiagnosis());

        try {
            return prescriptionRepository.save(prescription);
        } catch (Exception e) {
            System.err.println("Error saving prescription: " + e.getMessage());
            e.printStackTrace();
            throw new IllegalStateException("Failed to save prescription: " + e.getMessage(), e);
        }
    }

    @Override
    public List<Prescription> getPrescriptionsByPatient(Long patientId) {
        return prescriptionRepository.findByPatientId(patientId);
    }

    @Override
    public List<Prescription> getPrescriptionsByAppointment(Long appointmentId) {
        return prescriptionRepository.findByAppointmentId(appointmentId);
    }
}
