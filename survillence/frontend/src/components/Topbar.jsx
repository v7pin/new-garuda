import React, { useState } from 'react';
import { useSelector } from 'react-redux'; // Import useSelector hook
import { IoMdPerson } from 'react-icons/io';
import { Link } from 'react-router-dom';

const Topbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

 
  // Use useSelector to access the Redux store
  const userName = useSelector(state => state.user.personalDetails?.userName || 'User');


  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="bg-[#071E3D] text-white flex justify-end items-center px-4 py-2">
      <div className="relative">
        <button onClick={toggleDropdown} className="flex items-center focus:outline-none">
          {/* Display the first name next to the account icon */}
          <span className="ml-2">Hello, {userName}</span> 
          <IoMdPerson className="text-2xl ml-3" />
        </button>
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
            <a href="#" className="block px-4 py-2 text-sm text-gray-800 border-b hover:bg-gray-100">Edit Profile</a>
            <Link to='/login' className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">Logout</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Topbar;
