import React from "react";
import Navbar from "../Components/Navbar";
import Hero from "../Components/Hero";
import Info from "../Components/Info";
import About from "../Components/About";
import BookAppointment from "../Components/BookAppointment";

import AppointmentDetails from "../Components/AppointmentDetails";

function Home() {
  return (
    <div className="home-section">
      <Navbar />
      <Hero />
      <Info />
      <About />
      <BookAppointment />
      <AppointmentDetails />
      {/* <Reviews /> */}
      {/* <Doctors /> */}
      {/*<Footer /> */}
    </div>
  );
}

export default Home;
