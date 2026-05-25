'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { name: 'Home',       href: '/' },
  { name: 'Projects',   href: '/projects' },
  { name: 'Experience', href: '/experience' },
  { name: 'About',      href: '/about' },
  { name: 'Contact',    href: '/contact' },
  { name: 'Resume',     href: '/resume.pdf' },
];

const Navbar = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    const timer = setTimeout(() => setMenuOpen(false), 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      {/* ── Top Bar ── */}
      <div className={`fixed z-50 w-full transition-all duration-500 ease-in-out flex justify-center ${isScrolled ? 'top-4' : 'top-0'}`}>
        <nav className={`flex items-center text-white transition-all duration-500 ease-in-out ${
          isScrolled
            ? 'px-5 py-3 bg-[#111625]/90 backdrop-blur-lg shadow-2xl rounded-full border border-white/10 w-auto gap-6'
            : 'w-full px-6 md:px-10 py-5 bg-transparent border-b border-white/5 justify-between rounded-none'
        }`}>

          {/* Logo */}
          <div className={`flex items-center gap-3 overflow-hidden transition-all duration-500 ${isScrolled ? 'max-w-0 opacity-0' : 'max-w-xs opacity-100'}`}>
            <Link href="/">
              <img src="/logo.png" alt="Fahad Logo" className="h-10 sm:h-12 object-contain bg-white rounded-xl p-1.5 hover:scale-105 transition-transform" />
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-semibold tracking-wider">
            {navLinks.map((item) => {
              const isActive = item.href === pathname || (pathname === '/' && item.name === 'Home');
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:transition-all after:duration-300 after:h-[2px] ${
                    isActive
                      ? 'text-white after:w-full after:bg-cyan-400'
                      : 'text-gray-300 hover:text-white after:w-0 hover:after:w-full after:bg-cyan-400/50'
                  }`}
                >
                  {item.name.toUpperCase()}
                </Link>
              );
            })}
          </div>

          {/* Social icons — desktop only */}
          <div className={`hidden lg:flex items-center gap-4 text-gray-300 overflow-hidden transition-all duration-500 ${isScrolled ? 'max-w-0 opacity-0' : 'max-w-xs opacity-100'}`}>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
          </div>

          {/* Hamburger — mobile only */}
          <button
            className="md:hidden flex flex-col justify-center gap-1.5 w-9 h-9 rounded-lg hover:bg-white/5 transition-colors p-1.5 ml-auto"
            onClick={() => setMenuOpen(prev => !prev)}
            aria-label="Toggle menu"
          >
            <span className={`block h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </nav>
      </div>

      {/* ── Mobile Slide-down Menu ── */}
      <div className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${menuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${menuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setMenuOpen(false)}
        />

        {/* Drawer */}
        <div className={`absolute top-0 right-0 h-full w-72 max-w-[85vw] bg-[#0f1424]/95 backdrop-blur-xl border-l border-white/10 shadow-2xl transition-transform duration-300 flex flex-col ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>

          {/* Close button */}
          <div className="flex justify-end p-5">
            <button onClick={() => setMenuOpen(false)} className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 transition-colors text-lg">
              ✕
            </button>
          </div>

          {/* Links */}
          <nav className="flex flex-col px-6 gap-1 flex-1">
            {navLinks.map((item) => {
              const isActive = item.href === pathname || (pathname === '/' && item.name === 'Home');
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold tracking-widest uppercase transition-all duration-200 ${
                    isActive
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white border border-transparent'
                  }`}
                >
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />}
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Social icons */}
          <div className="flex gap-4 px-10 py-8 border-t border-white/5">
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;