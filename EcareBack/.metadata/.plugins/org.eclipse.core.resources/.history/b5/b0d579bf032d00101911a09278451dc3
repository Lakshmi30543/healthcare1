package com.sdp.health.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sdp.health.dto.DoctorRegisterRequest;
import com.sdp.health.model.Doctor;
import com.sdp.health.repository.DoctorRepository;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private DoctorRepository doctorRepository;

    @Override
    public String addDoctorByAdmin(DoctorRegisterRequest request) {
        if (doctorRepository.findByUsername(request.getUsername()).isPresent()) {
            return "Username already taken";
        }

        Doctor doctor = new Doctor();
        doctor.setFullName(request.getFullName());
        doctor.setUsername(request.getUsername());
        doctor.setPassword(request.getPassword()); // 🔐 Optionally hash
        doctor.setDob(request.getDob());
        doctor.setEmail(request.getEmail());
        doctor.setContact(request.getContact());
        doctor.setGender(request.getGender());
        doctor.setSpecialization(request.getSpecialization());
        doctor.setQualification(request.getQualification());
        doctor.setExperienceYears(request.getExperienceYears());
        doctor.setMedicalLicenseNumber(request.getMedicalLicenseNumber());
        doctor.setRole("DOCTOR");
        doctor.setApproved(true); // ✅ Directly approved by Admin

        doctorRepository.save(doctor);
        return "Doctor added and approved successfully by Admin!";
    }

}

