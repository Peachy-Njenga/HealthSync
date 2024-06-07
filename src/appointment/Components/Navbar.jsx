import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentDots,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import "../Styles/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import girlCode from "../Assets/girl-code.png";
import { LogIn } from "lucide-react";

function Navbar() {
  const [nav, setNav] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const navigate = useNavigate();

  const openNav = () => {
    setNav(!nav);
  };

  const handleNotesClick = () => {
    navigate("/notes");
  };

  const handleChatBtnClick = () => {
    if (!isButtonDisabled) {
      setIsButtonDisabled(true);
      navigate("/register");
      setTimeout(() => {
        setIsButtonDisabled(false);
      }, 1000); // Optionally disable button for a short duration to prevent rapid clicks
    }
  };

  return (
    <div className="flex h-20 justify-between p-2 items-center">
      <div className="h-full rounded-full bg-white">
        <img src={girlCode} alt="icon" className=" h-full"/>
      </div>
      {/* Desktop */}
      <ul className="navbar-items">
        <li>
          <Link to="/" className="text-white hover:text-blue-500 hover:border-b-2 transition duration-300 hover:border-blue-500 p-2 ">
            Home
          </Link>
        </li>
        <li>
          <a href="#about" className="text-white hover:text-blue-500 hover:border-b-2 transition duration-300 hover:border-blue-500 p-2 ">
            About
          </a>
        </li>
        <li>
          <a href="#projects" className="text-white hover:text-blue-500 hover:border-b-2 transition duration-300 hover:border-blue-500 p-2 ">
            Projects
          </a>
        </li>
        
      </ul>

      <button
        className=" bg-blue-500 w-fit h-fit p-3 rounded-2xl flex items-center gap-2 mr-4 border hover:border-blue-500 shadow-md hover:drop-shadow-lg hover:text-blue-500 hover:bg-white hover:scale-105 translate-x-1 transition duration-300  mb-3"
        type="button"
        disabled={isButtonDisabled}
        onClick={handleChatBtnClick}
      >
        <LogIn size={20} strokeWidth={1.75} />Log in
      </button>

     
    </div>
  );
}

export default Navbar;
