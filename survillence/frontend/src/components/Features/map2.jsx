import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { IoArrowBackCircle, IoAlertCircle } from "react-icons/io5";
import L from "leaflet";
import "./AlertsOnMap.css"; // Assuming you'll create this CSS file for animations

const customMarkerIcon = new L.Icon({
  iconUrl: "marker-icon.png",
  iconRetinaUrl: "marker-icon-2x.png",
  shadowUrl: "marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const AlertsOnMap = ({ setActiveComponent, alertLocation }) => {
  const position = alertLocation && alertLocation.latitude && alertLocation.longitude
    ? [alertLocation.latitude, alertLocation.longitude]
    : [20.5937, 78.9629]; // Default to India if no alertLocation or if incomplete

  return (
    <div className="relative h-screen w-full">
      <div className="absolute z-20 top-5 left-5">
        <button
          onClick={() => setActiveComponent("")}
          className="flex items-center text-lg font-semibold text-blue-700 hover:text-blue-900 bg-slate-200 hover:bg-blue-200 rounded-full shadow-md transition duration-300 ease-in-out p-2"
        >
          <IoArrowBackCircle className="mr-2" />
          <span className="hidden sm:inline">Back</span>
        </button>
      </div>
      <div className="absolute z-20 top-5 right-5 flex items-center">
        <h2 className="text-xl font-bold text-white bg-gray-800 p-3 rounded-lg">Alert Location</h2>
        {alertLocation && (
          <IoAlertCircle className="text-4xl text-red-600 animate-pulse ml-4" />
        )}
      </div>
      <MapContainer
        center={position}
        zoom={5}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {alertLocation && (
          <Marker position={position} icon={customMarkerIcon}>
            <Popup>A danger alert has been reported here.</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default AlertsOnMap;
