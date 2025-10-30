package com.sdp.health.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.sdp.health.dto.PrescriptionDTO;
import com.sdp.health.model.Prescription;
import com.sdp.health.service.PrescriptionService;

@RestController
@RequestMapping("/eCare/prescriptions")
@CrossOrigin("*")
public class PrescriptionController {

    private final PrescriptionService prescriptionService;

    @Autowired
    public PrescriptionController(PrescriptionService prescriptionService) {
        this.prescriptionService = prescriptionService;
    }

    @PostMapping("/create")
    public ResponseEntity<?> createPrescription(@RequestBody PrescriptionDTO prescriptionDTO) {
        try {
            Prescription prescription = prescriptionService.createPrescription(prescriptionDTO);
            return ResponseEntity.ok(prescription);
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating prescription");
        }
    }

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<Prescription>> getPatientPrescriptions(@PathVariable Long patientId) {
        List<Prescription> prescriptions = prescriptionService.getPrescriptionsByPatient(patientId);
        return ResponseEntity.ok(prescriptions);
    }

    @GetMapping("/appointment/{appointmentId}")
    public ResponseEntity<List<Prescription>> getAppointmentPrescriptions(@PathVariable Long appointmentId) {
        List<Prescription> prescriptions = prescriptionService.getPrescriptionsByAppointment(appointmentId);
        return ResponseEntity.ok(prescriptions);
    }
}
