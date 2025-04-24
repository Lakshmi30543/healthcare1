import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config'; // Adjust the path if needed

export default function ManagePatients() {
  const [patients, setPatients] = useState([]);

  // Fetch patients when component mounts
  useEffect(() => {
    axios.get(`${config.url}/eCare/admin/viewAllPatients`)
      .then(response => setPatients(response.data))
      .catch(error => console.error('Error fetching patients:', error));
  }, []);

  // Handle delete patient
  const handleDelete = (id) => {
    axios.delete(`${config.url}/eCare/admin/deletePatient/${id}`)
      .then(() => {
        setPatients(prev => prev.filter(patient => patient.id !== id));
      })
      .catch(error => console.error('Error deleting patient:', error));
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Manage Patients</h2>
      {patients.length === 0 ? (
        <p className="text-center">No patients found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover table-bordered align-middle">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Full Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Gender</th>
                <th>DOB</th>
                <th>Blood Group</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient.id}>
                  <td>{patient.id}</td>
                  <td>{patient.fullName}</td>
                  <td>{patient.username}</td>
                  <td>{patient.email}</td>
                  <td>{patient.contact}</td>
                  <td>{patient.gender}</td>
                  <td>{patient.dob}</td>
                  <td>{patient.bloodGroup}</td>
                  <td>{patient.address}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(patient.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
