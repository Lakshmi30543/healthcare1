import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config'; // Ensure this path is correct

export default function PatientProfile() {
  const [patient, setPatient] = useState({
    fullName: '',
    username: '',
    password: '',
    dob: '',
    email: '',
    contact: '',
    gender: '',
    role: 'PATIENT',
    bloodGroup: '',
    address: '',
  });

  const [loading, setLoading] = useState(true);
  const [isEditable, setIsEditable] = useState(false); // To toggle edit mode
  const patientId = sessionStorage.getItem('userId');

  // Fetch patient data on component mount
  useEffect(() => {
    if (patientId) {
      axios
        .get(`${config.url}/eCare/patient/profile/${patientId}`) // This endpoint should fetch the patient data
        .then((response) => {
          console.log('Fetched patient data:', response.data); // Log the data to check the structure
          setPatient(response.data); // Set the patient data
          setLoading(false); // Set loading to false once data is fetched
        })
        .catch((error) => {
          console.error('Error fetching patient data:', error);
          setLoading(false); // Set loading to false even if there's an error
        });
    } else {
      console.warn('No patient ID found in sessionStorage');
      setLoading(false); // Set loading to false if there's no patientId
    }
  }, [patientId]);

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatient((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission to update patient data
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`${config.url}/eCare/patient/update/${patientId}`, patient) // Update the patient's data
      .then(() => {
        alert('Profile updated successfully!');
        setIsEditable(false); // Disable editing mode after saving
      })
      .catch((error) => {
        console.error('Error updating profile:', error);
      });
  };

  // Display loading state
  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">My Profile</h2>

      {/* If not in edit mode, show profile data */}
      {!isEditable ? (
        <div>
          <p><strong>Full Name:</strong> {patient.fullName || "N/A"}</p>
          <p><strong>Username:</strong> {patient.username || "N/A"}</p>
          <p><strong>Date of Birth:</strong> {patient.dob || "N/A"}</p>
          <p><strong>Email:</strong> {patient.email || "N/A"}</p>
          <p><strong>Contact:</strong> {patient.contact || "N/A"}</p>
          <p><strong>Gender:</strong> {patient.gender || "N/A"}</p>
          <p><strong>Blood Group:</strong> {patient.bloodGroup || "N/A"}</p>
          <p><strong>Address:</strong> {patient.address || "N/A"}</p>

          {/* Button to allow user to edit their profile */}
          <button
            onClick={() => setIsEditable(true)}
            className="mt-4 w-full bg-blue-500 text-white p-2 rounded"
          >
            Edit Profile
          </button>
        </div>
      ) : (
        // Editable form for updating the profile
        <form onSubmit={handleSubmit} className="grid gap-4">
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={patient.fullName}
            onChange={handleChange}
            placeholder="Full Name"
          />
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={patient.username}
            onChange={handleChange}
            placeholder="Username"
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={patient.password}
            onChange={handleChange}
            placeholder="Password"
          />
          <label>Date of Birth</label>
          <input
            type="text"
            name="dob"
            value={patient.dob}
            onChange={handleChange}
            placeholder="Date of Birth"
          />
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={patient.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <label>Contact</label>
          <input
            type="text"
            name="contact"
            value={patient.contact}
            onChange={handleChange}
            placeholder="Contact"
          />
          <label>Gender</label>
          <input
            type="text"
            name="gender"
            value={patient.gender}
            onChange={handleChange}
            placeholder="Gender"
          />
          <label>Blood Group</label>
          <input
            type="text"
            name="bloodGroup"
            value={patient.bloodGroup}
            onChange={handleChange}
            placeholder="Blood Group"
          />
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={patient.address}
            onChange={handleChange}
            placeholder="Address"
          />

          {/* Save changes button */}
          <button type="submit" className="mt-4 w-full bg-green-500 text-white p-2 rounded">
            Save Changes
          </button>
        </form>
      )}
    </div>
  );
}
