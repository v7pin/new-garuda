import React from 'react';
import { IoArrowBackCircle, IoMedal, IoRibbon, IoNewspaperOutline } from 'react-icons/io5';


const HonorsandAwards = ({ setActiveComponent }) => {
  // Dummy data for the sake of example
  const awards = [
    { id: 1, user: 'Ajay Kumar', award: 'Community Guardian', date: 'March 12, 2024' },
    { id: 2, user: 'Priya Singh', award: 'Vigilant Reporter', date: 'April 5, 2024' },
    { id: 3, user: 'Rohan Mehra', award: 'Hero of the Month', date: 'April 25, 2024' },
    // more awards...
  ];

  const articles = [
    {
      id: 1,
      title: "Garuda's Vigilance: A Beacon of Hope in Mumbai",
      content: "Amidst the bustling streets of Mumbai, Garuda's innovative AI has been instrumental in reducing petty crime by 25%, bringing a new dawn of safety and security."
    },
    {
      id: 2,
      title: "Bengaluru's Tech-Savvy Guardian: Garuda",
      content: "In the Silicon Valley of India, tech enthusiasts have embraced Garuda, forging a community-led shield against crime, one alert at a time."
    },
    {
      id: 3,
      title: "Delhi's New Sentinel: How Garuda is Redefining Safety",
      content: "Delhi's citizens sleep more soundly as Garuda's vigilant AI patrols the night, proving that technology can be humanity's ally in the quest for peace."
    },
    // ...more articles if needed
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-8 lg:pt-16">
      <button
        onClick={() => setActiveComponent("")}
        className="absolute top-4 left-4 lg:top-8 lg:left-8 text-lg font-semibold text-blue-700 hover:text-blue-900"
      >
        <IoArrowBackCircle className="mr-2" size={24} />
        Back
      </button>
      <div className="w-full max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex flex-wrap gap-8 justify-center">
          {/* Awards Section */}
          <div className="w-full lg:w-1/2 xl:w-1/3 bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-blue-800 mb-4 border-b pb-4 flex items-center justify-center">
              <IoMedal className="text-yellow-400 mr-2" size={30} />
              Honors and Awards
            </h2>
            {awards.map((award) => (
              <div key={award.id} className="flex items-center bg-gray-50 p-4 mb-4 rounded-lg shadow-sm">
                <IoMedal className="text-yellow-400 mr-3" size={24} />
                <div>
                  <h3 className="font-semibold">{award.user}</h3>
                  <p className="text-sm text-gray-600">{award.date}</p>
                  <span className="text-green-600">{award.award}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Articles Section */}
          <div className="w-full lg:w-1/2 xl:w-1/3 bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-blue-800 mb-4 border-b pb-4 flex items-center justify-center">
              <IoNewspaperOutline className="mr-2" size={30} />
              In The News
            </h2>
            {articles.map((article) => (
              <article key={article.id} className="mb-4 p-4 bg-gray-50 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-2 text-blue-800 flex items-center">
                  <IoNewspaperOutline className="mr-2" size={20} />
                  {article.title}
                </h3>
                <p className="text-sm text-gray-700">{article.content}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HonorsandAwards;