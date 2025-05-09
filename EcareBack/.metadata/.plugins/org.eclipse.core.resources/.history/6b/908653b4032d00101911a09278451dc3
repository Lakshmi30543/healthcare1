package com.sdp.health.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.sdp.health.dto.AppointmentBookingDTO;
import com.sdp.health.dto.DoctorRegisterRequest;
import com.sdp.health.model.Appointment;
import com.sdp.health.model.Doctor;

public interface DoctorService {
    String approveDoctor(Long doctorId);
    Doctor findById(Long id);
    List<Doctor> getUnapprovedDoctors();
    List<Doctor> getApprovedDoctors();
    void rejectDoctor(Long doctorId);
    long countApprovedDoctors();
    long countPendingDoctorApprovals();
    String updateDoctor(Long doctorId, DoctorRegisterRequest request, MultipartFile file);
    String getProfilePictureById(Long doctorId);
    
    
    List<Appointment> getPaidAppointments(Long doctorId);
    Appointment approveAppointment(Long appointmentId);
    Appointment cancelAppointment(Long appointmentId);
    Appointment rescheduleAppointment(Long appointmentId, AppointmentBookingDTO dto);

    
}
