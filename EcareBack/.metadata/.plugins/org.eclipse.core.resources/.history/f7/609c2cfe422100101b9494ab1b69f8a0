package com.sdp.health.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sdp.health.dto.AppointmentBookingDTO;
import com.sdp.health.model.Appointment;
import com.sdp.health.model.Doctor;
import com.sdp.health.service.DoctorService;
import com.sdp.health.service.PatientService;

@RestController
@RequestMapping("/eCare/patient")
@CrossOrigin("*")
public class PatientController {
    // Add patient-specific endpoints here
	
	@Autowired
	private DoctorService doctorService;
	
	@GetMapping("/viewAllDoctors")
	public List<Doctor> getApprovedDoctors() {
	    return doctorService.getApprovedDoctors();
	}
	
	@Autowired
    private PatientService patientService;

	@PostMapping("/bookappointment")
	public ResponseEntity<Appointment> bookAppointment(@RequestBody AppointmentBookingDTO dto) {
	    Appointment appointment = patientService.bookAppointment(dto);
	    return ResponseEntity.ok(appointment);
	}


    @GetMapping("/myappointments/{patientId}")
    public ResponseEntity<List<Appointment>> getPatientAppointments(@PathVariable Long patientId) {
        List<Appointment> appointments = patientService.getAppointmentsByPatientId(patientId);
        return ResponseEntity.ok(appointments);
    }
}
