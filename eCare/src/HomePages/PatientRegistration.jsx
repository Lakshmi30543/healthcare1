import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Lock, Eye, EyeOff, Mail, Phone, Calendar, Droplet, MapPin } from 'lucide-react';
import axios from 'axios';
import "./styles/auth.css"
import config from '../config';

const PatientRegistration = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    password: '',
    dob: '',
    email: '',
    contact: '',
    gender: '',
    bloodGroup: '',
    address: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
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

    if (!formData.bloodGroup) {
      newErrors.bloodGroup = 'Blood group is required';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post(`${config.url}/eCare/auth/register/patient`, formData, {
        headers: { "Content-Type": "application/json" }
      });

      if (response.status === 200) {
        alert("Registration successful!");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card registration-card">
        <div className="auth-logo">
          <h1>eCare</h1>
        </div>

        <h2 className="auth-title">Patient Registration</h2>
        <p className="auth-subtitle">Create your account to access healthcare services</p>

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

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-with-icon">
              <Lock size={18} className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
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
              <label htmlFor="bloodGroup">Blood Group</label>
              <div className="input-with-icon">
                <Droplet size={18} className="input-icon" />
                <select
                  id="bloodGroup"
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  className={errors.bloodGroup ? 'input-error' : ''}
                >
                  <option value="">Select blood group</option>
                  {bloodGroups.map((group, index) => (
                    <option key={index} value={group}>{group}</option>
                  ))}
                </select>
              </div>
              {errors.bloodGroup && <p className="error-message">{errors.bloodGroup}</p>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <div className="input-with-icon textarea-container">
              <MapPin size={18} className="input-icon" />
              <textarea
                id="address"
                name="address"
                placeholder="Enter your address"
                value={formData.address}
                onChange={handleChange}
                rows="3"
                className={errors.address ? 'input-error' : ''}
              ></textarea>
            </div>
            {errors.address && <p className="error-message">{errors.address}</p>}
          </div>

          <div className="form-terms">
            <input type="checkbox" id="terms" />
            <label htmlFor="terms">I agree to the <a href="#">Terms and Conditions</a> and <a href="#">Privacy Policy</a></label>
          </div>

          <button type="submit" className="auth-button">Create Account</button>

          <div className="auth-links">
            <p>Already have an account? <Link to="/login">Login</Link></p>
          </div>
        </form>
      </div>

      <div className="auth-decoration">
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
      </div>
    </div>
  );
};

export default PatientRegistration;
