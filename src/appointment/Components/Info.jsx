import React from "react";
import InformationCard from "./InformationCard";
import {
  faCalendarCheck,
  faCamera,
  faListCheck
} from "@fortawesome/free-solid-svg-icons";
import "../Styles/Info.css";
import { useNavigate } from "react-router-dom";

function Info() {
  const navigate = useNavigate();

  const handleGalleryClick = () => {
    console.log("Gallery");
    navigate("/gallery");
  };

  const handleBookAppointmentClick = () => {
    console.log("Book Appointment");
    navigate("/appointment");
  };

  const handlenotesClick = () => {
    navigate("/notes");
  };
  return (
    <div className="info-section" id="projects">
      <div className="info-title-content">
        <h3 className="info-title">
          <span>Projects Done</span>
        </h3>

      </div>

      <div className="info-cards-content">
        <InformationCard
          title="Appointment management app"
          description=" Enabling medical practitioners to add and view appointments with their patients. Utilises form validation and database storage "
          icon={faCalendarCheck}
          text="Book Appointment"
          event={()=>handleBookAppointmentClick()}
        />

        <InformationCard
          title="MediCapture: A Patient Profile Gallery"
          description="
            Allows creation of profiles patients with
            personalized notes for each patient, and displays profiles in a clear grid format, utilising firebase.
            "
          icon={faCamera}
          text="Open Gallery"
          event={()=>handleGalleryClick()}
        />

        <InformationCard
          title="Note-Taker and Task Management App"
          description="Take note of important tasks and notes in a central and accessible location and mark completed tasks as done, utilising local storage"
          icon={faListCheck}
          text="View Notes"
          event={handlenotesClick}
        />
      </div>
    </div>
  );
}

export default Info;
