import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Lock, Eye, EyeOff, Mail, Phone, Calendar, Award, BookOpen, Briefcase } from 'lucide-react';
import axios from 'axios'; // Make sure to import axios for making API requests
import config from '../config';
import "../HomePages/styles/auth.css"
const AddDoctor = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    password: '',
    dob: '',
    email: '',
    contact: '',
    gender: '',
    medicalLicenseNumber: '',
    specialization: '',
    qualification: '',
    experienceYears: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const specializations = [
    'Cardiology', 'Dermatology', 'Neurology', 'Pediatrics', 
    'Oncology', 'Orthopedics', 'Gynecology', 'Psychiatry',
    'Ophthalmology', 'Radiology', 'Urology', 'Internal Medicine'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.dob) {
      newErrors.dob = 'Date of birth is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.contact) {
      newErrors.contact = 'Contact number is required';
    } else if (!phoneRegex.test(formData.contact)) {
      newErrors.contact = 'Contact must be 10 digits';
    }

    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }

    if (!formData.medicalLicenseNumber.trim()) {
      newErrors.medicalLicenseNumber = 'Medical license number is required';
    }

    if (!formData.specialization) {
      newErrors.specialization = 'Specialization is required';
    }

    if (!formData.qualification.trim()) {
      newErrors.qualification = 'Qualification is required';
    }

    if (!formData.experienceYears) {
      newErrors.experienceYears = 'Years of experience is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    try {
      const response = await axios.post(`${config.url}/eCare/admin/addDoctor`, formData, {
        headers: { "Content-Type": "application/json" }
      });
  
      if (response.status === 200) {
        navigate("/admin/home");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
      alert(errorMessage);
    }
  };
  

  return (
    <div className="auth-container">
      <div className="auth-card registration-card">
        <div className="auth-logo">
          <h1>eCare</h1>
        </div>

        <h2 className="auth-title">Doctor Registration</h2>
        <p className="auth-subtitle">Create your account to join our healthcare platform</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <div className="input-with-icon">
                <User size={18} className="input-icon" />
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={errors.fullName ? 'input-error' : ''}
                />
              </div>
              {errors.fullName && <p className="error-message">{errors.fullName}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="username">Username</label>
              <div className="input-with-icon">
                <User size={18} className="input-icon" />
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Choose a username"
                  value={formData.username}
                  onChange={handleChange}
                  className={errors.username ? 'input-error' : ''}
                />
              </div>
              {errors.username && <p className="error-message">{errors.username}</p>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-with-icon">
                <Lock size={18} className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? 'input-error' : ''}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="toggle-password"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="error-message">{errors.password}</p>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="dob">Date of Birth</label>
              <div className="input-with-icon">
                <Calendar size={18} className="input-icon" />
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className={errors.dob ? 'input-error' : ''}
                />
              </div>
              {errors.dob && <p className="error-message">{errors.dob}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className={errors.gender ? 'input-error' : ''}
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && <p className="error-message">{errors.gender}</p>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="input-with-icon">
                <Mail size={18} className="input-icon" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'input-error' : ''}
                />
              </div>
              {errors.email && <p className="error-message">{errors.email}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="contact">Contact Number</label>
              <div className="input-with-icon">
                <Phone size={18} className="input-icon" />
                <input
                  type="text"
                  id="contact"
                  name="contact"
                  placeholder="Enter your contact number"
                  value={formData.contact}
                  onChange={handleChange}
                  className={errors.contact ? 'input-error' : ''}
                />
              </div>
              {errors.contact && <p className="error-message">{errors.contact}</p>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="medicalLicenseNumber">Medical License Number</label>
              <div className="input-with-icon">
                <Award size={18} className="input-icon" />
                <input
                  type="text"
                  id="medicalLicenseNumber"
                  name="medicalLicenseNumber"
                  placeholder="Enter license number"
                  value={formData.medicalLicenseNumber}
                  onChange={handleChange}
                  className={errors.medicalLicenseNumber ? 'input-error' : ''}
                />
              </div>
              {errors.medicalLicenseNumber && <p className="error-message">{errors.medicalLicenseNumber}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="specialization">Specialization</label>
              <select
                id="specialization"
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                className={errors.specialization ? 'input-error' : ''}
              >
                <option value="">Select specialization</option>
                {specializations.map((spec) => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
              {errors.specialization && <p className="error-message">{errors.specialization}</p>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="qualification">Qualification</label>
              <div className="input-with-icon">
                <BookOpen size={18} className="input-icon" />
                <input
                  type="text"
                  id="qualification"
                  name="qualification"
                  placeholder="Enter qualification"
                  value={formData.qualification}
                  onChange={handleChange}
                  className={errors.qualification ? 'input-error' : ''}
                />
              </div>
              {errors.qualification && <p className="error-message">{errors.qualification}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="experienceYears">Experience (Years)</label>
              <div className="input-with-icon">
                <Briefcase size={18} className="input-icon" />
                <input
                  type="number"
                  id="experienceYears"
                  name="experienceYears"
                  placeholder="Enter years of experience"
                  value={formData.experienceYears}
                  onChange={handleChange}
                  className={errors.experienceYears ? 'input-error' : ''}
                />
              </div>
              {errors.experienceYears && <p className="error-message">{errors.experienceYears}</p>}
            </div>
          </div>

          <button type="submit" className="submit-btn">Register</button>

          {errors.server && <p className="error-message server-error">{errors.server}</p>}
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default AddDoctor;
