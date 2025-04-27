package com.sdp.health.service;

import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Locale;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.sdp.health.dto.AppointmentBookingDTO;
import com.sdp.health.dto.DoctorRegisterRequest;
import com.sdp.health.model.Appointment;
import com.sdp.health.model.Doctor;
import com.sdp.health.repository.AppointmentRepository;
import com.sdp.health.repository.DoctorRepository;

@Service
public class DoctorServiceImpl implements DoctorService {
	
    @Autowired
    private DoctorRepository doctorRepository;
    
    @Autowired
    private AppointmentRepository appointmentRepository;
    

    @Override
    public String approveDoctor(Long doctorId) {
        Doctor doctor = doctorRepository.findById(doctorId)
            .orElseThrow(() -> new RuntimeException("Doctor not found with ID: " + doctorId));
        doctor.setApproved(true);
        doctorRepository.save(doctor);
        return "Doctor approved successfully";
    }

    @Override
    public Doctor findById(Long id) {
        return doctorRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Doctor not found with ID: " + id));
    }
    @Override
    public List<Doctor> getUnapprovedDoctors() {
        return doctorRepository.findByApprovedFalse(); // custom query
    }

    @Override
    public List<Doctor> getApprovedDoctors() {
        return doctorRepository.findByApprovedTrue(); // custom query
    }
    
    @Override
    public void rejectDoctor(Long doctorId) {
        Doctor doctor = doctorRepository.findById(doctorId).orElse(null);

        if (doctor != null) {
            doctorRepository.delete(doctor);
        } else {
            System.out.println("Doctor with ID " + doctorId + " not found.");
        }
    }
    @Override
    public long countApprovedDoctors() {
        return doctorRepository.countByApprovedTrue();
    }

    @Override
    public long countPendingDoctorApprovals() {
        return doctorRepository.countByApprovedFalse();
    }
    
    @Override
    public String updateDoctor(Long doctorId, DoctorRegisterRequest request, MultipartFile file) {
        Optional<Doctor> existingDoctor = doctorRepository.findById(doctorId);

        if (!existingDoctor.isPresent()) {
            return "Doctor not found!";
        }

        Doctor doctor = existingDoctor.get();

        // 1. Update doctor fields (only if present)
        doctor.setFullName(request.getFullName() != null ? request.getFullName() : doctor.getFullName());
        doctor.setUsername(request.getUsername() != null ? request.getUsername() : doctor.getUsername());
        doctor.setPassword(request.getPassword() != null ? request.getPassword() : doctor.getPassword());
        doctor.setDob(request.getDob() != null ? request.getDob() : doctor.getDob());
        doctor.setEmail(request.getEmail() != null ? request.getEmail() : doctor.getEmail());
        doctor.setContact(request.getContact() != null ? request.getContact() : doctor.getContact());
        doctor.setGender(request.getGender() != null ? request.getGender() : doctor.getGender());
        doctor.setSpecialization(request.getSpecialization() != null ? request.getSpecialization() : doctor.getSpecialization());
        doctor.setQualification(request.getQualification() != null ? request.getQualification() : doctor.getQualification());
        doctor.setExperienceYears(request.getExperienceYears() != 0 ? request.getExperienceYears() : doctor.getExperienceYears());
        doctor.setMedicalLicenseNumber(request.getMedicalLicenseNumber() != null ? request.getMedicalLicenseNumber() : doctor.getMedicalLicenseNumber());
        doctor.setBio(request.getBio() != null ? request.getBio() : doctor.getBio());
        doctor.setPrize(request.getPrize() != null ? request.getPrize() : doctor.getPrize());
        doctor.setAddress(request.getAddress() != null ? request.getAddress() : doctor.getAddress());

        // 2. Upload image with validations
        if (file != null && !file.isEmpty()) {
            try {
                // Validation: check file type
                String contentType = file.getContentType();
                if (contentType == null || !contentType.startsWith("image/")) {
                    return "Invalid file type. Only image files are allowed.";
                }

                // Validation: check file size (e.g., max 5MB)
                if (file.getSize() > 5 * 1024 * 1024) {
                    return "File size too large. Max allowed is 5MB.";
                }

                // Generate unique filename
                String uniqueFileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();

                // Full path where the file will be saved (local directory within the frontend folder)
                String uploadDir = "C:\\Users\\sreyu\\Desktop\\ALLPROJECT\\Health_Care_Appointment_System\\eCare\\public\\"; // Adjust to your path

                String filePath = uploadDir + uniqueFileName;

                // Save image to the filesystem
                file.transferTo(new File(filePath));

                // Save relative file path for frontend
                String relativePath = "public/" + uniqueFileName; // Path relative to frontend project
                doctor.setProfilePictureUrl(relativePath);

            } catch (IOException e) {
                return "Doctor updated but image upload failed: " + e.getMessage();
            }
        }

        // 3. Save doctor to DB
        doctorRepository.save(doctor);

        return "Doctor updated successfully!";
    }
    
    @Override
    public String getProfilePictureById(Long doctorId) {
        Doctor doctor = doctorRepository.findById(doctorId)
            .orElseThrow(() -> new RuntimeException("Doctor not found with ID: " + doctorId));
        
        return doctor.getProfilePictureUrl();
    }
    
    
    
    
    
    //Appointment
    
    @Override
    public List<Appointment> getPaidAppointments(Long doctorId) {
        return appointmentRepository.findPaidAppointmentsByDoctorId(doctorId);
    }

    @Override
    public Appointment approveAppointment(Long appointmentId) {
        Appointment appt = appointmentRepository.findById(appointmentId).orElseThrow();
        appt.setStatus("APPROVED");
        return appointmentRepository.save(appt);
    }

    @Override
    public Appointment cancelAppointment(Long appointmentId) {
        Appointment appt = appointmentRepository.findById(appointmentId).orElseThrow();
        appt.setStatus("CANCELLED");
        return appointmentRepository.save(appt);
    }

    @Override
    public Appointment rescheduleAppointment(Long appointmentId, AppointmentBookingDTO dto) {
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment not found with ID: " + appointmentId));

        // Parse new time in "h:mm a" format
        LocalTime appointmentTime;
        try {
            DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("h:mm a", Locale.US);
            appointmentTime = LocalTime.parse(dto.getTime().trim(), timeFormatter);
        } catch (DateTimeParseException e) {
            throw new RuntimeException("Invalid time format. Please use 'h:mm AM/PM'.", e);
        }

        // Update only date and time
        appointment.setAppointmentDate(LocalDate.parse(dto.getDate()));
        appointment.setAppointmentTime(appointmentTime);
        appointment.setStatus("RESCHEDULED");

        return appointmentRepository.save(appointment);
    }


    
   
}
