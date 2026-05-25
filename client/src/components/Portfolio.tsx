'use client';
import React, { useState } from 'react';
import Image from 'next/image';

const projectsData = [
  {
    id: 1,
    title: 'Presence+ Bluetooth System',
    category: 'Flutter',
    image: '/project_presence.png',
  },
  {
    id: 2,
    title: 'Law Firm Web System',
    category: 'React / Node.js',
    image: '/project_law_firm.png',
  },
  {
    id: 3,
    title: 'Fahad-Bot AI Assistant',
    category: 'Next.js',
    image: '/project_chatbot.png',
  },
];

const categories = ['All', 'React / Node.js', 'Next.js', 'Flutter'];

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState('All');

  const filteredProjects = activeTab === 'All' 
    ? projectsData 
    : projectsData.filter(project => project.category === activeTab);

  return (
    <section id="portfolio" className="w-full min-h-screen bg-transparent py-20 px-6 md:px-12 text-white font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl">
            <span className="font-light">Featured</span> <span className="font-bold">Portfolio</span>
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-16 text-sm font-medium tracking-wide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`transition-colors duration-300 ${
                activeTab === category 
                  ? 'text-cyan-500' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProjects.map((project) => (
            <div key={project.id} className="flex flex-col group cursor-pointer">
              {/* Image Container */}
              <div className="relative w-full aspect-square overflow-hidden bg-gray-900 rounded-lg mb-6 shadow-xl">
                <Image 
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="px-6 py-2 border border-white text-white font-medium text-sm tracking-widest uppercase hover:bg-white hover:text-black transition-colors">
                    View Project
                  </span>
                </div>
              </div>
              
              {/* Text Container */}
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-100 mb-2 transition-colors group-hover:text-cyan-400">
                  {project.title}
                </h3>
                <p className="text-xs font-bold tracking-widest uppercase text-gray-500">
                  {project.category}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
