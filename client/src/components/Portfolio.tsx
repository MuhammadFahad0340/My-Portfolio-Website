'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import BorderGlow from './BorderGlow';
import Galaxy from './Galaxy';

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 260, damping: 25 }
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 15,
    transition: { duration: 0.2 }
  }
};

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState('All');

  const filteredProjects = activeTab === 'All' 
    ? projectsData 
    : projectsData.filter(project => project.category === activeTab);

  return (
    <section id="portfolio" className="w-full min-h-screen bg-transparent py-24 px-6 md:px-12 text-white font-sans relative overflow-hidden">
      {/* Galaxy starfield background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Galaxy
          mouseInteraction={false}
          mouseRepulsion={false}
          transparent={true}
          hueShift={185}
          saturation={0.7}
          density={1.2}
          glowIntensity={0.4}
          twinkleIntensity={0.4}
          rotationSpeed={0.03}
          starSpeed={0.3}
          speed={0.6}
        />
      </div>
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-cyan-900/10 rounded-full blur-[120px] pointer-events-none z-0" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs font-bold tracking-[0.3em] text-cyan-500 uppercase mb-3">Recent Works</p>
          <h2 className="text-4xl md:text-6xl font-extrabold">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Projects</span>
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-16 bg-[#111625]/40 p-2 rounded-full border border-white/5 max-w-fit mx-auto backdrop-blur-md">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`relative px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                activeTab === category ? 'text-[#0b031b] z-10' : 'text-gray-400 hover:text-white'
              }`}
            >
              {activeTab === category && (
                <motion.span
                  layoutId="activePortfolioTab"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  className="absolute inset-0 bg-cyan-400 rounded-full -z-10"
                />
              )}
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div 
          layout
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                whileHover={{ y: -8 }}
              >
                <BorderGlow
                  backgroundColor="#0d0d1a"
                  borderRadius={16}
                  glowColor="185 100 70"
                  glowIntensity={1.2}
                  glowRadius={36}
                  edgeSensitivity={25}
                  coneSpread={22}
                  colors={['#22d3ee', '#a855f7', '#3b82f6']}
                >
                  <div className="flex flex-col group cursor-pointer">
                    {/* Image Container */}
                    <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-900 shadow-lg">
                      <Image 
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                        <motion.span 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-6 py-2.5 border border-cyan-400 text-cyan-400 font-bold text-xs tracking-widest uppercase hover:bg-cyan-400 hover:text-[#0b031b] hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all duration-300"
                        >
                          View Project
                        </motion.span>
                      </div>
                    </div>
                    
                    {/* Text Container */}
                    <div className="p-6">
                      <p className="text-[10px] font-black tracking-widest uppercase text-cyan-400 mb-2">
                        {project.category}
                      </p>
                      <h3 className="text-lg font-bold text-gray-100 transition-colors group-hover:text-cyan-300">
                        {project.title}
                      </h3>
                    </div>
                  </div>
                </BorderGlow>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
