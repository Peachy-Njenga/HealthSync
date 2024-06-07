import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/AppointmentForm.css";
import { ToastContainer, toast } from "react-toastify";
import girlCode from '../Assets/girl-code.png'


function AppointmentForm() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  const [patientName, setPatientName] = useState("");
  const [patientNumber, setPatientNumber] = useState("");
  const [patientGender, setPatientGender] = useState("default");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [preferredMode, setPreferredMode] = useState("default");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form inputs
    const errors = {};
    if (!patientName.trim()) {
      errors.patientName = "Patient name is required";
    } else if (patientName.trim().length < 8) {
      errors.patientName = "Patient name must be at least 8 characters";
    }

    if (!patientNumber.trim()) {
      errors.patientNumber = "Patient phone number is required";
    } else if (patientNumber.trim().length !== 10) {
      errors.patientNumber = "Patient phone number must be of 10 digits";
    }

    if (patientGender === "default") {
      errors.patientGender = "Please select patient gender";
    }
    if (!appointmentTime) {
      errors.appointmentTime = "Appointment time is required";
    } else {
      const selectedTime = new Date(appointmentTime).getTime();
      const currentTime = new Date().getTime();
      if (selectedTime <= currentTime) {
        errors.appointmentTime = "Please select a future appointment time";
      }
    }
    if (preferredMode === "default") {
      errors.preferredMode = "Please select preferred mode";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Store the appointment data in the component's state
    const appointmentData = {
      patientName,
      patientNumber,
      patientGender,
      appointmentTime,
      preferredMode,
    };

    // Reset form fields and errors after successful submission
    setPatientName("");
    setPatientNumber("");
    setPatientGender("default");
    setAppointmentTime("");
    setPreferredMode("default");
    setFormErrors({});

    toast.success("Appointment Scheduled !", {
      position: toast.POSITION.TOP_CENTER,
      onOpen: () => setIsSubmitted(true),
      onClose: () => setIsSubmitted(false),
    });

    // Navigate to the appointment details page
    navigate("/appointment-details", { state: appointmentData });
  };

  return (
    <div className="">
      <div className="p-2">
        <img src={girlCode} className="size-16" alt="" />
      </div>

      <div className="form-container bg-blue-50 w-full flex flex-col">
        <h2 className="text-2xl font-semibold">
          <span>Book Appointment</span>
        </h2>


        <form class=" mx-auto w-3/4 ">
          <div class="mb-5">
            <label for="patientName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Patient Name</label>
            <input type="text"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              required
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            {formErrors.patientName && (
              <p className="error-message">{formErrors.patientName}</p>
            )}
          </div>
          <div class="mb-5">
            <label for="contact" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Patient phone number</label>
            <input type="text"
              value={patientNumber}
              onChange={(e) => setPatientNumber(e.target.value)}
              required
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            {formErrors.patientNumber && (
              <p className="error-message">{formErrors.patientNumber}</p>
            )}
          </div>
          <div class="mb-5">
            <label for="gender" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Patient gender</label>
            <select
              value={patientGender}
              onChange={(e) => setPatientGender(e.target.value)}
              required
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="default">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="private">I'd rather not say</option>
              <option value="private">Custom</option>
            </select>
            {formErrors.patientGender && (
              <p className="error-message">{formErrors.patientGender}</p>
            )}
          </div>

          <div class="mb-5">
            <label for="time" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Prefered appointment time</label>
            <input type="datetime-local"
              value={appointmentTime}
              onChange={(e) => setAppointmentTime(e.target.value)}
              required
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            {formErrors.appointmentTime && (
              <p className="error-message">{formErrors.appointmentTime}</p>
            )}
          </div>

          <div class="mb-5">
            <label for="mode" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Prefered mode of appointment</label>
            <select
              value={preferredMode}
              onChange={(e) => setPreferredMode(e.target.value)}
              required
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="default">Select</option>
              <option value="voice">Voice Call</option>
              <option value="video">Video Call</option>
            </select>
            {formErrors.preferredMode && (
              <p className="error-message">{formErrors.preferredMode}</p>
            )}
          </div>
            <div className="flex justify-center">

          <button type="submit" className="text-appointment-btn">
            Confirm Appointment
          </button>
            </div>
        </form>


      </div>

      <ToastContainer autoClose={5000} limit={1} closeButton={false} />
    </div>
  );
}

export default AppointmentForm;
