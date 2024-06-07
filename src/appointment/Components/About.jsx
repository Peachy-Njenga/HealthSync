import React from "react";
import Doctor from "../Assets/doctor-group.jpeg";
import SolutionStep from "./SolutionStep";
import "../Styles/About.css";
import training from '../Assets/training.png';
import html from '../Assets/html.png';
import tailwind from '../Assets/tailwind.png';
import js from '../Assets/js.png';
import react from '../Assets/react.png';
import firebase from '../Assets/firebase.png';
import auth0 from '../Assets/auth0.png';
import { Handshake, Server, SquareCode } from "lucide-react";
import useEmblaCarousel from 'embla-carousel-react'
import AutoScroll from "embla-carousel-auto-scroll";

function About() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [AutoScroll()]);

  return (

    <div className="py-5 px-10" id="about">
      <div className="flex justify-center pb-3">
      </div>

      <div className="flex gap-20 mt-5">
        <div>
          <img src={training} alt="Training" />
        </div>

        <div className="flex flex-col gap-4">
          <span className=" info-title">About The Program</span>
          <p className="text-3xl font-semibold">An Intensive 4 Week Introduction to Web Development</p>

          <p className="text-gray-700 font-semibold">This is an immersive bootcamp organised by Palladium to empower ladies with various skills in the tech space:</p>

          <div className="flex flex-col gap-10 mt-5">
            <div className="flex gap-2 items-center">
              <div className="bg-blue-300 p-2 rounded-full">
                <SquareCode size={20} strokeWidth={1.5} />
              </div>
              <p>Basic Programming skills in Frontend Development: HTML, CSS, Javascript and React</p>
            </div>
            <div className="flex gap-2 items-center">
              <div className="bg-blue-300 p-2 rounded-full">
                <Server size={20} strokeWidth={1.5} />
              </div>
              <p>Use of Storage APIs and authentication using Auth0</p>
            </div>
            <div className="flex gap-2 items-center">
              <div className="bg-blue-300 p-2 rounded-full">
                <Handshake size={20} strokeWidth={1.5} />
              </div>
              <p>Problem solving skills, teamwork and collaboration</p>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-10">
        <div className="flex justify-center mt-10">
          <span className=" info-title ">What was covered </span>
        </div>
        <div className="embla p-5  " ref={emblaRef}>
          <div className="embla__container flex gap-10 items-center">
            <img className="embla__slide h-12 w-4" src={html} alt="" />
            <img className="embla__slide" src={tailwind} alt="" />
            <img className="embla__slide h-16 w-3" src={js} alt="" />
            <img className="embla__slide h-16 w-10" src={react} alt="" />
            <img className="embla__slide" src={firebase} alt="" />
            <img className="embla__slide" src={auth0} alt="" />
          </div>
        </div>
      </div>
    </div>

  );
}

export default About;
