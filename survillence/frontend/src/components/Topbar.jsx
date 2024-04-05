import React, { useState } from 'react';
import { useSelector } from 'react-redux'; // Import useSelector hook
import { IoMdPerson } from 'react-icons/io';
import { Link } from 'react-router-dom';

const Topbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Fetch userName and userRole from the Redux store
  const userName = useSelector(state => state.user.personalDetails?.userName || 'User');
  const userRole = useSelector(state => state.user.role);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Function to determine the display message based on the user's role
  const roleMessage = () => {
    switch(userRole) {
      case 'safetyAlertsUser':
        return 'Safety Alerts User';
      case 'surveillancePartner':
        return 'Surveillance Partner';
      default:
        return 'Guest';
    }
  };

  return (
    <div className="bg-[#071E3D] text-white flex justify-between items-center px-4 py-2">
      <div className="text-lg">MyApp</div> {/* Example place for app name/logo */}
      <div className="relative">
        <button onClick={toggleDropdown} className="flex items-center focus:outline-none">
          {/* Display the user's role in a modern look */}
          <span className="text-sm bg-[#FFC300] text-[#071E3D] rounded-full px-3 py-1 font-semibold mr-2">{roleMessage()}</span>
          {/* Display the user's name next to the account icon */}
          <span className="ml-2">Hello, {userName}</span>
          <IoMdPerson className="text-2xl ml-3" />
        </button>
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
            <Link to='/profile' className="block px-4 py-2 text-sm text-gray-800 border-b hover:bg-gray-100">Edit Profile</Link>
            <Link to='/login' className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">Logout</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Topbar;
