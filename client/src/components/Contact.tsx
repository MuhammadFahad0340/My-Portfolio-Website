"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLinkedin, FaInstagram, FaFacebook, FaGithub } from 'react-icons/fa6';
import RippleGrid from './RippleGrid';

const Contact = () => {
  const [formData, setFormData] = React.useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [focusedField, setFocusedField] = React.useState<string | null>(null);

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
        <div className="flex-1 space-y-12">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400"
            >
              Contact
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-gray-400 text-lg leading-relaxed max-w-md font-medium"
            >
              Have a project in mind or just want to say hi? Feel free to reach out. I&apos;m always open to discussing new projects, creative ideas or opportunities to be part of your visions.
            </motion.p>
          </div>

          <div className="space-y-8">
            {[
              { title: 'Address', detail: 'Rawalpindi, Pakistan' },
              { title: 'Phone', detail: '0340-7418174' },
              { title: 'Email', detail: 'fahadfaheem178@gmail.com' }
            ].map((info, i) => (
              <motion.div 
                key={info.title}
                initial={{ opacity: 0, x: -25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ x: 6 }}
                className="space-y-1 transition-all duration-300 max-w-fit cursor-default"
              >
                <h4 className="text-sm font-bold uppercase tracking-wider text-cyan-400">{info.title}</h4>
                <p className="text-gray-300 text-base font-semibold">{info.detail}</p>
              </motion.div>
            ))}
          </div>

          {/* Socials - Horizontal */}
          <div className="flex gap-6 pt-4">
            {[
              { icon: FaLinkedin, href: "https://www.linkedin.com/in/muhammad-fahad-525692306/" },
              { icon: FaGithub, href: "https://github.com/MuhammadFahad0340" },
              { icon: FaFacebook, href: "https://www.facebook.com/muhammad.fahad.300957" },
              { icon: FaInstagram, href: "https://www.instagram.com/muhammadfahad188/" },
            ].map((Social, i) => (
              <motion.a
                key={i}
                href={Social.href}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.5 + i * 0.08 }}
                whileHover={{ y: -5, scale: 1.15, color: '#22d3ee' }}
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <Social.icon size={24} />
              </motion.a>
            ))}
          </div>
        </div>

        {/* ── RIGHT SIDE: Form Card ── */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 w-full max-w-xl"
        >
          <div className="bg-[#111625]/60 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden transition-all duration-500 hover:border-white/15">
            
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

            <h3 className="text-2xl font-extrabold uppercase tracking-widest mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Get In Touch</h3>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2 relative">
                <label className={`text-[10px] font-bold uppercase tracking-widest transition-colors duration-300 ${focusedField === 'name' ? 'text-cyan-400' : 'text-gray-400'}`}>Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  required
                  disabled={status === 'loading'}
                  className="w-full bg-transparent border-b border-white/10 py-2 focus:outline-none transition-colors text-white disabled:opacity-50 font-medium text-sm"
                />
                <motion.div 
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: focusedField === 'name' ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-cyan-400 origin-center"
                />
              </div>

              <div className="space-y-2 relative">
                <label className={`text-[10px] font-bold uppercase tracking-widest transition-colors duration-300 ${focusedField === 'email' ? 'text-cyan-400' : 'text-gray-400'}`}>Email</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  required
                  title="Email format is not right"
                  disabled={status === 'loading'}
                  className="w-full bg-transparent border-b border-white/10 py-2 focus:outline-none transition-colors text-white invalid:[&:not(:placeholder-shown)]:border-red-500/50 disabled:opacity-50 font-medium text-sm"
                />
                <motion.div 
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: focusedField === 'email' ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-cyan-400 origin-center"
                />
              </div>

              <div className="space-y-2 relative">
                <label className={`text-[10px] font-bold uppercase tracking-widest transition-colors duration-300 ${focusedField === 'phone' ? 'text-cyan-400' : 'text-gray-400'}`}>Phone number</label>
                <input 
                  type="text" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('phone')}
                  onBlur={() => setFocusedField(null)}
                  required
                  inputMode="numeric"
                  pattern="[0-9]*"
                  disabled={status === 'loading'}
                  onInput={(e) => {
                    e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '');
                  }}
                  className="w-full bg-transparent border-b border-white/10 py-2 focus:outline-none transition-colors text-white disabled:opacity-50 font-medium text-sm"
                />
                <motion.div 
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: focusedField === 'phone' ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-cyan-400 origin-center"
                />
              </div>

              <div className="space-y-2 relative">
                <label className={`text-[10px] font-bold uppercase tracking-widest transition-colors duration-300 ${focusedField === 'message' ? 'text-cyan-400' : 'text-gray-400'}`}>Message</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  required
                  rows={3}
                  disabled={status === 'loading'}
                  className="w-full bg-transparent border-b border-white/10 py-2 focus:outline-none transition-colors text-white resize-none disabled:opacity-50 font-medium text-sm"
                />
                <motion.div 
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: focusedField === 'message' ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-cyan-400 origin-center"
                />
              </div>

              {status === 'error' && (
                <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400 text-xs font-medium text-center">
                  {errorMessage}
                </div>
              )}

              <div className="pt-6">
                <motion.button 
                  type="submit"
                  disabled={status === 'loading'}
                  whileHover={status === 'loading' ? {} : { scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 1)', color: '#0b031b', borderColor: 'rgba(255, 255, 255, 1)', boxShadow: '0 8px 30px rgba(6, 182, 212, 0.25)' }}
                  whileTap={status === 'loading' ? {} : { scale: 0.98 }}
                  className="w-full py-4 bg-transparent border border-white/10 rounded-xl font-bold uppercase tracking-widest text-sm text-white transition-all duration-300 shadow-xl disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-white flex items-center justify-center gap-3 cursor-pointer"
                >
                  {status === 'loading' ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : 'Send Message'}
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
