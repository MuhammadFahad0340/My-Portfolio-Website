"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { experiences } from '@/data/experiences';
import { ArrowRight, Briefcase } from 'lucide-react';

const ExperienceSlideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  // Auto-slide every 15 seconds, but pause if hovered
  useEffect(() => {
    if (isHovered) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % experiences.length);
    }, 15000);
    return () => clearInterval(timer);
  }, [isHovered]);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      setCurrentIndex((prev) => (prev + 1) % experiences.length);
    } else if (info.offset.x > swipeThreshold) {
      setCurrentIndex((prev) => (prev - 1 + experiences.length) % experiences.length);
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (isLocked) return;

    if (Math.abs(e.deltaX) > 40) {
      setIsLocked(true);
      if (e.deltaX > 0) {
        setCurrentIndex((prev) => (prev + 1) % experiences.length);
      } else {
        setCurrentIndex((prev) => (prev - 1 + experiences.length) % experiences.length);
      }
      setTimeout(() => setIsLocked(false), 800);
    }
  };

  const currentExp = experiences[currentIndex];

  return (
    <section 
      onWheel={handleWheel}
      className="w-full py-24 px-6 md:px-12 bg-[#0b031b] text-white overflow-hidden relative"
    >
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex items-center gap-3 mb-8 justify-center md:justify-start">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
            <Briefcase className="w-5 h-5 text-cyan-400" />
          </div>
          <p className="text-xs font-bold tracking-[0.3em] text-cyan-500 uppercase">Work Experience</p>
        </div>

        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-12 backdrop-blur-sm relative group cursor-grab active:cursor-grabbing"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">{currentExp.role}</h3>
                  <p className="text-cyan-400 font-bold tracking-wide uppercase text-sm">{currentExp.company}</p>
                </div>
                <div className="flex flex-col md:items-end">
                   <span className="text-gray-400 text-sm font-medium">{currentExp.duration}</span>
                   <span className="text-gray-500 text-xs mt-1">{currentExp.location}</span>
                </div>
              </div>

              <div className="space-y-4 mb-10">
                {currentExp.achievements.slice(0, 3).map((achievement, i) => (
                  <div key={i} className="flex items-start gap-4 text-gray-300">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-500 shrink-0 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                    <p className="text-base md:text-lg leading-relaxed">{achievement}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {currentExp.techs.map((tech) => (
                  <span key={tech} className="px-3 py-1 text-[10px] font-bold rounded-lg border border-white/5 bg-white/5 text-gray-400 uppercase tracking-tighter">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-3 mt-12">
            {experiences.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-1.5 transition-all duration-500 rounded-full ${
                  i === currentIndex ? 'w-8 bg-cyan-500' : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Unique See More Button */}
        <div className="mt-16 flex justify-center">
          <Link href="/experience">
            <button className="group relative px-8 py-4 bg-transparent transition-all duration-300">
              {/* Button Border/Glow */}
              <div className="absolute inset-0 border border-cyan-500/30 rounded-full group-hover:border-cyan-500 transition-colors" />
              <div className="absolute inset-0 bg-cyan-500/0 rounded-full group-hover:bg-cyan-500/10 transition-colors" />
              
              <div className="relative flex items-center gap-3 text-white font-bold tracking-widest uppercase text-xs">
                View Full Interactive Journey
                <div className="w-6 h-6 rounded-full bg-cyan-500 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="w-3.5 h-3.5 text-[#0b031b]" strokeWidth={3} />
                </div>
              </div>

              {/* Decorative elements around button */}
              <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-1 bg-cyan-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur-[1px]" />
              <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-1 h-1 bg-cyan-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur-[1px]" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSlideshow;
