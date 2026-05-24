"use client";

import React from 'react';
import Link from 'next/link';
import { FaLinkedin, FaInstagram, FaFacebook, FaGithub } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="w-full py-12 px-6 md:px-12 bg-[#0b031b] border-t border-white/5 text-white/50">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* Left: Branding */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shrink-0">
              <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[7px] border-l-cyan-500 border-b-[5px] border-b-transparent ml-0.5" />
            </div>
            <span className="text-sm font-bold tracking-widest text-white">MUHAMMAD FAHAD</span>
          </div>
          <p className="text-[10px] uppercase tracking-[0.2em]">© {new Date().getFullYear()} All Rights Reserved</p>
        </div>

        {/* Center: Quick Links */}
        <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <Link href="/#portfolio" className="hover:text-white transition-colors">Projects</Link>
          <Link href="/about" className="hover:text-white transition-colors">About</Link>
          <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          <Link href="/resume.pdf" className="hover:text-white transition-colors">Resume</Link>
        </div>

        {/* Right: Socials */}
        <div className="flex gap-5">
          <a href="https://www.linkedin.com/in/muhammad-fahad-525692306/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><FaLinkedin size={18} /></a>
          <a href="https://github.com/MuhammadFahad0340" target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><FaGithub size={18} /></a>
          <a href="https://www.facebook.com/muhammad.fahad.300957" target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><FaFacebook size={18} /></a>
          <a href="https://www.instagram.com/muhammadfahad188/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><FaInstagram size={18} /></a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
