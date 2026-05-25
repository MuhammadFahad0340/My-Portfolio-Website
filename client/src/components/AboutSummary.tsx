import React from 'react';
import Link from 'next/link';

const AboutSummary = () => {
  return (
    <section id="about" className="w-full py-24 px-6 md:px-12 bg-transparent text-white flex justify-center items-center font-sans border-t border-white/5">
      <div className="max-w-4xl w-full flex flex-col items-center text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
          Who is Muhammad Fahad?
        </h2>
        
        <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-8 max-w-3xl">
          I am a passionate CS graduate from NUST, actively building highly scalable web systems and innovative mobile applications. With expertise spanning the MERN stack and Flutter, I focus on crafting premium, performant digital experiences.
        </p>

        <Link href="/about" className="group relative px-8 py-3 font-semibold tracking-wide text-white overflow-hidden rounded-full border border-cyan-500 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all duration-300">
          <span className="relative z-10">Read More About Me</span>
          <div className="absolute inset-0 h-full w-0 bg-cyan-500 transition-all duration-300 ease-out group-hover:w-full -z-0"></div>
        </Link>
      </div>
    </section>
  );
};

export default AboutSummary;
