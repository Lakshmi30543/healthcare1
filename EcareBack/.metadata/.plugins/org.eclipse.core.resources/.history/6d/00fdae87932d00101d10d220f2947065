package com.sdp.health.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sdp.health.model.Patient;

public interface PatientRepository extends JpaRepository<Patient, Long> {
    Optional<Patient> findByUsername(String username);
    
}