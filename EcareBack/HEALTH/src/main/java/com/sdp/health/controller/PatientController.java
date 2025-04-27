package com.sdp.health.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.sdp.health.dto.AppointmentBookingDTO;
import com.sdp.health.model.Appointment;
import com.sdp.health.model.Doctor;
import com.sdp.health.model.Patient;
import com.sdp.health.service.DoctorService;
import com.sdp.health.service.PatientService;

@RestController
@RequestMapping("/eCare/patient")
@CrossOrigin("*")
public class PatientController {
    // Add patient-specific endpoints here
	
	@Autowired
	private DoctorService doctorService;
	
	 @Autowired
	 private PatientService patientService;
	    
	 
	@GetMapping("/viewAllDoctors")
	public List<Doctor> getApprovedDoctors() {
	    return doctorService.getApprovedDoctors();
	}
	
	
	//section -2
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
    
    
    //section-3
   
    @GetMapping("/profile/{id}")
    public ResponseEntity<Patient> getPatientById(@PathVariable Long id) {
        Patient patient = patientService.getPatientById(id);
        if (patient != null) {
            return ResponseEntity.ok(patient);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
    
    @PutMapping("/updatepatient/{id}")
    public ResponseEntity<String> updatePatient(
            @PathVariable("id") Long id,
            @RequestPart("patientDetails") Patient patientDetails,
            @RequestPart(value = "file", required = false) MultipartFile file) {

        String response = patientService.updatePatient(id, patientDetails, file);

        if (response.equals("Patient updated successfully!")) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @GetMapping("/profilepictureurl/{id}")
    public ResponseEntity<String> getPatientProfilePicture(@PathVariable Long id) {
        try {
            String profilePictureUrl = patientService.getProfilePictureById(id);
            return ResponseEntity.ok(profilePictureUrl);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }


}