import React, { useState } from 'react';
import { IoArrowBackCircle, IoLogoLinkedin, IoLogoInstagram, IoLogoWhatsapp, IoSend, IoChevronDownCircleOutline, IoChevronUpCircleOutline } from 'react-icons/io5';

const FeedbackAndSupport = ({ setActiveComponent }) => {
  const [feedback, setFeedback] = useState('');
  const [showFAQ, setShowFAQ] = useState(false); // State to toggle FAQ visibility

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const submitFeedback = (e) => {
    e.preventDefault();
    console.log(feedback);
    alert("Thank you for your feedback!");
    setFeedback('');
  };

  // Sample FAQs
  const faqs = [
    {
      question: "How do I reset my password?",
      answer: "To reset your password, go to the login page and click on 'Forgot Password'. Follow the instructions sent to your email."
    },
    {
      question: "Can I change my subscription plan at any time?",
      answer: "Yes, you can change your subscription plan from your account settings at any time."
    },
    {
      question: "What should I do if I encounter a technical issue?",
      answer: "If you encounter a technical issue, please submit it through our feedback form or contact us directly via WhatsApp for immediate assistance."
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-6">
      <div className="w-full max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg ">
        <button 
          onClick={() => setActiveComponent("")} 
          className="absolute top-5 left-5 flex items-center text-lg font-semibold text-blue-700 hover:text-blue-800 transition duration-300 ease-in-out">
          <IoArrowBackCircle className="mr-2" size={24} />
          Back
        </button>
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-800">Feedback and Support</h1>
        
        {/* Feedback Form */}
        <form onSubmit={submitFeedback} className="space-y-4 mb-2">
          <textarea 
            className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-500 transition duration-300" 
            rows="6" 
            placeholder="Share your feedback or ask us anything..."
            value={feedback}
            onChange={handleFeedbackChange}
            required
          ></textarea>
          <button 
            type="submit" 
            className="flex items-center justify-center w-full bg-blue-600 text-white p-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition duration-300 ease-in-out">
            <IoSend className="mr-2" size={20} /> Submit Feedback
          </button>
        </form>

        {/* Social Media Links */}
        <div className="flex justify-center items-center space-x-8 mb-12">
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-center mb-6">Connect With Us</h2>
          <div className="flex justify-center items-center space-x-8">
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition duration-300 ease-in-out">
              <IoLogoLinkedin size={36} />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800 transition duration-300 ease-in-out">
              <IoLogoInstagram size={36} />
            </a>
            <a href="https://api.whatsapp.com/send?phone=YOURNUMBER" target="_blank" rel="noopener noreferrer" className="text-green-500 hover:text-green-700 transition duration-300 ease-in-out">
              <IoLogoWhatsapp size={36} />
            </a>
          </div>
        </div>
        </div>

        {/* FAQ Section */}
        <div>
          <h2 className="text-2xl font-semibold text-center mb-6">Frequently Asked Questions</h2>
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
                <p className="mt-2 p-4 bg-gray-100 rounded-b-lg">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeedbackAndSupport;
