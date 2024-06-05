import React from "react";
import { useLocation, Link } from "react-router-dom";
import "../Styles/AppointmentDetails.css";

function AppointmentDetails() {
  const location = useLocation();

  if (!location.state) {
    return <div>Appointment details not available</div>;
  }

  const {
    patientName,
    patientNumber,
    patientGender,
    appointmentTime,
    preferredMode,
  } = location.state;

  return (
    <div className="appointment-details-section">
      <h1 className="legal-siteTitle">
        <Link to="/">
          Health <span className="legal-siteSign">+</span>
        </Link>
      </h1>

      <div className="details-container">
        <h2 className="details-title">Appointment Details</h2>

        <div className="details-content">
          <p>Patient Name: {patientName}</p>
          <p>Patient Phone Number: {patientNumber}</p>
          <p>Patient Gender: {patientGender}</p>
          <p>Appointment Time: {new Date(appointmentTime).toLocaleString()}</p>
          <p>Preferred Mode: {preferredMode}</p>
        </div>

        {/* Button to view the appointment details */}
        <button className="view-appointment-btn">
          View Appointment Details
        </button>
      </div>
    </div>
  );
}

export default AppointmentDetails;
