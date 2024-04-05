import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const CrimeMap = () => {
  const crimeReports = [
    { position: [28.6562, 77.2410], title: 'Robbery Detected at Chandni Chowk, Delhi', time: '32 min' },
    { position: [18.5204, 73.8567], title: 'Vandalism Detected at Koregaon Park, Pune', time: '56 min' },
    { position: [21.1458, 79.0882], title: 'Suspicious Activity Detected in Nagpur', time: '15 min' }, // Coordinates for Nagpur
    { position: [15.2993, 74.1240], title: 'Unattended Baggage Found in Goa', time: '10 min' }, // Coordinates for Goa
    
  ];

  return (
    <MapContainer center={[20.5937, 78.9629]} zoom={5} scrollWheelZoom={false} style={{ height: '400px', width: '100%' }} className='z-1'>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {crimeReports.map((report, index) => (
        <Marker key={index} position={report.position}>
          <Popup>{report.title} - {report.time} ago</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default CrimeMap;
