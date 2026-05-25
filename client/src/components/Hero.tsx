"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Add your images to /public/hero-photos/ and list them here
const heroImages = [
  '/hero-photos/fahad.jpeg',
  '/hero-photos/pic.jpg',
  '/hero-photos/pic3.jpg',
];

const Hero = () => {
  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex flex-col bg-transparent overflow-hidden text-white font-sans">

      {/* Background glows */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-cyan-900/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col lg:flex-row items-center justify-between w-full px-10 md:px-20 xl:px-32 pt-28 pb-16 gap-12">

        {/* ── LEFT: Bio & CTAs ── */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center gap-7 text-center lg:text-left">
          <div>
            <p className="text-xs font-bold tracking-[0.3em] text-cyan-500 uppercase mb-4">
              MERN Stack · Flutter · Full-Stack Developer
            </p>
            <h1 className="text-5xl md:text-6xl xl:text-7xl font-extrabold uppercase leading-[1.05] mb-5">
              Muhammad
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Fahad
              </span>
            </h1>
          </div>

          <p className="text-base md:text-lg text-gray-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
            Impact-driven <span className="text-white font-semibold">Full Stack Developer</span> with 1+ year of professional experience. CS Final Year student at <span className="text-cyan-400 font-semibold">NUST</span>, building scalable web systems & innovative mobile apps — ready to contribute from day one.
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-8">
            {[
              { value: '1+', label: 'Year of XP' },
              { value: '5+', label: 'Projects Shipped' },
              { value: 'MERN', label: 'Stack Expert' },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="text-2xl font-extrabold text-cyan-400">{stat.value}</span>
                <span className="text-xs text-gray-500 uppercase tracking-wider mt-0.5">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <Link href="#portfolio">
              <div className="relative inline-block group cursor-pointer">
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-500 transition-all duration-300 group-hover:w-full group-hover:h-full" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-500 transition-all duration-300 group-hover:w-full group-hover:h-full" />
                <button className="relative z-10 px-8 py-3 font-bold text-sm tracking-widest uppercase text-white bg-transparent">
                  View My Work
                </button>
              </div>
            </Link>

            <Link href="/contact">
              <button className="px-8 py-3 rounded-full border border-cyan-500/40 text-sm font-bold tracking-widest uppercase text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all duration-300">
                Get In Touch
              </button>
            </Link>
          </div>

          <p className="text-xs text-gray-500">
            fahadfaheem178@gmail.com &nbsp;·&nbsp; 0340-7418174 &nbsp;·&nbsp; Rawalpindi, Pakistan
          </p>
        </div>

        {/* ── RIGHT: Photo Slideshow ── */}
        <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-end">
          <div className="relative group w-64 md:w-80 xl:w-96">
            {/* Decorative glow */}
            <div className="absolute -inset-4 bg-gradient-to-br from-cyan-500/20 to-purple-600/10 rounded-[2.5rem] blur-2xl opacity-60 group-hover:opacity-90 transition-opacity duration-700 pointer-events-none" />

            {/* Slideshow card */}
            <div className="relative w-full aspect-[3/4] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl group-hover:border-cyan-500/30 transition-all duration-500">
              {heroImages.map((src, i) => (
                <Image
                  key={src}
                  src={src}
                  alt={`Muhammad Fahad ${i + 1}`}
                  fill
                  className="object-cover object-top transition-opacity duration-1000"
                  style={{ opacity: i === currentImg ? 1 : 0 }}
                  priority={i === 0}
                />
              ))}
              {/* Bottom fade */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b031b]/50 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Dot indicators */}
            <div className="flex justify-center gap-2 mt-4">
              {heroImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImg(i)}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    i === currentImg ? 'w-6 bg-cyan-500' : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
