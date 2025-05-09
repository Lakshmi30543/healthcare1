import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../styles/dschedule.css';
import config from '../../config';
import { FaCalendarAlt, FaClock, FaUser, FaCheckCircle, FaTimesCircle, FaFilter } from 'react-icons/fa';
import { Activity, Clock, Users } from 'lucide-react';

const localizer = momentLocalizer(moment);

const Schedule = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    confirmed: 0,
    cancelled: 0
  });

  useEffect(() => {
    fetchAppointmentsForMonth();
  }, []);

  // Fetch all appointments for the calendar (month view)
  const fetchAppointmentsForMonth = async () => {
    try {
      setIsLoading(true);
      const doctorId = sessionStorage.getItem('userId');
      const response = await axios.get(`${config.url}/eCare/appointments/doctor/${doctorId}`);
      const formattedAppointments = response.data.map(apt => {
        const startDateTime = moment(`${apt.appointmentDate} ${apt.appointmentTime}`, "YYYY-MM-DD hh:mm A").toDate();
        const endDateTime = moment(startDateTime).add(30, 'minutes').toDate();
        return {
          id: apt.id,
          title: `${apt.patientName} (${apt.appointmentTime}) - ${apt.status}`,
          start: startDateTime,
          end: endDateTime,
          patientName: apt.patientName,
          status: apt.status || 'PENDING',
          time: apt.appointmentTime,
          reason: apt.reason
        };
      });
      setAppointments(formattedAppointments);
      setStats({
        total: formattedAppointments.length,
        pending: formattedAppointments.filter(apt => apt.status === 'PENDING').length,
        confirmed: formattedAppointments.filter(apt => apt.status === 'CONFIRMED').length,
        cancelled: formattedAppointments.filter(apt => apt.status === 'CANCELLED').length
      });
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch appointments for a specific date for the right panel
  const [dayAppointments, setDayAppointments] = useState([]);
  const fetchAppointmentsByDate = async (date) => {
    try {
      setIsLoading(true);
      const doctorId = sessionStorage.getItem('userId');
      const formattedDate = moment(date).format('YYYY-MM-DD');
      const response = await axios.get(`${config.url}/eCare/doctor/appointments/bydate/${formattedDate}?doctorId=${doctorId}`);
      const formattedDayAppointments = response.data.map(apt => ({
        ...apt, // <-- keep all properties, including patient
        title: `${apt.patient?.fullName || ''} (${apt.appointmentTime}) - ${apt.status}`,
        start: moment(`${apt.appointmentDate} ${apt.appointmentTime}`, "YYYY-MM-DD HH:mm:ss").toDate(),
        end: moment(`${apt.appointmentDate} ${apt.appointmentTime}`, "YYYY-MM-DD HH:mm:ss").add(30, 'minutes').toDate(),
      }));
      setDayAppointments(formattedDayAppointments);
    } catch (error) {
      console.error('Error fetching day appointments:', error);
      setDayAppointments([]);
    } finally {
      setIsLoading(false);
    }
  };

  // When a day is selected, fetch appointments for that day
  const handleSelectSlot = (slotInfo) => {
    setSelectedDate(slotInfo.start);
    fetchAppointmentsByDate(slotInfo.start);
  };
  const handleSelectEvent = (event) => {
    setSelectedDate(event.start);
    fetchAppointmentsByDate(event.start);
  };

  // Filter day appointments by status
  const getDayAppointments = () => {
    if (filter === 'ALL') return dayAppointments;
    return dayAppointments.filter(apt => apt.status === filter);
  };

  const handleStatusChange = async (appointmentId, newStatus) => {
    try {
      await axios.put(`${config.url}/eCare/appointments/${appointmentId}/status`, {
        status: newStatus
      });
      await fetchAppointments();
    } catch (error) {
      console.error('Error updating appointment status:', error);
    }
  };

  const eventStyleGetter = (event) => {
    let style = {
      backgroundColor: '#29cabb',
      borderRadius: '5px',
      opacity: 0.8,
      color: 'white',
      border: '0px',
      display: 'block'
    };

    switch (event.status) {
      case 'CONFIRMED':
        style.backgroundColor = '#28a745';
        break;
      case 'CANCELLED':
        style.backgroundColor = '#dc3545';
        break;
      default:
        style.backgroundColor = '#ffc107';
    }

    return { style };
  };

  if (isLoading) {
    return <div className="musk-schedule-loading">Loading schedule...</div>;
  }

  return (
    <div className="musk-schedule-container">
      <div className="musk-schedule-content">
      <div className="musk-header-title">
            <h2> Schedule Dashboard</h2>
          </div>
        <div className="musk-schedule-header">
          <p className="musk-current-date">{moment().format('dddd, MMMM D, YYYY')}</p>
        </div>
        
        <div className="musk-schedule-layout">
          <div className="musk-calendar-section">
            <Calendar
              localizer={localizer}
              events={appointments}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 450 }}
              onSelectSlot={handleSelectSlot}
              onSelectEvent={handleSelectEvent}
              selectable
              eventPropGetter={eventStyleGetter}
              views={['month']}
              defaultView="month"
            />
          </div>
          
          <div className="musk-appointments-section">
            <div className="musk-appointments-header">
              <h2>
                <FaClock /> {moment(selectedDate).format('MMMM D, YYYY')}
              </h2>
              <div className="musk-filter">
                <FaFilter />
                <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                  <option value="ALL">All</option>
                  <option value="PENDING">Pending</option>
                  <option value="CONFIRMED">Confirmed</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
              </div>
            </div>
            
            <div className="musk-appointments-list">
              {getDayAppointments().length > 0 ? (
                getDayAppointments().map(apt => (
                  <div key={apt.id} className="musk-appointment-card">
                    <div className="musk-appointment-card-content">
                      <div className="musk-appointment-patient">
                        {apt.patient?.profilePictureUrl && (
                          <img
                            src={apt.patient.profilePictureUrl}
                            alt={apt.patient?.fullName || "Profile"}
                            className="musk-patient-avatar"
                          />
                        )}
                        <FaUser className="musk-patient-icon" />
                        <span className="musk-patient-name">
                          {apt.patient?.fullName || apt.patientName}
                        </span>
                      </div>
                      <div className="musk-appointment-datetime">
                        <span className="musk-appointment-date">
                          <FaCalendarAlt /> {apt.appointmentDate || moment(apt.start).format('YYYY-MM-DD')}
                        </span>
                        <span className="musk-appointment-time">
                          <FaClock /> {apt.appointmentTime || apt.time}
                        </span>
                      </div>
                    </div>
                    <div className="musk-appointment-actions">
                      <button
                        className="musk-join-btn"
                        onClick={() => window.open(`https://meet.jit.si/eCareRoom-${apt.id}`, '_blank')}
                      >
                        Join
                      </button>

                    </div>
                  </div>
                ))
              ) : (
                <div className="musk-no-appointments">
                  No appointments scheduled for this date
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;