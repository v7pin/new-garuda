import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation after login
import bg from "../assets/Background.png"; // Background image import
import cctvimg from "../assets/cctv.png"; // CCTV image import
import { HiEye, HiEyeOff } from "react-icons/hi"; // Icons for showing/hiding password
import { Link } from "react-router-dom"; // For navigation links

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [emailOrUsername, setEmailOrUsername] = useState(''); // Holds either email or username
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  // Toggle visibility of password
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  // Handles form submission
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevents the default form submission

    try {
      const response = await fetch('http://localhost:3000/api/signin', { // Adjust this URL to your actual API endpoint
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ Username: emailOrUsername, Password: password }),
      });

      if (!response.ok) {
        // Handle HTTP errors, e.g., 401, 403, etc.
        throw new Error('Login failed. Please check your credentials.');
      }

      // Assuming the backend sets an auth token via HTTP-only cookies
      // Navigate to another route upon successful login
      navigate('/dashboard'); // Adjust this route to where you want users to go after logging in
    } catch (error) {
      alert(error.message); // Simple error feedback
      console.error(error);
    }
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center"
      style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover" }}>
      <img src={cctvimg} alt="CCTV Camera" className="absolute left-0 top-0 w-64 animate-moveCCTV" />

      <form onSubmit={handleLogin} className="max-w-lg w-full p-16 flex flex-col gap-4 rounded-xl shadow-md relative"
        style={{
          borderTop: "2px solid #4881C8",
          borderLeft: "2px solid #4881C8",
          borderBottom: "6px solid #4881C8",
          borderRight: "2px solid #4881C8",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(2px)",
        }}>

        <h2 className="text-white text-xl font-medium mb-2">Login</h2>
        <input
          type="text"
          placeholder="Email Address or Username"
          className="w-full p-2 bg-transparent text-white outline-none border-b-2 border-white"
          value={emailOrUsername}
          onChange={(e) => setEmailOrUsername(e.target.value)}
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full p-2 bg-transparent text-white outline-none border-b-2 border-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            onClick={togglePasswordVisibility}
            className="absolute right-0 top-0 mt-3 mr-2 cursor-pointer"
          >
            {showPassword ? <HiEye size={20} color="white" /> : <HiEyeOff size={20} color="white" />}
          </span>
        </div>
        
        <button type="submit" className="mt-6 mb-2 w-full p-2 bg-gradient-to-r from-blue-700 to-sky-400 text-white rounded-lg shadow-sm hover:from-blue-600 hover:to-sky-500 duration-1000">
          Login
        </button>

        <div className="text-center text-white text-sm">
          Don't have an account yet? <Link to="/" className="text-blue-400 hover:underline">Sign up</Link>
        </div>
      </form>

      <div className="absolute bottom-0 w-72 right-0 mb-2 mr-4 ">
        <img src="reverselogo.png" alt="" />
      </div>
    </div>
  );
};

export default LoginPage;
