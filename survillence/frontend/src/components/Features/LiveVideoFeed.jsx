import React, { useEffect, useRef, useState } from "react";
import { IoArrowBackCircle, IoNotifications, IoWarning } from "react-icons/io5";
import axios from "axios";
import moment from "moment-timezone";
import CameraLogs from "./CameraLogs";
import { useSelector } from 'react-redux';

const LiveVideoFeed = ({ setActiveComponent, reportLocation }) => {
    const videoRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const [recordingChunks, setRecordingChunks] = useState([]);
    const [notification, setNotification] = useState("");
    const [isRecording, setIsRecording] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [currentTime, setCurrentTime] = useState(moment().tz("Asia/Kolkata"));
    const [newReports, setNewReports] = useState([]);




    useEffect(() => {
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
          if (videoRef.current) {
              videoRef.current.srcObject = stream;
          }

          // Check for the supported MIME type
          const options = { mimeType: 'video/webm; codecs=vp9' };
          if (!MediaRecorder.isTypeSupported(options.mimeType)) {
              console.warn(`${options.mimeType} is not supported, trying different codec.`);
              options.mimeType = 'video/webm; codecs=vp8';
              if (!MediaRecorder.isTypeSupported(options.mimeType)) {
                  console.warn(`${options.mimeType} is not supported either.`);
                  options.mimeType = ''; // Let the browser choose the codec
              }
          }

          mediaRecorderRef.current = new MediaRecorder(stream, options);
          mediaRecorderRef.current.ondataavailable = (event) => {
              if (event.data && event.data.size > 0) {
                  sendVideoToServer(event.data);
              }
          };

          const startRecording = () => {
              setIsRecording(true);
              mediaRecorderRef.current.start();
              setNotification("Recording...");
              
              setTimeout(() => {
                  mediaRecorderRef.current.stop();
                  setIsRecording(false);
                  setNotification("Processing...");
              }, 50000); // Stop recording after 20 seconds
          };

          // Start recording immediately and then every 30 seconds
          startRecording();
          const recordingInterval = setInterval(startRecording, 60000);

          return () => {
              clearInterval(recordingInterval);
              stream.getTracks().forEach((track) => track.stop());
          };
      });

      const clockInterval = setInterval(() => {
          setCurrentTime(moment().tz("Asia/Kolkata"));
      }, 1000);

      return () => clearInterval(clockInterval);
  }, []);

    const sendVideoToServer = async (videoBlob) => {
        setIsLoading(true);
        const formData = new FormData();
        formData.append("video", videoBlob);

        try {
            const response = await axios.post("http://localhost:5000/classify-video", formData);
            const prediction = response.data.predicted_category;
            console.log("Prediction:", prediction);
            const message = prediction === "NormalVideos" ? "Normal activity detected." : `Alert: ${prediction} detected!`;
            setNotification(message);
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

const handleNewReport = (crimeType) => {
    const newReport = {
        date: moment().format("YYYY-MM-DD"),
        time: moment().format("HH:mm:ss"),
        type: crimeType, // You'll need to adapt this to use actual detected crime from backend
        reported: true
    };
    setNewReports([...newReports, newReport]);
};





const reportCrimeAndLocation = async () => {
    
    const crimeType = 'Robbery'; // Replace with actual data from backend

    // You can pass additional data such as location or video evidence if needed
    reportLocation({ latitude: 78.9629, longitude: 20.5937 });
    
    // After reporting location, also update our logs with the new crime report
    handleNewReport(crimeType);
};

return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-4">
        <h1 className="text-2xl font-bold mb-2">Live Video Feed</h1>
        {/* Video Feed and Controls Container */}
        <div className="flex flex-col w-full max-w-5xl px-8 lg:flex-row">
            
            {/* Video Feed */}
            <div className="flex-1 mb-4 lg:mb-0 lg:mr-4">
                <div className="bg-black relative">
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        className="w-full"
                        style={{ maxHeight: "600px" }}
                    ></video>
                    <div className="absolute top-0 left-0 m-4">
                        <button
                            onClick={() => setActiveComponent("")}
                            className="text-white bg-blue-600 hover:bg-blue-700 font-semibold py-2 px-4 rounded-full flex items-center"
                        >
                            <IoArrowBackCircle className="mr-2" />
                            Back
                        </button>
                    </div>
                </div>
                <div className="mt-2 flex justify-between items-center bg-sky-200 p-4 rounded shadow-md">
                    <span className="font-bold">{notification}</span>
                    <button
                        onClick={reportCrimeAndLocation}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center"
                    >
                        <IoWarning className="mr-2" />
                        Report
                    </button>
                </div>
            </div>

            {/* Camera Logs */}
            <div className="w-full lg:w-1/3 bg-white p-4 rounded shadow-md overflow-auto">
            <h2 className="text-2xl font-bold text-center mb-4">Garud Patrol Logs</h2>
                <CameraLogs newReports={newReports} />
            </div>
        </div>

        {/* Status Indicator */}
        {isRecording || isLoading ? (
            <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-2 px-4 rounded-full shadow-md">
                <span className="font-bold">{isRecording ? "Recording..." : "Analyzing..."}</span>
            </div>
        ) : null}
    </div>
);

};

export default LiveVideoFeed;

