import React, { useState } from "react";
import {
  IoArrowBackCircle,
  IoLogoLinkedin,
  IoLogoInstagram,
  IoLogoWhatsapp,
  IoSend,
  IoChevronDownCircleOutline,
  IoChevronUpCircleOutline,
  IoCloudUpload,
} from "react-icons/io5";

const FeedbackAndSupport = ({ setActiveComponent }) => {
  const [feedback, setFeedback] = useState("");
  const [file, setFile] = useState(null); // State to store the uploaded file
  const [showFAQ, setShowFAQ] = useState(false); // State to toggle FAQ visibility

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Set the selected file
  };

  const submitFeedback = (e) => {
    e.preventDefault();
    console.log(feedback, file);
    // Perform actions to send feedback and file to the backend
    alert("Thank you for your feedback and file!");
    setFeedback("");
    setFile(null); // Clear the file input after submission
  };

  // Sample FAQs
  const faqs = [
    {
      question: "How does Garuda detect crimes in the live video feed?",
      answer:
        "Garuda uses advanced AI algorithms to analyze the live feed for unusual activities or known patterns of criminal behavior. When something suspicious is detected, it alerts the system immediately.",
    },
    {
      question: "How do I report a crime or suspicious activity on Garuda?",
      answer:
        "If you witness a crime or suspicious activity while using Garuda, you can click the 'Report' button associated with the live feed. This allows you to send an instant alert with the video evidence to the authorities.",
    },
    {
      question: "How are reported incidents verified in Garuda?",
      answer:
        "Reported incidents go through a verification process where our system corroborates the video evidence with AI detection. Verified incidents are then escalated to the appropriate authorities for immediate action.",
    },
    {
      question: "What privacy measures does Garuda implement for its users?",
      answer:
        "Garuda is committed to user privacy. All video feeds are encrypted, and personal data is handled according to strict privacy regulations. Users have full control over their data and can opt-out of sharing at any time.",
    },
    {
      question: "Can I access Garuda's services on my mobile device?",
      answer:
        "Yes, Garuda's platform is mobile-friendly, allowing you to monitor live video feeds, receive alerts, and report incidents directly from your smartphone. We're working on it",
    },
    {
      question: "What should I do if I receive a false alarm from Garuda?",
      answer:
        "False alarms can be reported back to us through the feedback form. Our team continually works on improving the AI to minimize inaccuracies and false alerts.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-6">
      <div className="w-full max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <button
          onClick={() => setActiveComponent("")}
          className="absolute top-5 left-5 z-10  flex items-center text-lg font-semibold text-blue-700 hover:text-blue-800 transition duration-300 ease-in-out"
        >
          <IoArrowBackCircle className="mr-2" size={24} />
          Back
        </button>
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-800">
          Feedback and Support
        </h1>

        <form onSubmit={submitFeedback} className="space-y-4 mb-2">
          <textarea
            className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-500 transition duration-300"
            rows="6"
            placeholder="Share your feedback or ask us anything..."
            value={feedback}
            onChange={handleFeedbackChange}
            required
          ></textarea>
          <div className="flex items-center space-x-3">
            <label
              htmlFor="file-upload"
              className="flex items-center cursor-pointer text-blue-600 hover:text-blue-800 transition duration-300 ease-in-out"
            >
              <IoCloudUpload className="mr-2" size={24} />
              Upload Image/Video
            </label>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept="image/*,video/*"
            />
            {file && <span className="ml-2">{file.name}</span>}
          </div>
          <button
            type="submit"
            className="flex items-center justify-center w-full bg-blue-600 text-white p-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition duration-300 ease-in-out"
          >
            <IoSend className="mr-2" size={20} />
            Submit Feedback
          </button>
        </form>

        {/* Social Media Links */}
        <div className="flex justify-center items-center space-x-8 mb-12">
          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-center mb-6">
              Connect With Us
            </h2>
            <div className="flex justify-center items-center space-x-8">
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition duration-300 ease-in-out"
              >
                <IoLogoLinkedin size={36} />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-600 hover:text-pink-800 transition duration-300 ease-in-out"
              >
                <IoLogoInstagram size={36} />
              </a>
              <a
                href="https://api.whatsapp.com/send?phone=YOURNUMBER"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-500 hover:text-green-700 transition duration-300 ease-in-out"
              >
                <IoLogoWhatsapp size={36} />
              </a>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div>
          <h2 className="text-2xl font-semibold text-center mb-6">
            Frequently Asked Questions
          </h2>
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4">
              <div
                className="flex justify-between items-center p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition duration-300 ease-in-out"
                onClick={() => setShowFAQ(showFAQ === index ? false : index)} // Toggle FAQ display
              >
                <h3 className="font-semibold text-lg">{faq.question}</h3>
                {showFAQ === index ? (
                  <IoChevronUpCircleOutline size={24} />
                ) : (
                  <IoChevronDownCircleOutline size={24} />
                )}
              </div>
              {showFAQ === index && (
                <p className="mt-2 p-4 bg-gray-100 rounded-b-lg">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeedbackAndSupport;
