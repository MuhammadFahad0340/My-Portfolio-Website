import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Portfolio from "@/components/Portfolio";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between overflow-hidden">
      <Hero />
      
      {/* Spacer to push sections below the hero visually */}
      <div className="w-full bg-transparent">
        
        {/* Services Section */}
        <Services />

        {/* Experience Section */}
        <div id="experience">
          <Experience />
        </div>

        {/* Skills Section */}
        <div id="skills" className="pb-12">
          <Skills />
        </div>

        {/* Projects Section - glassmorphic overlay for grouping */}
        <div id="portfolio" className="bg-[#0f1424]/40 backdrop-blur-sm border-y border-white/5">
          <Portfolio />
        </div>

        {/* CTA Section */}
        <section className="w-full py-24 px-6 md:px-12 bg-transparent flex flex-col items-center justify-center text-center relative border-t border-white/5">
          {/* Decorative Glow */}
          <div className="absolute inset-0 flex justify-center items-center pointer-events-none opacity-20">
            <div className="w-64 h-64 bg-cyan-500 rounded-full blur-[100px]" />
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight relative z-10">
            Let&apos;s Build Something Amazing.
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-12 text-lg relative z-10">
            I am currently open for new opportunities. Whether you have a question, a project in mind, or just want to say hi, I&apos;ll try my best to get back to you!
          </p>

          <div className="flex flex-col sm:flex-row gap-6 relative z-10">
            <Link 
              href="/contact" 
              className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold tracking-widest uppercase text-sm hover:scale-105 transition-transform shadow-[0_0_20px_rgba(6,182,212,0.4)]"
            >
              Get In Touch
            </Link>
            <a 
              href="/resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full border border-cyan-500/50 bg-cyan-500/10 text-cyan-400 font-bold tracking-widest uppercase text-sm hover:bg-cyan-500/20 hover:scale-105 transition-all"
            >
              View Resume
            </a>
          </div>
        </section>

      </div>
    </main>
  );
}
