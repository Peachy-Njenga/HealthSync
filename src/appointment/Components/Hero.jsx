import React, { useEffect, useState } from "react";
import Doctor from "../Assets/doctor-picture.jpeg";
import coding from "../Assets/CodingGif.gif";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "../Styles/Hero.css";

function Hero() {
  const navigate = useNavigate();
  const [goUp, setGoUp] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBookAppointmentClick = () => {
    navigate("/appointment");
  };

  useEffect(() => {
    const onPageScroll = () => {
      if (window.scrollY > 600) {
        setGoUp(true);
      } else {
        setGoUp(false);
      }
    };
    window.addEventListener("scroll", onPageScroll);

    return () => {
      window.removeEventListener("scroll", onPageScroll);
    };
  }, []);

  return (
    <div className="bg-black">
      <div className="hero-section bg-gradient-to-r from-white to-[#0A1818] to-60%">
        <div className="text-section">
          <p className="text-headline">❤️ Ladies in Coding</p>
          <h2 className="">Ladies in Coding Bootcamp</h2>
          <p className="text-descritpion">
            
          </p>
          {/* <button
            className="text-appointment-btn"
            type="button"
            onClick={handleBookAppointmentClick}
          >
            <FontAwesomeIcon icon={faCalendarCheck} /> Book Appointment
          </button> */}
          <div className="text-stats">
            <div className="text-stats-container">
              {/*<p>145k+</p> */}
              {/*<p>Receive Patients</p>*/}
            </div>

            <div className="text-stats-container">
              {/*<p>50+</p>*/}
              {/*<p>Expert Doctors</p>*/}
            </div>

            <div className="text-stats-container">
              {/*<p>10+</p>*/}
              {/*<p>Years of Experience</p>*/}
            </div>
          </div>
        </div>

        <div className="hero-image-section">
          <img className="hero-image1" src={coding} alt="Doctor" />
        </div>
      </div>

      <div
        onClick={scrollToTop}
        className={`scroll-up ${goUp ? "show-scroll" : ""}`}
      >
        <FontAwesomeIcon icon={faAngleUp} />
      </div>
    </div>
  );
}

export default Hero;
