'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { projectsData } from '@/data/projectsData';
import { FiArrowLeft, FiCheckCircle, FiExternalLink } from 'react-icons/fi';

const ProjectsPage = () => {
  return (
    <main className="min-h-screen bg-[#0b031b] text-white pt-24 pb-32 font-sans relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-900/10 rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Back Link & Header */}
        <div className="mb-16">
          <Link href="/" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors font-semibold text-sm mb-8 group">
            <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Home
          </Link>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6"
          >
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Projects</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed"
          >
            A deep dive into the applications, platforms, and AI models I&apos;ve built.
          </motion.p>
        </div>

        {/* Projects List */}
        <div className="space-y-32">
          {projectsData.map((project) => (
            <div key={project.id} id={project.id} className="scroll-mt-32">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.7 }}
                className="flex flex-col lg:flex-row gap-12 lg:items-start"
              >
                {/* Visual Side (Image or Fallback) */}
                <div className="w-full lg:w-5/12 flex-shrink-0">
                  {project.image ? (
                    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(6,182,212,0.1)] group">
                      <Image 
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0b031b]/80 via-transparent to-transparent pointer-events-none" />
                    </div>
                  ) : (
                    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/5 bg-gradient-to-br from-[#111625] to-[#0a0f1c] shadow-[0_0_40px_rgba(6,182,212,0.1)] flex flex-col items-center justify-center p-8 text-center group">
                      <div className="w-24 h-24 mb-6 rounded-full bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 group-hover:scale-110 transition-transform duration-500">
                         <span className="text-4xl text-cyan-400 font-mono font-bold">{project.category.charAt(0)}</span>
                      </div>
                      <h4 className="text-xl font-bold text-gray-300 opacity-50">Visuals Coming Soon</h4>
                    </div>
                  )}
                </div>

                {/* Content Side */}
                <div className="w-full lg:w-7/12 flex flex-col">
                  <div className="mb-6">
                    <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest rounded-full mb-4 inline-block">
                      {project.category}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                      {project.title}
                    </h2>
                    <p className="text-gray-300 text-lg leading-relaxed mb-6">
                      {project.overview}
                    </p>
                    {project.link && (
                      <a 
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center px-6 py-2.5 bg-transparent border border-cyan-500 text-cyan-400 font-bold text-sm tracking-widest uppercase rounded-full hover:bg-cyan-500 hover:text-[#0b031b] transition-all duration-300 shadow-[0_0_15px_rgba(6,182,212,0.15)] hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                      >
                        Visit Live Site <FiExternalLink className="ml-2" />
                      </a>
                    )}
                  </div>

                  {/* Technologies */}
                  <div className="mb-8">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="px-3 py-1.5 bg-[#111625] border border-white/5 text-gray-300 text-sm rounded-md">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-8">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Key Features</h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
                      {project.features.map((feature, i) => (
                        <li key={i} className="flex items-start text-gray-300 text-sm">
                          <FiCheckCircle className="text-cyan-400 mr-2 mt-0.5 flex-shrink-0" size={16} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Challenges & Standout */}
                  <div className="space-y-6 bg-[#111625]/50 border border-white/5 p-6 rounded-2xl">
                    <div>
                      <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-widest mb-2">Challenges Solved</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{project.challenges}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-purple-400 uppercase tracking-widest mb-2">Why It Stands Out</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{project.standOut}</p>
                    </div>
                  </div>

                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default ProjectsPage;
