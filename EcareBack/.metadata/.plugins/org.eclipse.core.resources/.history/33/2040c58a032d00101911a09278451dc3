package com.sdp.health.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.sdp.health.dto.AppointmentBookingDTO;
import com.sdp.health.dto.DoctorRegisterRequest;
import com.sdp.health.model.Appointment;
import com.sdp.health.model.Doctor;
import com.sdp.health.service.DoctorService;

@RestController
@RequestMapping("/eCare/doctor")
@CrossOrigin("*")
public class DoctorController {
    
    @Autowired
    private DoctorService doctorService;
    
    @GetMapping("/{id}")
    public ResponseEntity<Doctor> getDoctorById(@PathVariable Long id) {
        try {
            Doctor doctor = doctorService.findById(id);
            return ResponseEntity.ok(doctor);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/approved")
    public ResponseEntity<Boolean> isApproved(@RequestParam Long doctorId) {
        try {
            Doctor doctor = doctorService.findById(doctorId);
            return ResponseEntity.ok(doctor.isApproved());
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PutMapping("/updatedoctor/{doctorId}")
    public ResponseEntity<String> updateDoctor(
            @PathVariable Long doctorId, 
            @RequestPart("request") DoctorRegisterRequest request,
            @RequestPart(value = "file", required = false) MultipartFile file) {

        String response = doctorService.updateDoctor(doctorId, request, file);

        if (response.equals("Doctor updated successfully!")) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @GetMapping("/profilepictureurl/{doctorId}")
    public ResponseEntity<String> getProfilePicture(@PathVariable Long doctorId) {
        try {
            String profilePictureUrl = doctorService.getProfilePictureById(doctorId);
            return ResponseEntity.ok(profilePictureUrl);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    
    
    //Appointment
    
    @GetMapping("/appointments/{doctorId}")
    public ResponseEntity<List<Appointment>> getAppointments(@PathVariable Long doctorId) {
        return ResponseEntity.ok(doctorService.getPaidAppointments(doctorId));
    }

    @PutMapping("/appointments/approve/{id}")
    public ResponseEntity<Appointment> approve(@PathVariable Long id) {
        return ResponseEntity.ok(doctorService.approveAppointment(id));
    }

    @PutMapping("/appointments/reject/{id}")
    public ResponseEntity<Appointment> cancel(@PathVariable Long id) {
        return ResponseEntity.ok(doctorService.cancelAppointment(id));
    }

    @PutMapping("/doctor/appointments/reschedule/{id}")
    public ResponseEntity<Appointment> rescheduleAppointment(
            @PathVariable Long id,
            @RequestBody AppointmentBookingDTO dto) {
        return ResponseEntity.ok(doctorService.rescheduleAppointment(id, dto));
    }
    
    
    
}