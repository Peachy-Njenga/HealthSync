import React from "react";
import InformationCard from "./InformationCard";
import {
  faCalendarCheck,
  faCamera,
  faListCheck
} from "@fortawesome/free-solid-svg-icons";
import "../Styles/Info.css";

function Info() {
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
    <div className="info-section" id="services">
      <div className="info-title-content">
        <h3 className="info-title">
          <span>Projects Done</span>
        </h3>
        <p className="info-description">
          Our bootcamp journey equipped us with valuable development skills,
          which we applied to three distinct projects. We built a booking appointment
          for on-demand doctor consultations, prescriptions, and notes. For
          doctors, we created MediCapture to streamline patient profiles and
          notes. Rounding out our projects, a task and note management app
          offers a central hub for daily organization.
        </p>
      </div>

      <div className="info-cards-content">
        <InformationCard
          title="Book Appointment"
          description=" Find your Doctor and make an Appointments.Talk to online doctors and get medical advice, online prescriptions,
            refills and medical notes within minutes. On-demand healthcare
            services at your fingertips."
          icon={faCalendarCheck}
          text="Book Appointment"
          event={handleBookAppointmentClick}
        />

        <InformationCard
          title="MediCapture"
          description=" Streamline patient management for doctors.
           It allows them to create profiles for their patients,
            including personalized notes. 
            The app then conveniently displays all these patient profiles in a clear grid format, 
            "
          icon={faCamera}
          text="Open Gallery"
          event={handleGalleryClick}
        />

        <InformationCard
          title="Manage notes and Tasks"
          description=" It allows you to create and manage both notes and tasks, keeping all your important information in a central and accessible location.Allows you to check tasks as done for a more effective day."
          icon={faListCheck}
          text="View Notes"
          event={handlenotesClick}
        />
      </div>
    </div>
  );
}

export default Info;
