package com.sdp.health.dto;

public class PrescriptionDTO {
    private Long appointmentId;
    private Long doctorId;
    private String doctorName; 
    private Long patientId;
    private String prescriptionText;
    private String medicalIssue;  // ✅ Correct field name
    private String diagnosis;     // ✅ Additional field

    // Default constructor
    public PrescriptionDTO() {
    }

    // Constructor with all fields
    public PrescriptionDTO(Long appointmentId, Long doctorId, String doctorName, Long patientId,
                           String prescriptionText, String medicalIssue, String diagnosis) {
        this.appointmentId = appointmentId;
        this.doctorId = doctorId;
        this.doctorName = doctorName;
        this.patientId = patientId;
        this.prescriptionText = prescriptionText;
        this.medicalIssue = medicalIssue;
        this.diagnosis = diagnosis;
    }

    // Getters and Setters
    public Long getAppointmentId() {
        return appointmentId;
    }

    public void setAppointmentId(Long appointmentId) {
        this.appointmentId = appointmentId;
    }

    public Long getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(Long doctorId) {
        this.doctorId = doctorId;
    }

    public String getDoctorName() {
        return doctorName;
    }

    public void setDoctorName(String doctorName) {
        this.doctorName = doctorName;
    }

    public Long getPatientId() {
        return patientId;
    }

    public void setPatientId(Long patientId) {
        this.patientId = patientId;
    }

    public String getPrescriptionText() {
        return prescriptionText;
    }

    public void setPrescriptionText(String prescriptionText) {
        this.prescriptionText = prescriptionText;
    }

    public String getMedicalIssue() {
        return medicalIssue;
    }

    public void setMedicalIssue(String medicalIssue) {
        this.medicalIssue = medicalIssue;
    }

    public String getDiagnosis() {
        return diagnosis;
    }

    public void setDiagnosis(String diagnosis) {
        this.diagnosis = diagnosis;
    }

    @Override
    public String toString() {
        return "PrescriptionDTO{" +
                "appointmentId=" + appointmentId +
                ", doctorId=" + doctorId +
                ", doctorName='" + doctorName + '\'' +
                ", patientId=" + patientId +
                ", prescriptionText='" + prescriptionText + '\'' +
                ", medicalIssue='" + medicalIssue + '\'' +
                ", diagnosis='" + diagnosis + '\'' +
                '}';
    }
}
