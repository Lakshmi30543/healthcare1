package com.sdp.health.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.sdp.health.dto.AppointmentBookingDTO;
import com.sdp.health.model.Appointment;
import com.sdp.health.model.Patient;

public interface PatientService {
	List<Patient> getAllPatients();
    void deletePatient(Long id);
    long countTotalPatients();
//    long countAppointmentsThisWeek();
    
    
    Appointment bookAppointment(AppointmentBookingDTO dto);
    List<Appointment> getAppointmentsByPatientId(Long patientId);
    

    Patient getPatientById(Long id);
    String updatePatient(Long id, Patient patientDetails, MultipartFile file);
    String getProfilePictureById(Long id);
}