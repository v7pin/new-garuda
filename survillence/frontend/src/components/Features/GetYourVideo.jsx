import React, { useState } from 'react';
import axios from 'axios';
import { IoArrowBackCircle, IoCloudDownloadOutline, IoSearchCircleOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
const GetYourVideo = ({ setActiveComponent }) => {
  const [fileId, setFileId] = useState('');
  const [fileMetadata, setFileMetadata] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const fetchFileMetadata = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await axios.get(`http://localhost:3000/api/file/${fileId}`);
      setFileMetadata(response.data.data);
      setIsLoading(false);
    } catch (err) {
      setError('Failed to retrieve file metadata');
      setIsLoading(false);
      console.error(err);
    }
  };

  const handleBack = () => {
    navigate('/dashboard'); // Navigate to the dashboard route
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-10">
      <button
        onClick={handleBack}
        className="flex items-center text-lg font-semibold text-blue-700 hover:text-blue-900 transition duration-300 ease-in-out"
      >
        <IoArrowBackCircle className="mr-2" size={24} />
        Back
      </button>
      <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg space-y-4">
        <h1 className="text-3xl font-bold text-center">Your Video in Blockchain</h1>
        <p className="text-lg text-center">Enter the file ID to explore and verify your video or image secured within the blockchain.</p>
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center border-b border-gray-300">
            <IoSearchCircleOutline className="text-gray-400 mr-2" size={24} />
            <input
              type="text"
              placeholder="Enter File ID"
              value={fileId}
              onChange={(e) => setFileId(e.target.value)}
              className="outline-none p-2"
            />
          </div>
          <button
            onClick={fetchFileMetadata}
            className="flex items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
          >
            <IoCloudDownloadOutline className="mr-2" />
            Fetch Metadata
          </button>
        </div>
        {isLoading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {fileMetadata && (
          <div className="mt-4 text-center">
            <h3 className="text-xl font-semibold">File Metadata:</h3>
            <p className="mt-2">Your crime-clip:
              <a href={`https://turquoise-leading-frog-542.mypinata.cloud/ipfs/${fileMetadata.ipfsHash}`} target="_blank" rel="noopener noreferrer" className="block text-blue-500 hover:text-blue-700 transition duration-300 ease-in-out">
                Click here to View the video
              </a>
            </p>
            <p>Description: {fileMetadata.description}</p>
            <p>Coordinates: {fileMetadata.coordinates}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GetYourVideo;
