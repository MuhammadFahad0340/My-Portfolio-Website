"use client";

import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { experiences } from '@/data/experiences';
import { motion } from 'framer-motion';

interface ExperienceItem {
  role: string;
  company: string;
  duration: string;
  location: string;
  logo?: string;
  mockup?: string;
  liveUrl?: string;
  badge: string;
  badgeColor: string;
  achievements: string[];
  techs: string[];
}

const ExperienceEntry = ({ exp, isEven }: { exp: ExperienceItem, isEven: boolean }) => {
  const [mouseY, setMouseY] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);
  const [phonePos, setPhonePos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const lineRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (lineRef.current) {
      const rect = lineRef.current.getBoundingClientRect();
      const relativeY = e.clientY - rect.top;
      setMouseY(relativeY);
    }
  };

  const startDragging = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - phonePos.x,
      y: e.clientY - phonePos.y
    });
  };

  const handleDrag = useCallback((e: MouseEvent) => {
    if (isDragging) {
      setPhonePos({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y
      });
    }
  }, [isDragging, dragOffset]);

  const stopDragging = useCallback(() => {
    setIsDragging(false);
  }, []);

  React.useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleDrag);
      window.addEventListener('mouseup', stopDragging);
    } else {
      window.removeEventListener('mousemove', handleDrag);
      window.removeEventListener('mouseup', stopDragging);
    }
    return () => {
      window.removeEventListener('mousemove', handleDrag);
      window.removeEventListener('mouseup', stopDragging);
    };
  }, [isDragging, handleDrag, stopDragging]);

  return (
    <div className="relative flex flex-col md:flex-row gap-8 md:gap-0 mb-32 last:mb-0 group/row">
      
      {/* Interactive Line Area */}
      <div 
        ref={lineRef}
        className="hidden md:block absolute left-1/2 top-[-2rem] bottom-[-2rem] w-12 transform -translate-x-1/2 z-30 cursor-crosshair"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {/* Visual Line Segment */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-cyan-500/40 to-transparent transform -translate-x-1/2 opacity-0 group-hover/row:opacity-100 transition-opacity duration-700" />
        
        {/* Static Dot */}
        <div className="absolute left-1/2 w-4 h-4 rounded-full bg-cyan-500 border-4 border-[#0b031b] shadow-[0_0_15px_rgba(6,182,212,0.8)] transform -translate-x-1/2 top-10 opacity-0 group-hover/row:opacity-100 transition-all duration-500" />

        {/* Following Tooltip */}
        <div 
          className="absolute left-full ml-4 pointer-events-none transition-all duration-75 ease-out z-50"
          style={{ 
            top: `${mouseY}px`,
            opacity: showTooltip ? 1 : 0,
            transform: `translateY(-50%) scale(${showTooltip ? 1 : 0.8})`,
            display: showTooltip ? 'block' : 'none'
          }}
        >
          <div className="bg-[#1a1f2e]/95 backdrop-blur-md border border-white/10 p-3 rounded-xl shadow-2xl whitespace-nowrap">
             <span className="text-cyan-400 font-bold text-[10px] block mb-0.5 uppercase tracking-tighter">{exp.duration}</span>
             <span className="text-white text-xs font-semibold">{exp.location}</span>
          </div>
          {/* Arrow */}
          <div className="absolute left-[-6px] top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[6px] border-r-white/10" />
        </div>
      </div>

      {/* Preview Side */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`w-full md:w-1/2 flex justify-center items-center px-4 md:px-12 ${isEven ? 'md:order-1' : 'md:order-2'}`}
      >
        <div className="relative w-full group/preview">
          <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl opacity-0 group-hover/preview:opacity-10 transition-opacity duration-500 blur-2xl" />
          
          <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-[#1a1f2e] transition-all duration-500 group-hover/preview:border-cyan-500/30">
            <div className="bg-[#242938] px-4 py-2 flex items-center gap-2 border-b border-white/5">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
              </div>
              <div className="flex-1 mx-4 bg-[#0b031b]/50 rounded-md py-1 px-3 text-[10px] text-gray-500 truncate">
                {exp.liveUrl || 'local_project_preview'}
              </div>
            </div>

            <div className="aspect-video relative overflow-hidden bg-[#0b031b]">
              {exp.liveUrl ? (
                <iframe src={exp.liveUrl} className="w-full h-full border-none opacity-95 hover:opacity-100 transition-opacity" title={exp.role} loading="lazy" />
              ) : (
                <Image src={exp.mockup || ''} alt={exp.role} fill className="object-cover" />
              )}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0b031b] via-transparent to-transparent opacity-40" />
            </div>
          </div>

          {/* Draggable Floating Mobile Mockup (Presence+ Specific) */}
          {exp.role.includes('Presence+') && exp.mockup && (
            <div 
              ref={phoneRef}
              className={`absolute cursor-grab active:cursor-grabbing select-none z-40 hidden lg:block`}
              style={{
                transform: `translate(${phonePos.x}px, ${phonePos.y}px)`,
                right: isEven ? '-4rem' : 'auto',
                left: isEven ? 'auto' : '-4rem',
                bottom: '-2.5rem',
                transition: isDragging ? 'none' : 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)'
              }}
              onMouseDown={startDragging}
            >
              <div className="w-32 md:w-[165px] aspect-[9/19.5] rounded-[2.5rem] overflow-hidden border-[6px] border-[#242938] shadow-2xl relative bg-black">
                <Image 
                  src={exp.mockup} 
                  alt="App UI" 
                  fill 
                  className="object-cover pointer-events-none"
                  priority
                />
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-[#242938] rounded-b-2xl z-50 pointer-events-none" />
              </div>

              {/* Drag Handle Badge */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-cyan-500 text-[#0b031b] text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-tighter shadow-lg pointer-events-none group-hover/preview:opacity-100 transition-opacity">
                Mobile UI
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Details Side */}
      <motion.div 
        initial={{ opacity: 0, x: isEven ? 40 : -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`w-full md:w-1/2 flex flex-col justify-center px-4 md:px-12 ${isEven ? 'md:order-2' : 'md:order-1'} text-left`}
      >
        <motion.div 
          whileHover={{ y: -6, borderColor: 'rgba(6, 182, 212, 0.3)', backgroundColor: 'rgba(255, 255, 255, 0.08)', boxShadow: '0 10px 40px rgba(6, 182, 212, 0.08)' }}
          transition={{ duration: 0.3 }}
          className="bg-white/5 border border-white/10 rounded-3xl p-8 transition-all duration-500 relative group/card overflow-hidden"
        >
          <div className={`absolute -top-10 -right-10 md:-top-12 md:-right-12 opacity-5 transform rotate-12 group-hover/card:scale-110 transition-transform duration-700`}>
            {exp.logo && <Image src={exp.logo} alt="" width={200} height={200} />}
          </div>

          <div className="flex flex-col items-start mb-6 gap-4">
            <div className="flex items-center gap-4">
              {exp.logo && (
                <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/10 bg-white/5 shrink-0 shadow-lg">
                  <Image src={exp.logo} alt={exp.company} width={48} height={48} className="w-full h-full object-cover" />
                </div>
              )}
              <div>
                <h3 className="text-2xl font-bold text-white leading-tight">{exp.role}</h3>
                <p className="text-cyan-400 font-bold text-sm mt-1">{exp.company}</p>
              </div>
            </div>
            <span className={`px-4 py-1 text-[10px] font-black uppercase tracking-widest rounded-full border ${exp.badgeColor}`}>
              {exp.badge}
            </span>
          </div>

          <ul className="space-y-4 mb-8 text-left">
            {exp.achievements.map((achievement: string, i: number) => (
              <li key={i} className="flex items-start gap-3 text-gray-300 text-sm leading-relaxed">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-cyan-500 shrink-0 shadow-[0_0_8px_rgba(6,182,212,1)]" />
                <span>{achievement}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2 justify-start">
            {exp.techs.map((tech: string) => (
              <motion.span 
                key={tech} 
                whileHover={{ scale: 1.08, color: '#06b6d4', borderColor: 'rgba(6, 182, 212, 0.4)' }}
                className="px-3 py-1 text-[10px] font-bold rounded-lg border border-white/5 bg-white/5 text-gray-400 transition-colors duration-300 uppercase tracking-tighter cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

const Experience = () => {
  return (
    <section id="experience" className="w-full py-24 px-6 md:px-12 bg-transparent text-white font-sans overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-24">
          <p className="text-xs font-bold tracking-[0.3em] text-cyan-500 uppercase mb-3">Career Path</p>
          <h2 className="text-4xl md:text-6xl font-extrabold">
            Work <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Experience</span>
          </h2>
        </div>

        <div className="relative">
          {experiences.map((exp, index) => (
            <ExperienceEntry key={index} exp={exp} isEven={index % 2 === 0} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
