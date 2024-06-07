import React from "react";
import Navbar from "../Components/Navbar";
import Hero from "../Components/Hero";
import Info from "../Components/Info";
import About from "../Components/About";
import BookAppointment from "../Components/BookAppointment";
import woman from '../Assets/woman.png';

import AppointmentDetails from "../Components/AppointmentDetails";

function Home() {
  return (
    <div className="home-section">
      <div
        style={{
          backgroundImage: `url(${woman})`,
          backgroundRepeat: `no-repeat`,
          backgroundSize: `cover`

        }}
      >
        <div className="bg-black bg-opacity-60">

          <Navbar />
          <Hero />
        </div>
      </div>
      <About />
      <Info />
      {/* <BookAppointment /> */}
      {/* <AppointmentDetails /> */}
      {/* <Reviews /> */}
      {/* <Doctors /> */}
      {/*<Footer /> */}
    </div>
  );
}

export default Home;
