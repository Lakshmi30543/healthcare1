import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { FaCalendarAlt, FaClock, FaFilter, FaUser, FaFileAlt } from 'react-icons/fa';
import { Modal, Button, Form } from 'react-bootstrap';
import config from '../../config';
import '../styles/dschedule.css';

const localizer = momentLocalizer(moment);

// Patient Prescription Report Modal Component
const PrescriptionReportModal = ({ show, handleClose, patientId, patientName }) => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (show && patientId) {
      fetchPatientPrescriptions();
    }
  }, [show, patientId]);

  const fetchPatientPrescriptions = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      console.log(`Fetching prescriptions for patient ID: ${patientId}`);
      const response = await axios.get(`${config.url}/eCare/prescriptions/patient/${patientId}`);
      console.log('Prescription history response:', response.data);
      
      setPrescriptions(response.data);
    } catch (error) {
      console.error('Error fetching patient prescriptions:', error);
      setError('Failed to load prescription history. Please try again later.');
      setPrescriptions([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Prescription History for {patientName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isLoading ? (
          <div className="text-center py-4">Loading prescriptions...</div>
        ) : error ? (
          <div className="alert alert-danger">{error}</div>
        ) : prescriptions.length === 0 ? (
          <div className="alert alert-info">No prescription history found for this patient.</div>
        ) : (
          <div className="prescription-history">
            {prescriptions.map((prescription, index) => (
              <div key={prescription.id} className="prescription-item mb-4 p-3 border rounded">
                <div className="d-flex justify-content-between">
                  <h5>Prescription #{prescription.id}</h5>
                  <small className="text-muted">
                    {moment(prescription.createdAt).format('MMMM D, YYYY [at] h:mm A')}
                  </small>
                </div>
                <div className="prescription-content mt-2">
                  <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>
                    {prescription.prescriptionText}
                  </pre>
                </div>
                <div className="prescription-doctor mt-2 text-muted">
                  <small>Prescribed by: Dr. {prescription.doctorName || 'Unknown'}</small>
                </div>
              </div>
            ))}
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const PrescriptionModal = ({ show, handleClose, appointment }) => {
  const [prescriptionText, setPrescriptionText] = useState('');
  const [medicalIssue, setMedicalIssue] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [debugInfo, setDebugInfo] = useState(null);

  useEffect(() => {
    if (appointment) {
      console.log('Appointment data:', appointment);
      console.log('Patient data:', appointment.patient);

      setDebugInfo({
        appointmentId: appointment.id,
        doctorId: sessionStorage.getItem('userId'),
        patientId: appointment.patient?.id,
        patientFromAppointment: !!appointment.patient,
      });
    }
  }, [appointment]);

  const handleSubmit = async () => {
    try {
      setIsSending(true);

      const doctorId = sessionStorage.getItem('userId');

      // Create payload with all new fields
      const payload = {
        appointmentId: parseInt(appointment.id, 10),
        doctorId: parseInt(doctorId, 10),
        patientId: parseInt(appointment.patient?.id || appointment.patientId, 10),
        medicalIssue,
        diagnosis,
        prescriptionText,
      };

      console.log('Sending prescription request:', payload);

      const response = await axios.post(`${config.url}/eCare/prescriptions/create`, payload);

      console.log('Prescription response:', response.data);
      handleClose();
      alert('Prescription saved and sent to patient successfully!');
    } catch (error) {
      console.error('Error saving prescription:', error);
      alert(`Failed to save prescription: ${error.response?.data || error.message}`);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Create Prescription</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* Patient info */}
          <Form.Group className="mb-3">
            <Form.Label>Prescription for {appointment.patient?.fullName || appointment.patientName}</Form.Label>
          </Form.Group>

          {/* Medical Issue */}
          <Form.Group className="mb-3">
            <Form.Label>Medical Issue</Form.Label>
            <Form.Control
              type="text"
              value={medicalIssue}
              onChange={(e) => setMedicalIssue(e.target.value)}
              placeholder="Enter patient's medical issue"
            />
          </Form.Group>

          {/* Diagnosis */}
          <Form.Group className="mb-3">
            <Form.Label>Diagnosis</Form.Label>
            <Form.Control
              type="text"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              placeholder="Enter diagnosis details"
            />
          </Form.Group>

          {/* Prescription Text */}
          <Form.Group className="mb-3">
            <Form.Label>Prescription</Form.Label>
            <Form.Control
              as="textarea"
              rows={8}
              value={prescriptionText}
              onChange={(e) => setPrescriptionText(e.target.value)}
              placeholder="Enter medicines, dosage, and instructions..."
            />
          </Form.Group>

          {/* Debug (optional) */}
          {process.env.NODE_ENV === 'development' && debugInfo && (
            <div style={{ marginTop: '20px', padding: '10px', background: '#f8f9fa', borderRadius: '5px' }}>
              <h6>Debug Information:</h6>
              <pre style={{ fontSize: '12px' }}>{JSON.stringify(debugInfo, null, 2)}</pre>
            </div>
          )}
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={isSending || !prescriptionText.trim() || !diagnosis.trim() || !medicalIssue.trim()}
        >
          {isSending ? 'Saving...' : 'Save & Send'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

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
  const [dayAppointments, setDayAppointments] = useState([]);
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  // New state for the report modal
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportPatientId, setReportPatientId] = useState(null);
  const [reportPatientName, setReportPatientName] = useState('');

  useEffect(() => {
    fetchAppointmentsForMonth();
  }, []);

  const fetchAppointmentsForMonth = async () => {
    try {
      setIsLoading(true);
      const doctorId = sessionStorage.getItem('userId');
      const response = await axios.get(`${config.url}/eCare/doctor/appointments/${doctorId}`);
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
          reason: apt.reason,
          patient: apt.patient
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

  const fetchAppointmentsByDate = async (date) => {
    try {
      setIsLoading(true);
      const doctorId = sessionStorage.getItem('userId');
      const formattedDate = moment(date).format('YYYY-MM-DD');
      const response = await axios.get(`${config.url}/eCare/doctor/appointments/bydate/${formattedDate}?doctorId=${doctorId}`);
      const formattedDayAppointments = response.data.map(apt => ({
        ...apt,
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

  const handleSelectSlot = (slotInfo) => {
    setSelectedDate(slotInfo.start);
    fetchAppointmentsByDate(slotInfo.start);
  };

  const handleSelectEvent = (event) => {
    setSelectedDate(event.start);
    fetchAppointmentsByDate(event.start);
  };

  const getDayAppointments = () => {
    if (filter === 'ALL') return dayAppointments;
    return dayAppointments.filter(apt => apt.status === filter);
  };

  const handleStatusChange = async (appointmentId, newStatus) => {
    try {
      await axios.put(`${config.url}/eCare/appointments/${appointmentId}/status`, {
        status: newStatus
      });
      await fetchAppointmentsForMonth();
    } catch (error) {
      console.error('Error updating appointment status:', error);
    }
  };

  const handlePrescriptionClick = (apt) => {
    setSelectedAppointment(apt);
    setShowPrescriptionModal(true);
  };

  // New handler for Report button click
  const handleReportClick = (apt) => {
    const patientId = apt.patient?.id || apt.patientId;
    const patientName = apt.patient?.fullName || apt.patientName;
    
    if (!patientId) {
      alert('Patient information not available');
      return;
    }
    
    setReportPatientId(patientId);
    setReportPatientName(patientName);
    setShowReportModal(true);
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
          <h2>Schedule Dashboard</h2>
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
                getDayAppointments().map((apt, idx) => (
                  <div key={apt.id} className="musk-appointment-card">
                    <div className="musk-appointment-card-content">
                      <div className="musk-appointment-info">
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
                          <button
                            className="musk-join-btn"
                            onClick={() => window.open(`https://meet.jit.si/eCareRoom-${apt.id}`, '_blank')}
                          >
                            Join
                          </button>
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
                      <div className="musk-consultation-row">
                        <label htmlFor={`status-${apt.id}`} className="musk-consultation-label">Consultation Status:</label>
                        <select
                          id={`status-${apt.id}`}
                          className="musk-consultation-select"
                          value={apt.consultationStatus || 'NOT_COMPLETED'}
                          onChange={(e) => {
                            const updatedStatus = e.target.value;
                            setDayAppointments(prev =>
                              prev.map(item =>
                                item.id === apt.id ? { ...item, consultationStatus: updatedStatus } : item
                              )
                            );
                          }}
                        >
                          <option value="NOT_COMPLETED">Not Completed</option>
                          <option value="COMPLETED">Completed</option>
                        </select>
                        <button
                          className="musk-report-btn"
                          disabled={apt.consultationStatus !== 'COMPLETED'}
                          onClick={() => handlePrescriptionClick(apt)}
                        >
                          Prescription
                        </button>
                      </div>
                      
                      {/* New Report Button */}
                      <div className="musk-report-history-row">
                        <button
                          className="musk-history-btn"
                          onClick={() => handleReportClick(apt)}
                        >
                          <FaFileAlt /> View Patient Report
                        </button>
                      </div>
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

      {showPrescriptionModal && selectedAppointment && (
        <PrescriptionModal
          show={showPrescriptionModal}
          handleClose={() => setShowPrescriptionModal(false)}
          appointment={selectedAppointment}
        />
      )}

      {/* New Patient Prescription Report Modal */}
      {showReportModal && (
        <PrescriptionReportModal
          show={showReportModal}
          handleClose={() => setShowReportModal(false)}
          patientId={reportPatientId}
          patientName={reportPatientName}
        />
      )}
    </div>
  );
};

export default Schedule;