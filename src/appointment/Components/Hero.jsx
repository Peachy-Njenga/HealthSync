import React, { useEffect, useState } from "react";
import Doctor from "../Assets/doctor-picture.jpeg";
import coding from "../Assets/CodingGif.gif";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "../Styles/Hero.css";
import woman from '../Assets/woman.png';


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
    <div className="">
      <section
        // id="hero"
        className="relative w-full h-[90vh] sm:h-screen text-white flex flex-col select-none bg-cover bg-center bg-no-repeat"

      >

        <div className="z-10 h-full flex flex-col items-center ">
          <div className="flex grow flex-col p-1 gap-3 md:gap-6 justify-center items-center  text-center max-w-[1400px] mx-auto">
            <h1 className="text-3xl md:text-5xl font-bold w-full">
              Empowering women in the tech space
            </h1>
            <a href="#about">
              <button className="mt-4 px-6 py-2 bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-600">
                Learn More
              </button>
            </a>
          </div>
        </div>
      </section>

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
