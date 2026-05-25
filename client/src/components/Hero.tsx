"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiCheck, FiArrowDownRight, FiArrowDown } from 'react-icons/fi';

const Hero = () => {
  return (
    <section className="relative w-full min-h-screen flex flex-col bg-transparent overflow-hidden text-white font-sans">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-scroll {
          display: flex;
          width: max-content;
          animation: marquee 20s linear infinite;
        }
      `}</style>

      {/* Decorative Glows */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-cyan-900/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Template navigation helper - top right aligned inside hero container visually */}
      <div className="absolute top-8 right-10 z-20 hidden xl:flex gap-12 text-xs font-semibold tracking-wider">
        <Link href="#portfolio" className="group flex flex-col items-start gap-1">
          <span className="flex items-center gap-1 text-gray-300 group-hover:text-cyan-400 transition-colors">
            MY PROJECTS <FiArrowDownRight className="text-cyan-500" />
          </span>
          <span className="text-[10px] text-gray-500 font-medium">See all my work</span>
        </Link>
        <Link href="#services" className="group flex flex-col items-start gap-1">
          <span className="flex items-center gap-1 text-gray-300 group-hover:text-cyan-400 transition-colors">
            ABOUT ME <FiArrowDownRight className="text-cyan-500" />
          </span>
          <span className="text-[10px] text-gray-500 font-medium">Learn what I offer</span>
        </Link>
        <Link href="#contact" className="group flex flex-col items-start gap-1">
          <span className="flex items-center gap-1 text-gray-300 group-hover:text-cyan-400 transition-colors">
            CONTACT ME <FiArrowDownRight className="text-cyan-500" />
          </span>
          <span className="text-[10px] text-gray-500 font-medium">fahadfaheem178@gmail.com</span>
        </Link>
      </div>

      {/* Main Content Row */}
      <div className="relative z-10 flex-1 flex flex-col lg:flex-row items-center justify-between w-full px-6 md:px-16 xl:px-32 pt-32 pb-16 gap-12">
        
        {/* ── LEFT COLUMN: Text, Checklist & CTAs ── */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center gap-8 text-left">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl animate-bounce">👋</span>
              <span className="text-sm font-extrabold uppercase tracking-[0.25em] text-cyan-400">Hello! I&apos;m</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl xl:text-7xl font-black uppercase leading-none tracking-tight">
              Muhammad
              <br />
              <span className="inline-flex items-center gap-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500">
                Fahad ✦
              </span>
            </h1>

            <p className="text-sm md:text-base text-gray-400 leading-relaxed max-w-xl pt-2 font-medium">
              I am a CS Final Year student at <span className="text-white font-semibold">NUST</span> and an impact-driven developer. I specialize in backend architecture design, clean interactive frontends, and cross-platform mobile products.
            </p>
          </motion.div>

          {/* Bullet points checklist */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-3"
          >
            {[
              'Build robust & scalable web systems',
              'Craft responsive, interactive frontends',
              'Deliver cross-platform Flutter applications'
            ].map((text) => (
              <div key={text} className="flex items-center gap-3 text-sm text-gray-300 font-semibold">
                <div className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                  <FiCheck size={12} />
                </div>
                <span>{text}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA Row */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-8 pt-4"
          >
            <Link href="#contact" className="px-8 py-4 bg-white text-[#0b031b] font-bold text-xs tracking-widest uppercase rounded-full hover:bg-cyan-400 hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all duration-300">
              Let&apos;s Talk
            </Link>

            <a 
              href="/resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white border-b-2 border-white/30 hover:border-cyan-400 hover:text-cyan-400 pb-1.5 transition-colors duration-300"
            >
              Download CV <FiArrowDown className="text-sm" />
            </a>
          </motion.div>

        </div>

        {/* ── RIGHT COLUMN: Portrait Frame & Decorators ── */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full lg:w-1/2 flex items-center justify-center lg:justify-end relative"
        >
          {/* Main frame container */}
          <div className="relative group w-64 md:w-80 xl:w-[350px] aspect-[3/4]">
            
            {/* Background glowing gradients */}
            <div className="absolute -inset-4 bg-gradient-to-br from-cyan-500/20 to-purple-600/10 rounded-[2.5rem] blur-3xl opacity-60 group-hover:opacity-80 transition-opacity duration-700 pointer-events-none" />

            {/* Template-inspired accent lines/geometries */}
            <svg className="absolute -top-10 -left-10 w-24 h-24 text-cyan-500/30 select-none pointer-events-none" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="10" y1="90" x2="90" y2="10" />
              <line x1="30" y1="90" x2="90" y2="30" />
            </svg>

            {/* Portrait Image */}
            <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl bg-gray-900/50">
              <Image
                src="/hero-photos/fahad.jpeg"
                alt="Muhammad Fahad"
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                priority
              />
              {/* Subtle overlay shading */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b031b]/40 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Rotating / Floating Graphic Circle badge: "Hello" */}
            <div className="absolute -left-10 bottom-16 w-24 h-24 bg-[#111625] border border-white/10 rounded-full flex flex-col items-center justify-center rotate-[-12deg] shadow-2xl z-20 group-hover:scale-105 transition-transform duration-500">
              <span className="text-[10px] font-black tracking-widest text-cyan-400 uppercase">IT&apos;S ME</span>
              <span className="text-white font-serif text-lg tracking-tight font-black leading-tight">Fahad</span>
            </div>

            {/* Template wavy decorator path */}
            <svg className="absolute -right-8 bottom-24 w-12 h-12 text-purple-500/40 select-none pointer-events-none" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round">
              <path d="M 10 50 Q 30 20 50 50 T 90 50" />
            </svg>

          </div>
        </motion.div>

      </div>

      {/* ── BOTTOM BANNER: Scrolling Marquee ── */}
      <div className="w-full bg-[#111625]/60 border-y border-white/5 py-5 overflow-hidden mt-auto relative select-none">
        <div className="animate-marquee-scroll gap-16 items-center">
          {Array(4).fill([
            'WEB DESIGN', 'APP DESIGN', 'DEVELOPMENT', 'DATABASE SYSTEM', 'CLOUD INTEGRATION'
          ]).flat().map((item, idx) => (
            <span key={idx} className="flex items-center gap-12 text-xs font-black uppercase tracking-[0.25em] text-gray-400 hover:text-cyan-400 transition-colors">
              <span>{item}</span>
              <span className="text-cyan-500">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
