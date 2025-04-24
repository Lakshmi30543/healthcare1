import { Activity, Award, Calendar, ChevronRight, Clock, Mail, MapPin, Phone, Users } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { ChevronLeft } from 'react-feather';
import './styles/ddashboard.css';
import axios from 'axios';
import config from '../config';

const defaultImages = [
  "https://plus.unsplash.com/premium_photo-1661764878654-3d0fc2eefcca?q=80&w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?q=80&w=500&auto=format&fit=crop"
];

const defaultNews = [
  {
    title: "New Breakthrough in Medical Research",
    content: "Scientists have discovered a revolutionary approach to treating chronic diseases using AI-powered diagnostics and personalized medicine protocols.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500",
    category: "Research"
  },
  {
    title: "Mental Health Awareness Month",
    content: "Healthcare providers worldwide are focusing on mental health awareness and providing better access to psychological support services.",
    image: "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=500",
    category: "Mental Health"
  },
  {
    title: "Advances in Telemedicine",
    content: "Virtual healthcare solutions are transforming patient care with new technologies enabling remote diagnostics and treatment monitoring.",
    image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=500",
    category: "Technology"
  }
];

const DoctorHome = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [weatherData, setWeatherData] = useState({
    temp: '',
    city: 'Mumbai',
    country: 'IN'
  });
  const [healthNews, setHealthNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  // Initial state with empty values
  const [doctorData, setDoctorData] = useState({
    fullName: '',
    username: '',
    dob: '',
    email: '',
    contact: '',
    gender: '',
    specialization: '',
    qualification: '',
    experienceYears: 0,
    medicalLicenseNumber: '',
    status: '',
    address: ''
  });
  
  const [stats, setStats] = useState({
    totalPatients: 0,
    appointments: 0,
    activePatients: 0
  });

  // Fetch doctor data from backend
  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        // Get doctor ID from localStorage or context
        const doctorId = sessionStorage.getItem('userId');
        
        const response = await axios.get(`${config.url}/eCare/doctor/${doctorId}`);
        
        if (response.data) {
          setDoctorData({
            fullName: response.data.fullName || '',
            username: response.data.username || '',
            dob: response.data.dob || '',
            email: response.data.email || '',
            contact: response.data.contact || '',
            gender: response.data.gender || '',
            specialization: response.data.specialization || '',
            qualification: response.data.qualification || '',
            experienceYears: response.data.experienceYears || 0,
            medicalLicenseNumber: response.data.medicalLicenseNumber || '',
            status: response.data.status || 'Available',
            address: response.data.address || 'Mumbai'
          });
          
          // Fetch stats data
          setStats({
            totalPatients: response.data.totalPatients || 0,
            appointments: response.data.todayAppointments || 0,
            activePatients: response.data.activePatients || 0
          });
        }
      } catch (error) {
        console.error('Error fetching doctor data:', error);
        // Keep empty data on error
      }
    };

    fetchDoctorData();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const getWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Mumbai&units=metric&appid=8e2c44f2d8a3f3d2c52e9fb34ef99584`
        );
        const data = await response.json();
        setWeatherData({
          temp: Math.round(data.main.temp),
          city: data.name,
          country: data.sys.country
        });
      } catch (error) {
        console.error('Weather API Error:', error);
      }
    };

    getWeather();
  }, []);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          'https://gnews.io/api/v4/search?q=healthcare%20AND%20medical&lang=en&country=us&max=3&apikey=9d5b6c5ed2c3d0d9c5e8e6f4c2b8a7d1'
        );
        
        if (!response.ok) {
          throw new Error('News API response was not ok');
        }

        const data = await response.json();
        
        if (data.articles) {
          const formattedNews = data.articles.map(article => ({
            title: article.title,
            description: article.description,
            url: article.url,
            image: article.image,
            source: { name: article.source.name },
            publishedAt: article.publishedAt
          }));
          setHealthNews(formattedNews);
        }
      } catch (error) {
        console.error('News API Error:', error);
        // Fallback news if API fails
        setHealthNews([
          {
            title: "Advancements in Healthcare Technology",
            description: "New developments in medical technology are revolutionizing patient care.",
            source: { name: "Medical Journal" },
            publishedAt: new Date().toISOString(),
            image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&q=80",
            url: "#"
          },
          {
            title: "Mental Health in Modern Medicine",
            description: "Healthcare providers focus on integrated mental health approaches.",
            source: { name: "Health Today" },
            publishedAt: new Date().toISOString(),
            image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=500&q=80",
            url: "#"
          },
          {
            title: "Preventive Healthcare Measures",
            description: "Studies show importance of preventive care in long-term health outcomes.",
            source: { name: "Healthcare Weekly" },
            publishedAt: new Date().toISOString(),
            image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=500&q=80",
            url: "#"
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  const formatDate = (date) => {
    const options = { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  };

  const handleNextNews = () => {
    setCurrentNewsIndex((prev) => (prev + 1) % defaultNews.length);
  };

  const handlePrevNews = () => {
    setCurrentNewsIndex((prev) => (prev - 1 + defaultNews.length) % defaultNews.length);
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      handleNextNews();
    }
    if (touchStart - touchEnd < -75) {
      handlePrevNews();
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <header className="dashboard-header">
          <div>
            <h1>Welcome back, {doctorData.fullName.split(' ')[1] || 'Doctor'}! 👋</h1>
            <p className="date">{formatDate(currentDate)}</p>
          </div>
          {/* <div className="header-profile">
            <div className="weather">
              <span>🌤️ {weatherData.temp ? `${weatherData.temp}°C` : '24°C'}</span>
              <p>{weatherData.city}, {weatherData.country}</p>
            </div>
          </div> */}
        </header>

        <div className="top-grid">
          <div className="left-column">
          <div className="doctor-profile-container">
            <div className="doctor-info">
              <h2 className="doctor-name">{doctorData.fullName}</h2>
              <p className="doctor-speciality">{doctorData.specialization}</p>
              
              <div className="doctor-stats">
                <div className="stat-item">
                  <Award size={18} color="#29cabb" />
                  <span>{doctorData.experienceYears}+ Years Experience</span>
                </div>
                <div className="stat-item">
                  <Clock size={18} color="#29cabb" />
                  <span>Mon - Fri, 9AM - 5PM</span>
                </div>
              </div>
              
              <div className="doctor-contact">
                <div className="contact-item">
                  <Mail size={16} />
                  <span>{doctorData.email}</span>
                </div>
                <div className="contact-item">
                  <Phone size={16} />
                  <span>{doctorData.contact}</span>
                </div>
                <div className="contact-item">
                  <MapPin size={16} />
                  <span>{doctorData.address}</span>
                </div>
              </div>
              
              <span className="status-badge">{doctorData.status}</span>
            </div>
            
            <div className="doctor-image-container">
              <img 
                src="/src/assets/images/doctor.png"
                alt={doctorData.fullName}
                className="doctor-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/src/assets/images/doctor.png";
                }}
              />
            </div>
          </div>
            
            <div className="stats-container">
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon">
                    <Users size={22} />
                  </div>
                  <div className="stat-info">
                    <h3>Total Patients</h3>
                    <p className="stat-number">{stats.totalPatients}</p>
                    <span className="stat-detail">↑ 12% this week</span>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon">
                    <Calendar size={22} />
                  </div>
                  <div className="stat-info">
                    <h3>Appointments</h3>
                    <p className="stat-number">{stats.appointments}</p>
                    <span className="stat-detail">Today</span>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon">
                    <Activity size={22} />
                  </div>
                  <div className="stat-info">
                    <h3>Active Patients</h3>
                    <p className="stat-number">{stats.activePatients}</p>
                    <span className="stat-detail">In Treatment</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="calendar-section">
            <div className="section-header">
              <h2>Calendar</h2>
              <button className="view-all">View Calendar <ChevronRight size={16} /></button>
            </div>
            <div className="calendar-container">
              <div className="calendar-header">
                <h3>March 2024</h3>
              </div>
              <div className="calendar-weekdays">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
                  <div key={day} className="weekday">{day}</div>
                ))}
              </div>
              <div className="calendar-days">
                {Array.from({ length: 31 }, (_, i) => {
                  const day = i + 1;
                  const hasEvent = [5, 12, 15, 25].includes(day);
                  return (
                    <div 
                      key={i} 
                      className={`calendar-day ${day === 25 ? 'today' : ''} ${hasEvent ? 'has-event' : ''}`}
                    >
                      {day}
                      {hasEvent && <span className="event-dot"></span>}
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="upcoming-meetings">
              <h3>Upcoming Meetings</h3>
              <div className="meeting-list">
                <div className="meeting-card">
                  <div className="meeting-date">
                    <span className="meeting-day">05</span>
                    <span className="meeting-month">MAR</span>
                  </div>
                  <div className="meeting-info">
                    <h4>Department Meeting</h4>
                    <p>9:00 AM - 10:30 AM</p>
                    <span className="meeting-type">Virtual</span>
                  </div>
                </div>
                
                <div className="meeting-card">
                  <div className="meeting-date">
                    <span className="meeting-day">12</span>
                    <span className="meeting-month">MAR</span>
                  </div>
                  <div className="meeting-info">
                    <h4>Patient Review Conference</h4>
                    <p>2:00 PM - 3:30 PM</p>
                    <span className="meeting-type">In Person</span>
                  </div>
                </div>
                

                
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="appointments-section">
            <div className="section-header">
              <h2>Today's Appointments</h2>
              <button className="view-all">View All <ChevronRight size={16} /></button>
            </div>
            <div className="appointment-list">
              {[
                { time: '09:00 AM', patient: 'Sarah Johnson', type: 'Follow-up', status: 'Upcoming' },
                { time: '10:30 AM', patient: 'Mike Peters', type: 'New Patient', status: 'Confirmed' },
                { time: '11:45 AM', patient: 'Emma Wilson', type: 'Consultation', status: 'Waiting' },
                { time: '02:15 PM', patient: 'James Brown', type: 'Review', status: 'Completed' },
              ].map((apt, index) => (
                <div key={index} className="appointment-card">
                  <div className="appointment-left">
                    <div className="time"><Clock size={16} /> {apt.time}</div>
                    <div className="appointment-details">
                      <div className="patient-name">{apt.patient}</div>
                      <div className="appointment-type">{apt.type}</div>
                    </div>
                  </div>
                  <span className={`appointment-status ${apt.status.toLowerCase()}`}>
                    {apt.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid-item">
          <div className="dashboard-card">
            <div className="card-header">
              <h2>Patient Health Metrics</h2>
            </div>
            <div className="health-metrics-list">
              {healthMetrics.map((metric, index) => (
                <div key={index} className="metric-card">
                  <div className="metric-icon">
                    {metric.icon}
                  </div>
                  <div className="metric-details">
                    <h3>{metric.name}</h3>
                    <p className="metric-value">{metric.value}</p>
                  </div>
                  <span className={`metric-status ${metric.status}`}>{metric.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

          <div className="news-section">
            <div className="section-header">
              <h2>Health News</h2>
              <div className="news-navigation">
                <button onClick={handlePrevNews} className="nav-button">
                  <ChevronLeft size={20} />
                </button>
                <button onClick={handleNextNews} className="nav-button">
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
            
            <div 
              className="news-card-container"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div className="news-card" style={{ transform: `translateX(-${currentNewsIndex * 100}%)` }}>
                {defaultNews.map((news, index) => (
                  <div key={index} className="news-item">
                    <div className="news-image">
                      <img src={news.image} alt={news.title} loading="lazy" />
                      <span className="news-category">{news.category}</span>
                    </div>
                    <div className="news-content">
                      <h3>{news.title}</h3>
                      <p>{news.content}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="news-dots">
                {defaultNews.map((_, index) => (
                  <span 
                    key={index} 
                    className={`dot ${currentNewsIndex === index ? 'active' : ''}`}
                    onClick={() => setCurrentNewsIndex(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorHome;


const healthMetrics = [
  {
    name: 'Blood Pressure',
    value: '120/80 mmHg',
    status: 'normal',
    icon: <Activity size={20} color="#29cabb" />
  },
  {
    name: 'Heart Rate',
    value: '72 bpm',
    status: 'normal',
    icon: <Activity size={20} color="#29cabb" />
  },
  {
    name: 'Blood Sugar',
    value: '90 mg/dL',
    status: 'warning',
    icon: <Activity size={20} color="#29cabb" />
  },
  {
    name: 'Oxygen Level',
    value: '98%',
    status: 'normal',
    icon: <Activity size={20} color="#29cabb" />
  }
];

