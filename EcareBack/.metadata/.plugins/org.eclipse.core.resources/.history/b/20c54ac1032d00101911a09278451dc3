package com.sdp.health.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sdp.health.dto.DoctorRegisterRequest;
import com.sdp.health.dto.LoginRequest;
import com.sdp.health.dto.LoginResponse;
import com.sdp.health.dto.PatientRegisterRequest;
import com.sdp.health.model.Admin;
import com.sdp.health.model.Doctor;
import com.sdp.health.model.Patient;
import com.sdp.health.repository.AdminRepository;
import com.sdp.health.repository.DoctorRepository;
import com.sdp.health.repository.PatientRepository;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private AdminRepository adminRepository;

    @Override
    public LoginResponse login(LoginRequest request) {
        String username = request.getUsername();
        String password = request.getPassword();

        // Check Admin Login
        Optional<Admin> adminOpt = adminRepository.findByUsername(username);
        if (adminOpt.isPresent()) {
            Admin admin = adminOpt.get();
            if (admin.getPassword().equals(password)) {
                return new LoginResponse("Login successful", admin.getRole(), admin.getId());
            }
        }

        // Check Doctor Login
        Optional<Doctor> doctorOpt = doctorRepository.findByUsername(username);
        if (doctorOpt.isPresent()) {
            Doctor doctor = doctorOpt.get();
            if (doctor.getPassword().equals(password)) {
                if (!doctor.isApproved()) {
                    return new LoginResponse("Doctor not approved yet", null, null);
                }
                return new LoginResponse("Login successful", doctor.getRole(), doctor.getId());
            }
        }

        // Check Patient Login
        Optional<Patient> patientOpt = patientRepository.findByUsername(username);
        if (patientOpt.isPresent()) {
            Patient patient = patientOpt.get();
            if (patient.getPassword().equals(password)) {
                return new LoginResponse("Login successful", patient.getRole(), patient.getId());
            }
        }

        // Invalid Credentials
        return new LoginResponse("Invalid credentials", null, null);
    }

    @Override
    public String registerPatient(PatientRegisterRequest request) {
        if (patientRepository.findByUsername(request.getUsername()).isPresent()) {
            return "Username already taken";
        }

        Patient patient = new Patient();
        patient.setFullName(request.getFullName());
        patient.setUsername(request.getUsername());
        patient.setPassword(request.getPassword());
        patient.setDob(request.getDob());
        patient.setEmail(request.getEmail());
        patient.setContact(request.getContact());
        patient.setGender(request.getGender());
        patient.setBloodGroup(request.getBloodGroup());
        patient.setAddress(request.getAddress());
        patient.setRole("PATIENT");

        patientRepository.save(patient);
        return "Patient registered successfully";
    }

    @Override
    public String registerDoctor(DoctorRegisterRequest request) {
        if (doctorRepository.findByUsername(request.getUsername()).isPresent()) {
            return "Username already taken";
        }

        Doctor doctor = new Doctor();
        doctor.setFullName(request.getFullName());
        doctor.setUsername(request.getUsername());
        doctor.setPassword(request.getPassword());
        doctor.setDob(request.getDob());
        doctor.setEmail(request.getEmail());
        doctor.setContact(request.getContact());
        doctor.setGender(request.getGender());
        doctor.setSpecialization(request.getSpecialization());
        doctor.setQualification(request.getQualification());
        doctor.setExperienceYears(request.getExperienceYears());
        doctor.setMedicalLicenseNumber(request.getMedicalLicenseNumber());
        doctor.setRole("DOCTOR");
        doctor.setApproved(false);

        doctorRepository.save(doctor);
        return "Doctor registration submitted. Awaiting admin approval.";
    }
}
