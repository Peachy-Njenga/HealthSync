import React from "react";
import Doctor from "../Assets/doctor-book-appointment.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCalendarCheck,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "../Styles/BookAppointment.css";

function BookAppointment() {
  const navigate = useNavigate();

  const handleBookAppointmentClick = () => {
    const userData = localStorage.getItem("user");

    if (!userData) {
      alert("Kindly create an account before booking an appointment.");
      // Redirect the user to the registration page or another appropriate page
      // You can use react-router-dom's useHistory hook for navigation
    } else {
      navigate("/appointment");
    }
  };

  return (
    <div className="ba-section">
      <div className="ba-image-content">
        <img src={Doctor} alt="Doctor Group" className="ba-image1" />
      </div>

      <div className="ba-text-content">
        <h3 className="ba-title">
          <span>Why Choose Health</span>
        </h3>
        <p className="ba-description">
          Discover the reasons to choose Health Plus for your healthcare needs.
          Experience expert care, convenience, and personalized solutions,
          making your well-being our top priority. Join us on a journey to
          better health and a happier life.
        </p>

        <p className="ba-checks ba-check-first">
          <FontAwesomeIcon icon={faCircleCheck} style={{ color: "#1E8FFD" }} />{" "}
          Best Professional Doctors
        </p>
        <p className="ba-checks">
          <FontAwesomeIcon icon={faCircleCheck} style={{ color: "#1E8FFD" }} />{" "}
          Emergency Care
        </p>
        <p className="ba-checks">
          <FontAwesomeIcon icon={faCircleCheck} style={{ color: "#1E8FFD" }} />{" "}
          24/7 Support Live Chat
        </p>
        <p className="ba-checks ba-check-last">
          <FontAwesomeIcon icon={faCircleCheck} style={{ color: "#1E8FFD" }} />{" "}
          Enrollment Easy and Quick
        </p>

        <button
          className="text-appointment-btn"
          type="button"
          onClick={handleBookAppointmentClick}
        >
          <FontAwesomeIcon icon={faCalendarCheck} /> Book Appointment
        </button>
      </div>
    </div>
  );
}

export default BookAppointment;
