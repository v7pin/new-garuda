import React, { useState, useRef, useEffect } from 'react';
import { IoArrowBackCircle, IoPaperPlane, IoChatboxEllipses, IoChevronDown } from 'react-icons/io5';
import { CSSTransition } from 'react-transition-group';
import TypingIndicator from './TypingIndicator';
import './Chatbot.css';
import { HiMiniChatBubbleBottomCenterText } from "react-icons/hi2";


const Chatbot = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const messagesContainerRef = useRef(null);
  const [isBotTyping, setIsBotTyping] = useState(false);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleInputChange = (e) => setInputValue(e.target.value);

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    console.log('Send message:', inputValue);
    setInputValue('');
    // Here, you would also append the new message to the `messages` array.
  };

  const handleLanguageChange = (e) => setSelectedLanguage(e.target.value);

  const toggleChatInterface = () => setIsVisible(!isVisible);

  return (
    <div>
      <CSSTransition in={isVisible} timeout={300} classNames="chat-interface" unmountOnExit>
        <div className="chatBot fixed inset-0 m-auto w-11/12 max-w-4xl h-3/4 bg-white rounded-lg shadow-lg flex flex-col">
          <div className="p-4 bg-blue-700 rounded-t-lg flex justify-between items-center text-white">
            <h2 className="text-lg">Garuda AI: Your Assistance</h2>
            <div className="flex items-center">
              <select
                id="language"
                value={selectedLanguage}
                onChange={handleLanguageChange}
                className="bg-white text-black p-1 rounded-md mr-4 text-sm"
              >
                <option value="english">English</option>
                <option value="hindi">हिन्दी (Hindi)</option>
              </select>
              <IoChevronDown onClick={toggleChatInterface} className="cursor-pointer" />
            </div>
          </div>
          <div ref={messagesContainerRef} className="overflow-auto flex-1 p-4">
            {messages.map((message, index) => (
              <div key={index} className={`mb-2 p-2 rounded-lg ${message.type === 'user' ? 'bg-green-100 text-black' : 'bg-gray-100 text-gray-800'}`}>
                {message.text}
              </div>
            ))}
            {isBotTyping && <TypingIndicator />}
          </div>
          <div className="p-4 bg-gray-100 rounded-b-lg flex">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Type your message..."
              className="flex-1 p-2 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none"
            />
            <button onClick={handleSendMessage} className="ml-2 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full focus:outline-none">
              <IoPaperPlane />
            </button>
          </div>
        </div>
      </CSSTransition>
      <div onClick={toggleChatInterface} className={`fixed bottom-4 right-4 bg-blue-800 text-white p-3 rounded-full cursor-pointer transition-transform transform hover:scale-110 ${isVisible ? 'hidden' : ''}`}>
        <HiMiniChatBubbleBottomCenterText className="text-2xl" /> 
      </div>
    </div>
  );
};

export default Chatbot;
