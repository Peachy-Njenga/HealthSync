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
            Four intense weeks immersed in a ladies' coding bootcamp equipped us
            with the fundamentals of programming. We tackled HTML, CSS, and
            React, gaining a strong foundation in web development. The
            curriculum wasn't all code, though. We delved into user
            authentication and API integrations, preparing us for the
            complexities of modern applications. To solidify our learnings, we
            capped off the program by developing our own projects, putting our
            newfound skills into practice. This experience, guided by industry
            professionals, was an invaluable springboard into the world of
            coding.
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
