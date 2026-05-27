"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaLinkedin, FaInstagram, FaFacebook, FaGithub } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="w-full py-12 px-6 md:px-12 bg-transparent border-t border-white/5 text-white/50">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* Left: Branding */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="Fahad Logo" width={80} height={32} className="h-8 w-auto object-contain opacity-75 hover:opacity-100 transition-opacity" />
          </Link>
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
