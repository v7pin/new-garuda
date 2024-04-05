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
    
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-8 lg:pt-16">

      <div className="text-center mb-2">
        <h1 className="text-5xl font-bold text-blue-800 mb-3">Honors & Awards</h1>
        <p className="max-w-2xl text-xl text-gray-600">Celebrating the achievements and contributions of our vigilant community members.</p>
      </div>

      {/* Awards & Articles Container */}
      <div className="w-full max-w-7xl mx-auto px-4 lg:px-8 grid md:grid-cols-2 gap-8">
        {/* Awards Section */}
        <section className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold text-blue-800 mb-6 flex items-center justify-center">
            <IoMedal className="text-yellow-400 mr-3" size={32} />
            Honors Roll
          </h2>
          <div className="grid grid-cols-1 gap-6">
            {awards.map((award) => (
              <div key={award.id} className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition-shadow duration-300 ease-in-out">
                <div className="flex items-center">
                  <IoRibbon className="text-yellow-500 mr-4" size={24} />
                  <div>
                    <h3 className="font-semibold">{award.user}</h3>
                    <p className="text-sm text-gray-500">{award.date}</p>
                  </div>
                </div>
                <h4 className="mt-2 text-lg text-green-600">{award.award}</h4>
              </div>
            ))}
          </div>
        </section>

        {/* Articles Section */}
        <section className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold text-blue-800 mb-6 flex items-center justify-center">
            <IoNewspaperOutline className="mr-3" size={32} />
            Featured Articles
          </h2>
          <div className="space-y-6">
            {articles.map((article) => (
              <article key={article.id} className="p-6 bg-gray-50 rounded-lg shadow hover:shadow-md transition-shadow duration-300 ease-in-out">
                <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
                <p className="text-gray-700">{article.content}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default HonorsandAwards;