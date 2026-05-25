"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail } from 'react-icons/fi';
import RippleGrid from './RippleGrid';

const WorldMap = dynamic(() => import('./WorldMap'), { ssr: false });

const Contact = () => {
  const [formData, setFormData] = React.useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = React.useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
        
        // Reset success message after 5 seconds
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setErrorMessage(result.error || 'Failed to send message. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMessage('A network error occurred. Please try again later.');
    }
  };

  return (
    <section id="contact" className="w-full py-24 px-6 md:px-12 bg-transparent text-white font-sans relative overflow-hidden">
      {/* RippleGrid background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <RippleGrid
          enableRainbow={false}
          gridColor="#06b6d4"
          rippleIntensity={0.04}
          gridSize={8}
          gridThickness={20}
          fadeDistance={1.8}
          vignetteStrength={2.5}
          glowIntensity={0.08}
          opacity={0.25}
          mouseInteraction={false}
        />
      </div>
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-cyan-900/10 rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto relative z-10 flex flex-col lg:flex-row gap-16 lg:items-start">
        
        {/* ── LEFT SIDE: Info ── */}
        <div className="flex-1 space-y-10">
          <div>
            <div className="w-14 h-14 bg-[#111625] border border-white/5 shadow-2xl rounded-2xl flex items-center justify-center mb-8">
              <FiMail size={24} className="text-cyan-400" />
            </div>
            <motion.h2 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-white"
            >
              Contact us
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-gray-400 text-lg leading-relaxed max-w-md"
            >
              We are always looking for ways to improve our products and services. Contact us and let us know how we can help you.
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-400"
          >
            <a href="mailto:fahadfaheem178@gmail.com" className="hover:text-white transition-colors">fahadfaheem178@gmail.com</a>
            <span className="text-gray-600">•</span>
            <span className="hover:text-white transition-colors cursor-default">0340-7418174</span>
            <span className="text-gray-600">•</span>
            <span className="hover:text-white transition-colors cursor-default">Rawalpindi, Pakistan</span>
          </motion.div>

          {/* World Map */}
          <WorldMap />
        </div>

        {/* ── RIGHT SIDE: Form Card ── */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 w-full max-w-xl"
        >
          <div className="bg-[#111625]/80 backdrop-blur-xl rounded-[2rem] p-8 md:p-10 relative overflow-hidden transition-all duration-500">
            
            {/* Success Overlay */}
            <AnimatePresence>
              {status === 'success' && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-[#0f1424]/95 backdrop-blur-md z-20 flex flex-col items-center justify-center p-8 text-center"
                >
                  <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold uppercase tracking-widest mb-2 text-white">Message Sent!</h3>
                  <p className="text-gray-400 font-medium">Thanks for reaching out. I&apos;ll get back to you as soon as possible.</p>
                </motion.div>
              )}
            </AnimatePresence>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="text-[13px] font-semibold text-gray-300">Full name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  disabled={status === 'loading'}
                  className="w-full bg-[#1a1f35] rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-colors text-white placeholder-gray-500 disabled:opacity-50 text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[13px] font-semibold text-gray-300">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="contact@example.com"
                  required
                  disabled={status === 'loading'}
                  className="w-full bg-[#1a1f35] rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-colors text-white placeholder-gray-500 disabled:opacity-50 text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[13px] font-semibold text-gray-300">Phone Number</label>
                <input 
                  type="text" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (800) 123 4567"
                  required
                  inputMode="numeric"
                  disabled={status === 'loading'}
                  onInput={(e) => {
                    e.currentTarget.value = e.currentTarget.value.replace(/[^0-9+\s()-]/g, '');
                  }}
                  className="w-full bg-[#1a1f35] rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-colors text-white placeholder-gray-500 disabled:opacity-50 text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[13px] font-semibold text-gray-300">Message</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Type your message here"
                  required
                  rows={4}
                  disabled={status === 'loading'}
                  className="w-full bg-[#1a1f35] rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-colors text-white placeholder-gray-500 resize-none disabled:opacity-50 text-sm"
                />
              </div>

              {status === 'error' && (
                <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400 text-xs font-medium text-center">
                  {errorMessage}
                </div>
              )}

              <div className="pt-2">
                <motion.button 
                  type="submit"
                  disabled={status === 'loading'}
                  whileHover={status === 'loading' ? {} : { scale: 1.02 }}
                  whileTap={status === 'loading' ? {} : { scale: 0.98 }}
                  className="px-6 py-2.5 bg-[#2a3050] hover:bg-[#343b61] rounded-lg font-medium text-sm text-white transition-colors disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {status === 'loading' ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : 'Submit'}
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Contact;
