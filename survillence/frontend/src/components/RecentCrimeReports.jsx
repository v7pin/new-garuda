// RecentCrimesReported.js
import React from "react";
import { FaRegClock } from "react-icons/fa"; // Make sure react-icons is installed

const crimesReported = [
  { time: "56 min", title: "Vandalism Detected at Koregaon Park, Pune" },
  { time: "15 min", title: "Suspicious Activity Detected in Nagpur" },
  { time: "10 min", title: "Assualt Case Found in Goa" },
  // Add more reports here...
];

const RecentCrimesReported = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 mb-4">
      <h2 className="text-xl font-semibold mb-2 flex justify-between items-center text-blue-800">
        Recent Crimes Reported
        <span className="text-xs font-medium text-blue-600">Today</span>
      </h2>
      <div>
        {crimesReported.map((crime, index) => (
          <div key={index} className="flex items-center mb-2 last:mb-0">
            <FaRegClock className="text-blue-500" />
            <div className="ml-2">
              <span className="text-sm text-gray-600">{crime.time}</span>
              <p className="text-md font-semibold text-gray-800">
                {crime.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentCrimesReported;
