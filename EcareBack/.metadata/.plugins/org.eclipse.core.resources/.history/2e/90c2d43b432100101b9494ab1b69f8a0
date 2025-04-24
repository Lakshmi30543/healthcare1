package com.sdp.health.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sdp.health.dto.AppointmentBookingDTO;
import com.sdp.health.model.Appointment;
import com.sdp.health.model.Doctor;
import com.sdp.health.model.Patient;
import com.sdp.health.repository.AppointmentRepository;
import com.sdp.health.repository.DoctorRepository;
import com.sdp.health.repository.PatientRepository;



@Service
public class PatientServiceImpl implements PatientService {

    @Autowired
    private PatientRepository patientRepository;
    
    @Autowired
    private AppointmentRepository appointmentRepository;
    
    @Autowired
    private DoctorRepository doctorRepository;

    // Get all patients from the database
    @Override
    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    // Delete a patient by ID
    @Override
    public void deletePatient(Long id) {
        patientRepository.deleteById(id);
    }
    
//    @Autowired
//    private AppointmentRepository appointmentRepository;

    @Override
    public long countTotalPatients() {
        return patientRepository.count();
    }

//    @Override
//    public long countAppointmentsThisWeek() {
//        LocalDate today = LocalDate.now();
//        LocalDate startOfWeek = today.minusDays(today.getDayOfWeek().getValue() - 1); // Monday
//        LocalDate endOfWeek = startOfWeek.plusDays(6); // Sunday
//
//        return appointmentRepository.countByAppointmentDateBetween(startOfWeek, endOfWeek);
//    }
//    long countByAppointmentDateBetween(LocalDate start, LocalDate end);
    

    @Override
    public Appointment bookAppointment(AppointmentBookingDTO dto) {
        // Fetch Patient by ID
        Patient patient = patientRepository.findById(dto.getPatientId())
                .orElseThrow(() -> new RuntimeException("Patient not found with ID: " + dto.getPatientId()));

        // Fetch Doctor by ID
        Doctor doctor = doctorRepository.findById(dto.getDoctorId())
                .orElseThrow(() -> new RuntimeException("Doctor not found with ID: " + dto.getDoctorId()));

        // Parse the time using DateTimeFormatter (12-hour format with AM/PM)
        String timeString = dto.getTime().trim();
        LocalTime appointmentTime;
        try {
            DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("h:mm a", Locale.US);
            appointmentTime = LocalTime.parse(timeString, timeFormatter);
        } catch (DateTimeParseException e) {
            throw new RuntimeException("Invalid time format. Please provide the time in 'h:mm AM/PM' format.", e);
        }

        // Create and populate the Appointment entity
        Appointment appointment = new Appointment();
        appointment.setPatient(patient);
        appointment.setDoctor(doctor);
        appointment.setAppointmentDate(LocalDate.parse(dto.getDate()));
        appointment.setAppointmentTime(appointmentTime);
        appointment.setBookedAt(LocalDateTime.now());
        appointment.setStatus("PENDING");
        appointment.setPaymentStatus("PAID");
        appointment.setPurpose(dto.getPurpose());

        // Save and return the appointment
        return appointmentRepository.save(appointment);
    }
    

    @Override
    public List<Appointment> getAppointmentsByPatientId(Long patientId) {
        return appointmentRepository.findByPatientId(patientId);
    }

}
