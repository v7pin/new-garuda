import React, { useState } from "react";
import bg from "../assets/Background.png";
import cctvimg from "../assets/cctv.png";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPersonalDetails } from "../redux/userAction";
const PersonalDetails = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    adharNumber: "",
    address: "",
    locationOption: "manual",
    latitude: "",
    longitude: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Set `Servilancepartner` according to the provided backend expectations
    const Servilancepartner = true; // Adjusted to match your example payload

    console.log(formData);
    const formDataToSend = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      adhar: formData.adharNumber, // Matches backend expectation
      location: {
        latitude: parseFloat(formData.latitude),
        longitude: parseFloat(formData.longitude),
      },
      Servilancepartner, // Matches your example payload
    };

    try {
      const response = await fetch(
        "http://localhost:3000/api/Servilanceregister",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formDataToSend),
        }
      );

      if (!response.ok) {
        // It's a good practice to try and read the response body for more details
        const errorBody = await response.text();
        throw new Error(`Network response was not ok: ${errorBody}`);
      }

      const savedUserData = await response.json();
      dispatch(
        setPersonalDetails({
          userName: savedUserData.username, // Make sure these match the response structure
          latitude: savedUserData.location.latitude,
          longitude: savedUserData.location.longitude,
        })
      );

      console.log(savedUserData)
      // Handle success
      console.log("Registration successful");
      navigate("/dashboard");

      // Redirect the user or show a success message
      // Uncomment to redirect
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Error during registration. Please try again.");
    }
  };

  useEffect(() => {
    if (formData.locationOption === "choose_location") {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setFormData((prevFormData) => ({
              ...prevFormData,
              latitude: position.coords.latitude.toString(),
              longitude: position.coords.longitude.toString(),
            }));
          },
          () => {
            alert("Unable to fetch location. Please enter manually.");
          }
        );
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    }
  }, [formData.locationOption]);

  return (
    <div
      className="flex min-h-screen items-center justify-center"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
      }}
    >
      <img
        src={cctvimg}
        alt="CCTV Camera"
        className="absolute left-0 top-0 w-64 animate-moveCCTV"
      />
      <div
        className="max-w-lg w-full p-10 flex gap-2 flex-col  rounded-xl shadow-md relative"
        style={{
          borderTop: "2px solid #4881C8",
          borderLeft: "2px solid #4881C8",
          borderBottom: "6px solid #4881C8",
          borderRight: "2px solid #4881C8",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(2px)",
        }}
      >
        <h2 className="text-2xl font-semibold text-center mb-8 text-white">
          Personal Details
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="firstName" className="block mb-1 text-white">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full p-2 bg-transparent text-white outline-none border-b-2 border-white"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block mb-1 text-white">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full p-2 bg-transparent text-white outline-none border-b-2 border-white"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="adharNumber" className="block mb-1 text-white">
              Aadhar Card Number
            </label>
            <input
              type="text"
              id="adharNumber"
              name="adharNumber"
              value={formData.adharNumber}
              onChange={handleChange}
              className="w-full p-2 bg-transparent text-white outline-none border-b-2 border-white"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="locationOption" className="block mb-1 text-white">
              Choose Location Option
            </label>
            <select
              id="locationOption"
              name="locationOption"
              value={formData.locationOption}
              onChange={handleChange}
              className="bg-transparent w-full backdrop-blur-2xl text-white rounded p-2"
              style={{ backdropFilter: "blur(2xl)" }}
            >
              <option value="manual" className="text-black">
                Enter Manually
              </option>
              <option value="choose_location" className="text-black">
                Choose from Location
              </option>
            </select>
          </div>

          {formData.locationOption === "manual" && (
            <>
              <div className="mb-4">
                <label htmlFor="address" className="block mb-1 text-white">
                  Camera Installation Address
                </label>
              </div>
            </>
          )}

          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              name="latitude"
              placeholder="Latitude"
              value={formData.latitude}
              onChange={handleChange}
              className="w-full p-2 bg-transparent text-white outline-none border-b-2 border-white"
              required
            />
            <input
              type="text"
              name="longitude"
              placeholder="Longitude"
              value={formData.longitude}
              onChange={handleChange}
              className="w-full p-2 bg-transparent text-white outline-none border-b-2 border-white"
              required
            />
          </div>

          <button
            onClick={handleSubmit}
            type="submit"
            className="w-full text-center bg-gradient-to-r from-blue-700 to-sky-400 text-white rounded-md py-2 focus:outline-none hover:from-blue-600 hover:to-sky-500 duration-1000"
          >
            Submit
          </button>
        </form>
        <div className="text-center mt-4">
          <Link to="/" className="text-blue-500 hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
      <div className="absolute bottom-0 w-72 right-0 mb-2 mr-4">
        <img src="reverselogo.png" alt="" />
      </div>
    </div>
  );
};

export default PersonalDetails;
