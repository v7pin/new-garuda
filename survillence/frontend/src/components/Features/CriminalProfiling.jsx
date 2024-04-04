import React, { useState } from 'react';
import { IoArrowBackCircle, IoCloudUploadOutline, IoClose } from 'react-icons/io5';
import axios from 'axios';

const CriminalProfiling = ({ setActiveComponent }) => {
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [coordinates, setCoordinates] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleCoordinatesChange = (event) => {
    setCoordinates(event.target.value);
  };

  const submitReport = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('description', description);
      formData.append('coordinates', coordinates);

      const response = await axios.post('http://localhost:3000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log("Report submitted:", response.data);
      alert("Your report has been submitted. Thank you for contributing!");
      setShowModal(false);
      setFile(null);
      setDescription("");
      setCoordinates("");
    } catch (error) {
      console.error('Error submitting report:', error.message);
      alert("Failed to submit report. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-10">
      <div className="w-full max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <button 
          onClick={() => setActiveComponent("")} 
          className="absolute top-5 left-5 flex items-center text-lg font-semibold text-blue-700 hover:text-blue-800 transition duration-300 ease-in-out">
          <IoArrowBackCircle className="mr-2" size={24} />
          Back
        </button>
        <h1 className="text-3xl font-bold text-center mb-6">Crime Profiling Using Blockchain</h1>
        <p className="text-lg text-center mb-4">
          Welcome to our Crime Profiling platform powered by blockchain technology. We aim to create a secure, immutable, and transparent record of criminal incidents and activities.
        </p>
        <p className="text-lg text-center mb-4">
          Our platform allows you to contribute to a safer community by reporting any suspicious activities or crimes you witness. Your reports are anonymous and play a crucial role in preventing and solving crimes.
        </p>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg mb-4 transition duration-300 ease-in-out flex items-center">
          <IoCloudUploadOutline className="mr-2" /> Report Incident
        </button>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
            <div className="bg-white p-5 rounded-lg shadow-xl relative max-w-lg w-full">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-800">
                <IoClose size={24} />
              </button>
              <h2 className="text-xl font-semibold mb-4">Report an Incident</h2>
              <input type="file" onChange={handleFileChange} className="mb-4" />
              <textarea
                value={description}
                onChange={handleDescriptionChange}
                className="w-full p-2 border rounded mb-4"
                placeholder="Describe the incident"
                rows="4"></textarea>
              <input
                value={coordinates}
                onChange={handleCoordinatesChange}
                type="text"
                className="w-full p-2 border rounded mb-4"
                placeholder="Enter coordinates"
              />
              <button
                onClick={submitReport}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                Submit Report
              </button>
            </div>
          </div>
        )}

        <p className="text-center mt-4">
          Your contribution matters. By submitting a report, you help in maintaining a safer environment for everyone. Thank you for being proactive in ensuring the safety of our community.
        </p>
      </div>
    </div>
  );
};

export default CriminalProfiling;

