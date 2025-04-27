import React, { useState, useRef, useEffect } from 'react';
import '../styles/dprofile.css';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaUserMd, FaGraduationCap, 
         FaBriefcaseMedical, FaEdit, FaSave, FaTimes, FaCamera } from 'react-icons/fa';
import axios from 'axios';
import config from '../../config';

// Default doctor avatar
const defaultAvatar = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'%3E%3Cpath fill='%2329cabb' d='M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-96 55.2C54 332.9 0 401.3 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7c0-81-54-149.4-128-171.1V362c27.6 7.1 48 32.2 48 62v40c0 8.8-7.2 16-16 16H336c-8.8 0-16-7.2-16-16s7.2-16 16-16V424c0-17.7-14.3-32-32-32s-32 14.3-32 32v38c8.8 0 16 7.2 16 16s-7.2 16-16 16H256c-8.8 0-16-7.2-16-16V424c0-29.8 20.4-54.9 48-62V304.9c-6-.6-12.1-.9-18.3-.9H178.3c-6.2 0-12.3 .3-18.3 .9v65.4c23.1 6.9 40 28.3 40 53.7c0 30.9-25.1 56-56 56s-56-25.1-56-56c0-25.4 16.9-46.8 40-53.7V311.2zM144 448a24 24 0 1 0 0-48 24 24 0 1 0 0 48z'/%3E%3C/svg%3E";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const fileInputRef = useRef(null);

  // Initialize with empty data
  const [doctorData, setDoctorData] = useState({
    name: "",
    title: "",
    email: "",
    phone: "",
    address: "",
    bio: "",
    prize: "", 
    avatar: defaultAvatar,
    stats: [
      { value: "0", label: "Years Experience" },
      { value: "0", label: "Patients" },
      { value: "0", label: "Rating" }
    ],
    education: [],
    experience: [],
    specializations: []
  });

  const [formData, setFormData] = useState({...doctorData});

  // Fetch doctor data from backend
  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        setIsLoading(true);
        const doctorId = sessionStorage.getItem('userId');
        // Fetch doctor data
        const response = await axios.get(`${config.url}/eCare/doctor/${doctorId}`);
        // Fetch profile picture URL (returns path as string)
        const profilePicUrlRes = await axios.get(`${config.url}/eCare/doctor/profilepictureurl/${doctorId}`);
        let profilePicUrl = profilePicUrlRes.data;

        // If the path is not absolute, use it directly (public folder is root for static files)
        if (profilePicUrl && !profilePicUrl.startsWith('http')) {
          profilePicUrl = profilePicUrl; // e.g., "/profile_pics/filename.jpg"
        }

        if (response.data) {
          const doctor = response.data;
          const formattedData = {
            name: doctor.fullName || "",
            title: doctor.specialization || "",
            email: doctor.email || "",
            phone: doctor.contact || "",
            address: doctor.address || "",
            bio: doctor.bio || "No bio available",
            prize: doctor.prize || "",
            avatar: profilePicUrl || defaultAvatar,
            username: doctor.username || "",
            password: doctor.password || "",
            dob: doctor.dob || "",
            gender: doctor.gender || "",
            qualification: doctor.qualification || "",
            medicalLicenseNumber: doctor.medicalLicenseNumber || "",
            role: doctor.role || "",
            stats: [
              { value: `${doctor.experienceYears || 0}+`, label: "Years Experience" },
              { value: `${doctor.patientCount || 0}+`, label: "Patients" },
              { value: doctor.rating || "0", label: "Rating" }
            ],
            education: doctor.education ? doctor.education.map(edu => ({
              date: edu.period || "",
              title: edu.degree || "",
              content: edu.institution || ""
            })) : [],
            experience: doctor.experience ? doctor.experience.map(exp => ({
              date: exp.period || "",
              title: exp.position || "",
              content: exp.hospital || ""
            })) : [],
            specializations: doctor.specializations ? doctor.specializations.map(spec => ({
              title: spec.name || "",
              content: spec.description || ""
            })) : []
          };

          setDoctorData(formattedData);
          setFormData(formattedData);
        }
      } catch (error) {
        console.error('Error fetching doctor data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoctorData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Preview the image
      const reader = new FileReader();
      reader.onloadend = () => {
        const imgElement = document.querySelector('.fire-profile-avatar');
        if (imgElement) {
          imgElement.src = reader.result;
        }
      };
      reader.readAsDataURL(file);

      // Update formData with the new file
      setFormData({
        ...formData,
        avatar: file
      });
    }
  };

  const handleImageClick = () => {
    if (isEditing) {
      fileInputRef.current.click();
    }
  };

  const handleSave = async () => {
    try {
      const doctorId = sessionStorage.getItem('userId');
      if (!doctorId) throw new Error('Doctor ID not found');

      // 1. Build update JSON object
      const updateData = {
        fullName: formData.name,
        username: doctorData.username,
        password: doctorData.password,
        dob: formData.dob || doctorData.dob,
        email: formData.email,
        contact: formData.phone,
        gender: formData.gender || doctorData.gender,
        specialization: formData.title,
        qualification: formData.qualification || doctorData.qualification,
        experienceYears: parseInt(doctorData.stats[0].value) || 0,
        medicalLicenseNumber: formData.medicalLicenseNumber || doctorData.medicalLicenseNumber,
        address: formData.address,
        bio: formData.bio || doctorData.bio,
        prize: formData.prize || "",
        role: doctorData.role
      };

      // 2. Create FormData and append JSON and image
      const formDataToSend = new FormData();
      formDataToSend.append("request", new Blob([JSON.stringify(updateData)], { type: "application/json" }));

      // Only add file if new image was selected
      if (formData.avatar instanceof File) {
        formDataToSend.append("file", formData.avatar);
      }

      // 3. Send request
      const response = await axios.put(
        `${config.url}/eCare/doctor/updatedoctor/${doctorId}`,
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
          timeout: 10000
        }
      );

      if (response.data) {
        setDoctorData(formData);
        setIsEditing(false);
        alert('Profile updated successfully!');
      }
    } catch (error) {
      console.error('Error updating doctor profile:', error);
      let errorMessage = 'Failed to update profile. ';
      if (error.response) {
        errorMessage += `Server error: ${error.response.data}`;
      } else if (error.request) {
        errorMessage += 'Server not responding. Try again later.';
      } else {
        errorMessage += error.message;
      }
      alert(errorMessage);
    }
  };

  const handleCancel = () => {
    setFormData({...doctorData});
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <div className="fire-profile-container">
        <div className="fire-loading">Loading profile data...</div>
      </div>
    );
  }

  return (
    <div className={`fire-profile-container ${isEditing ? 'fire-edit-mode' : ''}`}>
      <div className="fire-profile-content">
        <div className="fire-profile-header">
          <h1>Doctor Profile</h1>
          {!isEditing ? (
            <button className="fire-edit-profile-btn" onClick={() => setIsEditing(true)}>
              <FaEdit /> Edit Profile
            </button>
          ) : (
            <div className="fire-action-buttons">
              <button className="fire-cancel-btn" onClick={handleCancel}>
                <FaTimes /> Cancel
              </button>
              <button className="fire-save-btn" onClick={handleSave}>
                <FaSave /> Save Changes
              </button>
            </div>
          )}
        </div>
        
        <div className="fire-profile-card">
          {!isEditing ? (
            <>
              <div className="fire-profile-basic-info">
                <img src={
                  typeof doctorData.avatar === 'string'
                    ? doctorData.avatar
                    : defaultAvatar
                } alt={doctorData.name} className="fire-profile-avatar" onError={(e) => {e.target.src = defaultAvatar}} />
                <div className="fire-profile-details">
                  <h2 className="fire-profile-name">{doctorData.name}</h2>
                  <p className="fire-profile-title">{doctorData.title}</p>
                  
                  <div className="fire-profile-contact">
                    <div className="fire-contact-item">
                      <FaEnvelope /> {doctorData.email}
                    </div>
                    <div className="fire-contact-item">
                      <FaPhone /> {doctorData.phone}
                    </div>
                    <div className="fire-contact-item">
                      <FaMapMarkerAlt /> {doctorData.address}
                    </div>
                    <div className="fire-contact-item">
                      <FaUserMd /> Username: {doctorData.username}
                    </div>
                    <div className="fire-contact-item">
                      <FaUserMd /> Date of Birth: {doctorData.dob}
                    </div>
                    <div className="fire-contact-item">
                      <FaUserMd /> Gender: {doctorData.gender}
                    </div>
                    <div className="fire-contact-item">
                      <FaGraduationCap /> {doctorData.qualification}
                    </div>
                    <div className="fire-contact-item">
                      <FaBriefcaseMedical /> License: {doctorData.medicalLicenseNumber}
                    </div>
                    <div className="fire-contact-item">
                      <FaUserMd /> Prize: {doctorData.prize}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="fire-profile-sections">
                <div className="fire-section">
                  <div className="fire-section-header">
                    <div className="fire-section-icon"><FaUserMd /></div>
                    <h3 className="fire-section-title">About Me</h3>
                  </div>
                  <p className="fire-bio-text">{doctorData.bio}</p>
                  
                  <div className="fire-stats-grid">
                    {doctorData.stats.map((stat, index) => (
                      <div className="fire-stat-box" key={index}>
                        <div className="fire-stat-value">{stat.value}</div>
                        <div className="fire-stat-label">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {doctorData.education.length > 0 && (
                  <div className="fire-section">
                    <div className="fire-section-header">
                      <div className="fire-section-icon"><FaGraduationCap /></div>
                      <h3 className="fire-section-title">Education</h3>
                    </div>
                    <div className="fire-timeline">
                      {doctorData.education.map((item, index) => (
                        <div className="fire-timeline-item" key={index}>
                          <div className="fire-timeline-date">{item.date}</div>
                          <div className="fire-timeline-title">{item.title}</div>
                          <div className="fire-timeline-content">{item.content}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {doctorData.experience.length > 0 && (
                  <div className="fire-section">
                    <div className="fire-section-header">
                      <div className="fire-section-icon"><FaBriefcaseMedical /></div>
                      <h3 className="fire-section-title">Experience</h3>
                    </div>
                    <div className="fire-timeline">
                      {doctorData.experience.map((item, index) => (
                        <div className="fire-timeline-item" key={index}>
                          <div className="fire-timeline-date">{item.date}</div>
                          <div className="fire-timeline-title">{item.title}</div>
                          <div className="fire-timeline-content">{item.content}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {doctorData.specializations.length > 0 && (
                  <div className="fire-section">
                    <div className="fire-section-header">
                      <div className="fire-section-icon"><FaBriefcaseMedical /></div>
                      <h3 className="fire-section-title">Specializations</h3>
                    </div>
                    <div className="fire-specializations-grid">
                      {doctorData.specializations.map((item, index) => (
                        <div className="fire-specialization-item" key={index}>
                          <div className="fire-specialization-title">{item.title}</div>
                          <div className="fire-specialization-desc">{item.content}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="fire-profile-sections">
              <div className="fire-section">
                <div className="fire-section-header">
                  <div className="fire-section-icon"><FaUserMd /></div>
                  <h3 className="fire-section-title">Profile Image</h3>
                </div>
                
                <div className="fire-image-upload-container">
                  <div className="fire-profile-image-edit" onClick={handleImageClick}>
                    <img 
                      src={
                        formData.avatar instanceof File
                          ? URL.createObjectURL(formData.avatar)
                          : (typeof formData.avatar === 'string' ? formData.avatar : defaultAvatar)
                      }
                      alt="Profile" 
                      className="fire-profile-avatar" 
                      onError={(e) => {e.target.src = defaultAvatar}}
                    />
                    <div className="fire-image-overlay">
                      <FaCamera className="fire-camera-icon" />
                      <span>Change Photo</span>
                    </div>
                  </div>
                  
                  <input 
                    type="file" 
                    ref={fileInputRef}
                    accept="image/*" 
                    style={{ display: 'none' }} 
                    onChange={handleFileSelect}
                  />
                  <p className="fire-image-upload-hint">Click on the image to upload a new profile photo</p>
                </div>
              </div>
              
              <div className="fire-section">
                <div className="fire-section-header">
                  <div className="fire-section-icon"><FaUserMd /></div>
                  <h3 className="fire-section-title">Basic Information</h3>
                </div>
                
                <div className="fire-form-group">
                  <label htmlFor="name">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    className="fire-form-control" 
                    value={formData.name} 
                    onChange={handleInputChange} 
                  />
                </div>
                
                <div className="fire-form-group">
                  <label htmlFor="username">Username</label>
                  <input 
                    type="text" 
                    id="username" 
                    name="username" 
                    className="fire-form-control" 
                    value={formData.username} 
                    onChange={handleInputChange} 
                    readOnly
                  />
                  <small className="fire-form-text">Username cannot be changed</small>
                </div>
                
                <div className="fire-form-group">
                  <label htmlFor="dob">Date of Birth</label>
                  <input 
                    type="date" 
                    id="dob" 
                    name="dob" 
                    className="fire-form-control" 
                    value={formData.dob} 
                    onChange={handleInputChange} 
                  />
                </div>
                
                <div className="fire-form-group">
                  <label htmlFor="gender">Gender</label>
                  <select 
                    id="gender" 
                    name="gender" 
                    className="fire-form-control" 
                    value={formData.gender} 
                    onChange={handleInputChange}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div className="fire-form-group">
                  <label htmlFor="title">Specialization</label>
                  <input 
                    type="text" 
                    id="title" 
                    name="title" 
                    className="fire-form-control" 
                    value={formData.title} 
                    onChange={handleInputChange} 
                  />
                </div>
                
                <div className="fire-form-group">
                  <label htmlFor="qualification">Qualification</label>
                  <input 
                    type="text" 
                    id="qualification" 
                    name="qualification" 
                    className="fire-form-control" 
                    value={formData.qualification} 
                    onChange={handleInputChange} 
                  />
                </div>
                
                <div className="fire-form-group">
                  <label htmlFor="medicalLicenseNumber">Medical License Number</label>
                  <input 
                    type="text" 
                    id="medicalLicenseNumber" 
                    name="medicalLicenseNumber" 
                    className="fire-form-control" 
                    value={formData.medicalLicenseNumber} 
                    onChange={handleInputChange} 
                  />
                </div>
                
                <div className="fire-form-group">
                  <label htmlFor="email">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    className="fire-form-control" 
                    value={formData.email} 
                    onChange={handleInputChange} 
                  />
                </div>
                
                <div className="fire-form-group">
                  <label htmlFor="phone">Phone</label>
                  <input 
                    type="text" 
                    id="phone" 
                    name="phone" 
                    className="fire-form-control" 
                    value={formData.phone} 
                    onChange={handleInputChange} 
                  />
                </div>

                <div className="fire-form-group">
                  <label htmlFor="prize">Prize</label>
                  <input
                    type="text"
                    id="prize"
                    name="prize"
                    value={formData.prize}
                    onChange={handleInputChange}
                    placeholder="Enter prize or awards"
                  />
                </div>

                <div className="fire-form-group">
                  <label htmlFor="address">Address</label>
                  <input 
                    type="text" 
                    id="address" 
                    name="address" 
                    className="fire-form-control" 
                    value={formData.address} 
                    onChange={handleInputChange} 
                  />
                </div>
              </div>
              
              <div className="fire-section">
                <div className="fire-section-header">
                  <div className="fire-section-icon"><FaUserMd /></div>
                  <h3 className="fire-section-title">About Me</h3>
                </div>
                
                <div className="fire-form-group">
                  <label htmlFor="bio">Bio</label>
                  <textarea 
                    id="bio" 
                    name="bio" 
                    className="fire-form-control" 
                    value={formData.bio} 
                    onChange={handleInputChange} 
                  />
                </div>
              </div>
              
              {/* Note: For simplicity, we're not implementing the edit functionality for arrays 
                  (education, experience, specializations) in this example */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;