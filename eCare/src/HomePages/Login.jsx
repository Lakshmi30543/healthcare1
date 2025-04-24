import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, Lock, Eye, EyeOff } from "lucide-react";
import axios from "axios";
import config from "../config";
import { useAuth } from "../context/AuthContext"; // 👈 using context

import "./styles/auth.css"
const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { setIsAdminLoggedIn, setIsDoctorLoggedIn, setIsPatientLoggedIn } = useAuth(); // 👈 from AuthContext

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    if (!validateForm()) return;
    setLoading(true);

    try {
      const response = await axios.post(`${config.url}/eCare/auth/login`, formData, {
        headers: { "Content-Type": "application/json" }
      });

      console.log("API Response Data:", response.data);

      if (response.status === 200 && response.data) {
        const { id, role } = response.data;
      
        console.log("Extracted ID:", id);
        console.log("Extracted Role:", role);
      
        if (!role || !id) {
          setErrors({ api: "Missing role or ID in response." });
          setLoading(false);
          return;
        }
      
        if (role.toUpperCase() === "ADMIN") {
          setIsAdminLoggedIn(true);
          sessionStorage.setItem("userId", id);
          navigate("/admin/home");
        } else if (role.toUpperCase() === "DOCTOR") {
          setIsDoctorLoggedIn(true);
          sessionStorage.setItem("userId", id);
          navigate("/doctor/home");
        } else if (role.toUpperCase() === "PATIENT") {
          setIsPatientLoggedIn(true);
          sessionStorage.setItem("userId", id);
          navigate("/patient/home");
        } else {
          setErrors({ api: "Invalid role received." });
        }
      }      
    } catch (error) {
      console.error("Login Error:", error);
      if (error.response) {
        console.log("Error Response Data:", error.response.data);
        setErrors({ api: error.response.data?.message || "Something went wrong. Try again." });
      } else {
        setErrors({ api: "Network error. Check your connection." });
      }
    }

    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-logo">
          <h1>eCare</h1>
        </div>

        <h2 className="auth-title">Login to your account</h2>
        <p className="auth-subtitle">
          Welcome back! Please enter your credentials to continue
        </p>

        {errors.api && <p className="error-message">{errors.api}</p>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <div className="input-with-icon">
              <User size={18} className="input-icon" />
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                className={errors.username ? "input-error" : ""}
              />
            </div>
            {errors.username && <p className="error-message">{errors.username}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-with-icon">
              <Lock size={18} className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? "input-error" : ""}
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

          <div className="form-footer">
            <div className="remember-me">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <a href="#" className="forgot-password">Forgot password?</a>
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="auth-links">
            <p>Don't have an account?</p>
            <div className="register-options">
              <Link to="/register/doctor" className="register-link">Register as Doctor</Link>
              <Link to="/register/patient" className="register-link">Register as Patient</Link>
            </div>
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

export default Login;
