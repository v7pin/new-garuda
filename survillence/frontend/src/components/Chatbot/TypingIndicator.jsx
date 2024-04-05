// TypingIndicator.jsx

import React from 'react';
import 'tailwindcss/tailwind.css';

const TypingIndicator = () => {
  return (
    <div className="flex items-center text-gray-300 italic bg-gray-800 p-2 rounded-md">
      <div className="dot1 mr-1 mb-1"></div>
      <div className="dot2 mr-1 mb-1"></div>
      <div className="dot3 mb-1"></div>
      <div className="ml-2">Garuda AI is typing...</div>
    </div>
  );
};

export default TypingIndicator;