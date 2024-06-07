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
      </div>
    </div>
  );
}

export default BookAppointment;
