import React from 'react';
import Image from 'next/image';

const About = () => {
  return (
    <section id="about" className="w-full flex flex-col items-center justify-start bg-transparent text-white py-24 px-6 md:px-12 font-sans relative">
      <div className="max-w-5xl w-full flex flex-col md:flex-row gap-12 items-start justify-between">
        
        {/* Left Side: Detailed Bio */}
        <div className="flex-1">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            About Me
          </h2>
          
          <h3 className="text-xl text-gray-300 font-semibold mb-6">
            CS Student at NUST | Full-Stack Developer | Flutter Specialist
          </h3>

          <div className="space-y-6 text-gray-400 leading-relaxed">
            <p>
              I am currently pursuing my degree in Computer Science at the National University of Sciences and Technology (NUST). My journey into technology started with a deep curiosity about how systems are built, which quickly evolved into a passion for software engineering.
            </p>
            <p>
              I specialize in the MERN stack (MongoDB, Express, React, Node.js) and Flutter. Whether I&apos;m building a robust backend to handle complex data structures or crafting a seamless, beautifully animated UI for mobile, I believe in writing clean, scalable, and maintainable code.
            </p>
            <p>
              Beyond traditional software development, I have a strong interest in AI/ML and Bioinformatics. I&apos;m fascinated by the intersection of computational logic and genomic sequencing, and I am actively exploring how technology can be leveraged in molecular medicine.
            </p>
          </div>

          <div className="mt-10">
            <h4 className="text-lg text-white font-bold mb-4 uppercase tracking-wider">Core Competencies</h4>
            <div className="flex flex-wrap gap-3">
              {['React', 'Next.js', 'Node.js', 'Express', 'MongoDB', 'Flutter', 'Tailwind CSS', 'Python', 'C++'].map((skill) => (
                <span key={skill} className="px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-sm font-semibold shadow-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Photo or Graphic */}
        <div className="w-full md:w-1/3 flex justify-center lg:sticky lg:top-32">
          <div className="relative w-72 h-96 rounded-2xl overflow-hidden border-2 border-white/10 shadow-[0_0_30px_rgba(6,182,212,0.15)] group">
             {/* Using the generated hero image as a placeholder for Fahad's portrait */}
             <Image 
                src="/hero_developer.png"
                alt="Muhammad Fahad"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-[#0b031b] via-transparent to-transparent pointer-events-none opacity-80"></div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
