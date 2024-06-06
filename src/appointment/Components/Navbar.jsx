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
      <div className="h-full ">
        <img src={girlCode} alt="icon" className=" h-full"/>
      </div>
      {/* Desktop */}
      <ul className="navbar-items">
        <li>
          <Link to="/" className="navbar-links">
            Home
          </Link>
        </li>
        <li>
          <a href="#about" className="navbar-links">
            About
          </a>
        </li>
        <li>
          <a href="#projects" className="navbar-links">
            Projects
          </a>
        </li>
        
      </ul>

      <button
        className=" bg-blue-500 w-fit h-fit p-3 rounded-lg flex items-center gap-2"
        type="button"
        disabled={isButtonDisabled}
        onClick={handleChatBtnClick}
      >
        <LogIn size={20} strokeWidth={1.75} />Log in
      </button>

      {/* Mobile */}
      <div className={`mobile-navbar ${nav ? "open-nav" : ""}`}>
        <div onClick={openNav} className="mobile-navbar-close">
          <FontAwesomeIcon icon={faXmark} className="hamb-icon" />
        </div>

        <ul className="mobile-navbar-links">
          <li>
            <Link onClick={openNav} to="/">
              Home
            </Link>
          </li>
          <li>
            <a onClick={openNav} href="#services">
              Services
            </a>
          </li>
          <li>
            <a onClick={openNav} href="#about">
              About
            </a>
          </li>
          <li>
            <a onClick={openNav} href="#contact">
              Contact
            </a>
          </li>
        </ul>
      </div>

      {/* Hamburger Icon */}
      <div className="mobile-nav">
        <FontAwesomeIcon
          icon={faBars}
          onClick={openNav}
          className="hamb-icon"
        />
      </div>
    </div>
  );
}

export default Navbar;
