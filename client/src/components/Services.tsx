"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FiLayout, FiServer, FiSmartphone, FiCpu, FiDatabase, FiArrowDown } from 'react-icons/fi';
import BorderGlow from './BorderGlow';

const services = [
  {
    icon: FiLayout,
    title: 'FRONTEND DEVELOPMENT',
    description: 'Building pixel-perfect, highly responsive interfaces using React.js, Next.js, TypeScript, and Tailwind CSS with CI/CD-ready architecture.',
    active: true,
  },
  {
    icon: FiServer,
    title: 'BACKEND & API DEVELOPMENT',
    description: 'Designing secure, scalable server-side systems with Node.js, Express.js, REST APIs, JWT authentication, and role-based access control.',
    active: false,
  },
  {
    icon: FiSmartphone,
    title: 'MOBILE APP DEVELOPMENT',
    description: 'Delivering cross-platform mobile applications with Flutter and Dart following clean MVVM architecture with real-time sync capabilities.',
    active: false,
  },
  {
    icon: FiCpu,
    title: 'AI & ML INTEGRATION',
    description: 'Integrating machine learning models (YOLO, ESRGAN) with Python and Flask backends, real-time WebSocket pipelines, and computer vision workflows.',
    active: false,
  },
  {
    icon: FiDatabase,
    title: 'DATABASE DESIGN',
    description: 'Architecting and managing relational and NoSQL databases including MySQL, MongoDB, Supabase, and PostgreSQL for production-grade applications.',
    active: false,
  },
];

const Services = () => {
  return (
    <section id="services" className="w-full py-24 px-6 md:px-12 bg-transparent text-white font-sans relative overflow-hidden">
      {/* Glow effects */}
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Upper Header Row */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-16 border-b border-white/5 pb-10">
          <div>
            <p className="text-xs font-bold tracking-[0.3em] text-cyan-400 uppercase mb-3">── MY SERVICES ?</p>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight">
              WHAT I&apos;M<br />OFFERING
            </h2>
          </div>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-xl">
            High-performance development services tailored to modern business needs — from scalable backend systems and interactive frontends to mobile apps, AI integrations, and database architecture.
          </p>
        </div>

        {/* Content Layout: Scroll Down + Cards */}
        <div className="flex flex-col md:flex-row gap-10 items-stretch">
          
          {/* Scroll Down Indicator */}
          <div className="hidden md:flex flex-col items-center justify-between py-4 select-none shrink-0 w-16">
            <span className="text-[9px] font-bold tracking-[0.4em] uppercase text-gray-500 [writing-mode:vertical-lr] rotate-180">
              SCROLL DOWN
            </span>
            <div className="w-[1px] h-32 bg-gradient-to-b from-gray-500 to-transparent my-4" />
            <motion.div 
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 cursor-pointer bg-white/5"
            >
              <FiArrowDown size={16} />
            </motion.div>
          </div>

          {/* Cards Grid */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((svc, i) => {
              const Icon = svc.icon;
              return (
                <motion.div
                  key={svc.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -8 }}
                >
                  <BorderGlow
                    backgroundColor="#0d0d1a"
                    borderRadius={24}
                    glowColor="185 100 70"
                    glowIntensity={1.2}
                    glowRadius={36}
                    edgeSensitivity={28}
                    coneSpread={22}
                    colors={['#22d3ee', '#a855f7', '#3b82f6']}
                    className="h-full"
                  >
                    <div className="flex flex-col justify-between p-8 h-full">
                      <div>
                        {/* Icon */}
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-10 ${
                          svc.active ? 'bg-cyan-500/20 text-cyan-400' : 'bg-white/5 text-gray-400'
                        }`}>
                          <Icon size={24} />
                        </div>

                        {/* Title */}
                        <h3 className="text-lg font-extrabold uppercase tracking-wider mb-4 text-white">
                          {svc.title}
                        </h3>

                        {/* Description */}
                        <p className="text-xs text-gray-400 leading-relaxed font-medium">
                          {svc.description}
                        </p>
                      </div>
                    </div>
                  </BorderGlow>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};

export default Services;
