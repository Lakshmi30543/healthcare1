import { Calendar, Clock, LayoutDashboard, Settings, UserCircle, Users } from 'lucide-react';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './styles/dsidebar.css';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      path: '/doctor/home',
      name: 'Home',
      icon: <LayoutDashboard size={20} />
    },
    {
      path: '/doctor/appointments',
      name: 'Appointments',
      icon: <Calendar size={20} />
    },
    {
      path: '/doctor/patients',
      name: 'Patients',
      icon: <Users size={20} />
    },
    {
      path: '/doctor/schedule',
      name: 'Schedule',
      icon: <Clock size={20} />
    },
    {
      path: '/doctor/profile',
      name: 'Profile',
      icon: <UserCircle size={20} />
    },
    {
      path: '/doctor/settings',
      name: 'Settings',
      icon: <Settings size={20} />
    }
  ];

  return (
    <div className="sidebar">
      {menuItems.map((item) => (
        <Link
          to={item.path}
          key={item.path}
          className={`sidebar-item ${location.pathname === item.path ? 'active' : ''}`}
        >
          <div className="sidebar-icon">{item.icon}</div>
          <span className="sidebar-text">{item.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
