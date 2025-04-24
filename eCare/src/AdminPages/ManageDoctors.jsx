import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import config from "../config";
import { Check, X } from "lucide-react";

export default function ManageDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [view, setView] = useState("unapproved");
  const navigate = useNavigate();

  useEffect(() => {
    if (view === "unapproved") fetchUnapprovedDoctors();
    else fetchApprovedDoctors();
  }, [view]);

  const fetchUnapprovedDoctors = async () => {
    const res = await axios.get(`${config.url}/eCare/admin/unapprovedDoctors`);
    setDoctors(res.data);
  };

  const fetchApprovedDoctors = async () => {
    const res = await axios.get(`${config.url}/eCare/admin/approvedDoctors`);
    setDoctors(res.data);
  };

  const handleApprove = async (doctorId) => {
    await axios.put(`${config.url}/eCare/admin/approveDoctor/${doctorId}`);
    if (view === "unapproved") fetchUnapprovedDoctors();
    else fetchApprovedDoctors();
  };

  const handleReject = async (doctorId) => {
    await axios.put(`${config.url}/eCare/admin/disapproveDoctor/${doctorId}`);
    if (view === "unapproved") fetchUnapprovedDoctors();
    else fetchApprovedDoctors();
  };

  return (
    <div className="container p-4">
      <h1 className="text-center mb-4">Manage Doctors</h1>

      <div className="d-flex justify-content-start mb-4">
        <button
          onClick={() => setView("unapproved")}
          className={`btn ${view === "unapproved" ? "btn-warning" : "btn-light"} me-2`}
        >
          Unapproved Doctors
        </button>
        <button
          onClick={() => setView("approved")}
          className={`btn ${view === "approved" ? "btn-success" : "btn-light"} me-2`}
        >
          Approved Doctors
        </button>
        <button
          onClick={() => navigate('/admin/addDoctor', { state: { defaultView: "approved" } })}
          className="btn btn-primary"
        >
          Add Doctor
        </button>
      </div>

      {doctors.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Full Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Contact</th>
                <th>DOB</th>
                <th>Gender</th>
                <th>License No.</th>
                <th>Specialization</th>
                <th>Qualification</th>
                <th>Experience (yrs)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doctor, index) => (
                <tr key={doctor.id}>
                  <td>{index + 1}</td>
                  <td>{doctor.fullName}</td>
                  <td>{doctor.username}</td>
                  <td>{doctor.email}</td>
                  <td>{doctor.contact}</td>
                  <td>{doctor.dob}</td>
                  <td>{doctor.gender}</td>
                  <td>{doctor.medicalLicenseNumber}</td>
                  <td>{doctor.specialization}</td>
                  <td>{doctor.qualification}</td>
                  <td>{doctor.experienceYears}</td>
                  <td>
                    <div className="d-flex gap-2 justify-content-center">
                      {view === "unapproved" ? (
                        <>
                          <button
                            onClick={() => handleApprove(doctor.id)}
                            className="btn btn-success"
                            title="Approve"
                          >
                            <Check />
                          </button>
                          <button
                            onClick={() => handleReject(doctor.id)}
                            className="btn btn-danger"
                            title="Reject"
                          >
                            <X />
                          </button>
                        </>
                      ) : (
                        <>
                          <span className="text-success me-2">Approved</span>
                          <button
                            onClick={() => handleReject(doctor.id)}
                            className="btn btn-danger"
                            title="Revoke Approval"
                          >
                            <X />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-muted">No doctors to display.</p>
      )}
    </div>
  );
}
