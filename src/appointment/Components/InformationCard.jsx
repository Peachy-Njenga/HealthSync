import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function InformationCard(props) {
  return (
    <div className="info-cards hover:scale-105 hover:bg-blue-50 transition duration-300">
      <span className="info-card-icon">
        <FontAwesomeIcon className="info-fa-icon" icon={props.icon} />
      </span>
      <div className="flex flex-col justify-between h-full items-center">
        <p className="info-card-title">{props.title}</p>
        <p className="info-card-description">{props.description}</p>
        <button onClick={props.event} className="bg-white border border-blue-500 shadow-lg hover:bg-blue-400 hover:scale-105 translate-x-1 transition duration-300 rounded-full w-fit mb-3 p-2">{props.text}</button>
      </div>
    </div>
  );
}

export default InformationCard;
