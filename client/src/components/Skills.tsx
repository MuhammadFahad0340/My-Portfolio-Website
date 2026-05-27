"use client";

import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import BorderGlow from './BorderGlow';
import { useDeviceCapability } from '@/hooks/useDeviceCapability';
import {
  SiReact, SiNextdotjs, SiTypescript, SiJavascript, SiHtml5, SiTailwindcss,
  SiNodedotjs, SiExpress, SiFirebase, SiMongodb, SiMysql, SiSupabase, SiPostgresql,
  SiFlutter, SiDart, SiPython, SiFlask, SiGithub, SiJira, SiTrello,
  SiSocketdotio, SiAuth0,
} from 'react-icons/si';
import { IconType } from 'react-icons';

// ─── Icon + accent map ──────────────────────────────────────────────────────
const skillMeta: Record<string, { icon: IconType; accent: string }> = {
  'React.js':           { icon: SiReact,        accent: '#61DAFB' },
  'Next.js':            { icon: SiNextdotjs,    accent: '#FFFFFF' },
  'TypeScript':         { icon: SiTypescript,   accent: '#3178C6' },
  'JavaScript':         { icon: SiJavascript,   accent: '#F7DF1E' },
  'HTML5':              { icon: SiHtml5,        accent: '#E34F26' },
  'Tailwind CSS':       { icon: SiTailwindcss,  accent: '#38BDF8' },
  'Responsive Design':  { icon: SiHtml5,        accent: '#06B6D4' },
  'Node.js':            { icon: SiNodedotjs,    accent: '#339933' },
  'Express.js':         { icon: SiExpress,      accent: '#FFFFFF' },
  'REST APIs':          { icon: SiNodedotjs,    accent: '#FF6B35' },
  'Firebase':           { icon: SiFirebase,     accent: '#FFCA28' },
  'JWT Auth':           { icon: SiAuth0,         accent: '#D63AFF' },
  'RBAC':               { icon: SiNodedotjs,    accent: '#A855F7' },
  'MongoDB':            { icon: SiMongodb,      accent: '#47A248' },
  'MySQL':              { icon: SiMysql,        accent: '#4479A1' },
  'Firestore':          { icon: SiFirebase,     accent: '#FF9800' },
  'Supabase':           { icon: SiSupabase,     accent: '#3ECF8E' },
  'PostgreSQL':         { icon: SiPostgresql,   accent: '#336791' },
  'Flutter':            { icon: SiFlutter,      accent: '#54C5F8' },
  'Dart':               { icon: SiDart,         accent: '#0175C2' },
  'MVVM Architecture':  { icon: SiFlutter,      accent: '#9C27B0' },
  'BLE / Bluetooth':    { icon: SiFlutter,      accent: '#1DA1F2' },
  'Python':             { icon: SiPython,       accent: '#3776AB' },
  'Flask':              { icon: SiFlask,        accent: '#FFFFFF' },
  'YOLO':               { icon: SiPython,       accent: '#EF4444' },
  'WebSockets':         { icon: SiSocketdotio,  accent: '#22C55E' },
  'Git / GitHub':       { icon: SiGithub,       accent: '#F05032' },
  'Agile / Scrum':      { icon: SiJira,         accent: '#0052CC' },
  'Trello / Jira':      { icon: SiTrello,       accent: '#00C7E5' },
  'CI/CD':              { icon: SiGithub,       accent: '#FC6D26' },
  'OOP':                { icon: SiNodedotjs,    accent: '#10B981' },
};

// ─── Types ──────────────────────────────────────────────────────────────────
type Usage = { name: string; type: 'project' | 'experience' | 'education'; description: string };
type Skill = { name: string; level: number; usedIn: Usage[] };
type Category = { label: string; icon: string; color: string; skills: Skill[] };

// ─── Data ────────────────────────────────────────────────────────────────────
const skillCategories: Category[] = [
  {
    label: 'Frontend', icon: '🖥️', color: 'border-cyan-500/30 bg-cyan-500/5',
    skills: [
      { name: 'React.js', level: 5, usedIn: [
        { name: 'Law Firm System', type: 'experience', description: 'Built full client dashboard, case management UI and role-based views using React hooks and context.' },
        { name: 'Digital Marketing Page', type: 'project', description: 'Animated, reusable component architecture for a marketing landing page.' },
      ]},
      { name: 'Next.js', level: 5, usedIn: [
        { name: 'This Portfolio', type: 'project', description: 'App Router for server-side routing, image optimisation and fast page loads on Vercel.' },
        { name: 'Digital Marketing Page', type: 'project', description: 'SEO-friendly rendering and optimised deployment pipeline.' },
      ]},
      { name: 'TypeScript', level: 4, usedIn: [
        { name: 'This Portfolio', type: 'project', description: 'Typed all components, props and data models to prevent runtime errors.' },
      ]},
      { name: 'JavaScript', level: 5, usedIn: [
        { name: 'Law Firm System', type: 'experience', description: 'Core language for all frontend logic, async operations and Firestore interactions.' },
        { name: 'Blogging Platform', type: 'project', description: 'Dynamic content rendering and admin panel logic.' },
      ]},
      { name: 'HTML5', level: 5, usedIn: [
        { name: 'All Web Projects', type: 'project', description: 'Semantic HTML5 markup across every web project for accessibility and SEO.' },
      ]},
      { name: 'Tailwind CSS', level: 5, usedIn: [
        { name: 'This Portfolio', type: 'project', description: 'Responsive layouts, glassmorphism effects, animations and full dark theme.' },
        { name: 'Digital Marketing Page', type: 'project', description: 'Rapid UI prototyping with utility-first classes.' },
      ]},
      { name: 'Responsive Design', level: 5, usedIn: [
        { name: 'Law Firm System', type: 'experience', description: 'Every screen — forms, client portal, dashboards — works across mobile, tablet and desktop.' },
      ]},
    ],
  },
  {
    label: 'Backend', icon: '⚙️', color: 'border-blue-500/30 bg-blue-500/5',
    skills: [
      { name: 'Node.js', level: 5, usedIn: [
        { name: 'Law Firm System', type: 'experience', description: 'Built the Express REST API server handling auth, case data, appointments and file uploads.' },
        { name: 'Blogging Platform', type: 'project', description: 'Node backend for CRUD operations, admin auth and post management.' },
      ]},
      { name: 'Express.js', level: 5, usedIn: [
        { name: 'Law Firm System', type: 'experience', description: 'REST routing with protected middleware, RBAC and JWT verification layers.' },
      ]},
      { name: 'REST APIs', level: 5, usedIn: [
        { name: 'Law Firm System', type: 'experience', description: 'Designed and consumed REST endpoints for the full case management lifecycle.' },
        { name: 'Car Damage Detection', type: 'project', description: 'Flask REST API serving YOLO model inference results to the web frontend.' },
      ]},
      { name: 'Firebase', level: 4, usedIn: [
        { name: 'Law Firm System', type: 'experience', description: 'Firebase Auth for sign-in; Firebase Storage for secure document uploads.' },
        { name: 'Presence+', type: 'experience', description: 'Firebase Auth for teacher/student login and real-time session management.' },
      ]},
      { name: 'JWT Auth', level: 4, usedIn: [
        { name: 'Law Firm System', type: 'experience', description: 'Stateless JWT auth with refresh tokens and secure HTTP-only cookies.' },
        { name: 'Blogging Platform', type: 'project', description: 'JWT tokens protecting admin routes and author sessions.' },
      ]},
      { name: 'RBAC', level: 4, usedIn: [
        { name: 'Law Firm System', type: 'experience', description: 'Role-based access for admin, lawyer and client — different dashboards, different permissions.' },
      ]},
    ],
  },
  {
    label: 'Databases', icon: '🗄️', color: 'border-green-500/30 bg-green-500/5',
    skills: [
      { name: 'MongoDB', level: 4, usedIn: [
        { name: 'REST API Projects', type: 'project', description: 'Document-based storage for flexible schema design in MERN stack applications.' },
      ]},
      { name: 'MySQL', level: 4, usedIn: [
        { name: 'Blogging Platform', type: 'project', description: 'Relational schema for users, posts, categories and comments with full CRUD.' },
      ]},
      { name: 'Firestore', level: 5, usedIn: [
        { name: 'Law Firm System', type: 'experience', description: 'Real-time listeners for live case status updates and in-app notifications.' },
        { name: 'Presence+', type: 'experience', description: 'Stored attendance sessions and BLE scan results with real-time sync across devices.' },
      ]},
      { name: 'Supabase', level: 4, usedIn: [
        { name: 'Law Firm System', type: 'experience', description: 'Relational layer for document metadata and user profile storage.' },
      ]},
      { name: 'PostgreSQL', level: 3, usedIn: [
        { name: 'Academic Projects', type: 'education', description: 'Studied relational schema design, joins, transactions and indexing at NUST.' },
      ]},
    ],
  },
  {
    label: 'Mobile', icon: '📱', color: 'border-purple-500/30 bg-purple-500/5',
    skills: [
      { name: 'Flutter', level: 5, usedIn: [
        { name: 'Presence+', type: 'experience', description: 'Cross-platform app with separate teacher/student flows, BLE scanning and live session management.' },
        { name: 'Smart Image Enhancer', type: 'project', description: 'UI for uploading images, streaming real-time enhancement via WebSockets and viewing results.' },
      ]},
      { name: 'Dart', level: 5, usedIn: [
        { name: 'Presence+', type: 'experience', description: 'Core language for all app logic, state management and service architecture.' },
        { name: 'Smart Image Enhancer', type: 'project', description: 'Async Dart for WebSocket communication and reactive UI updates.' },
      ]},
      { name: 'MVVM Architecture', level: 4, usedIn: [
        { name: 'Presence+', type: 'experience', description: 'Separated BLE services, business logic ViewModels and UI layers for clean, testable code.' },
      ]},
      { name: 'BLE / Bluetooth', level: 4, usedIn: [
        { name: 'Presence+', type: 'experience', description: 'Teacher device broadcasts BLE; student devices scan, detect proximity and mark attendance automatically.' },
      ]},
    ],
  },
  {
    label: 'AI / Python', icon: '🤖', color: 'border-yellow-500/30 bg-yellow-500/5',
    skills: [
      { name: 'Python', level: 4, usedIn: [
        { name: 'Car Damage Detection', type: 'project', description: 'Python backend with YOLO for automated vehicle damage detection and web result display.' },
        { name: 'Smart Image Enhancer', type: 'project', description: 'Flask server running ESRGAN model for super-resolution image processing.' },
      ]},
      { name: 'Flask', level: 4, usedIn: [
        { name: 'Smart Image Enhancer', type: 'project', description: 'Handled image uploads, WebSocket streaming and ESRGAN inference pipeline.' },
        { name: 'Car Damage Detection', type: 'project', description: 'REST API wrapping the YOLO damage detection model for the web interface.' },
      ]},
      { name: 'YOLO', level: 3, usedIn: [
        { name: 'Car Damage Detection', type: 'project', description: 'Fine-tuned YOLOv8 for automated detection and localisation of vehicle body damage from images.' },
      ]},
      { name: 'WebSockets', level: 4, usedIn: [
        { name: 'Smart Image Enhancer', type: 'project', description: 'Real-time bidirectional streaming of enhanced image data between Flask server and Flutter client.' },
      ]},
    ],
  },
  {
    label: 'Tools', icon: '🔧', color: 'border-orange-500/30 bg-orange-500/5',
    skills: [
      { name: 'Git / GitHub', level: 5, usedIn: [
        { name: 'All Projects', type: 'project', description: 'Version control, branching, PRs and code reviews across every project and internship.' },
        { name: 'Law Firm Internship', type: 'experience', description: 'Managed the full project codebase on GitHub throughout the internship.' },
      ]},
      { name: 'Agile / Scrum', level: 4, usedIn: [
        { name: 'Law Firm Internship', type: 'experience', description: 'Sprint planning, daily standups and retrospectives throughout the internship.' },
        { name: 'Presence+', type: 'experience', description: 'Sprint-based development cycle with backlog grooming for FYP milestones.' },
      ]},
      { name: 'Trello / Jira', level: 4, usedIn: [
        { name: 'Law Firm Internship', type: 'experience', description: 'Trello boards for task tracking, sprint planning and handoffs.' },
      ]},
      { name: 'CI/CD', level: 3, usedIn: [
        { name: 'Vercel Deployments', type: 'project', description: 'Automated preview and production deployments via Vercel Git integration.' },
      ]},
      { name: 'OOP', level: 5, usedIn: [
        { name: 'All Projects', type: 'project', description: 'Encapsulation, inheritance and polymorphism applied across Dart, Python and JavaScript codebases.' },
      ]},
    ],
  },
];

const typeColors: Record<string, string> = {
  project:    'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
  experience: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
  education:  'bg-green-500/15 text-green-300 border-green-500/30',
};

// ─── 3D Draggable Icon (actual SVG icon) ──────────────────────────────────────
const DraggableIcon = ({ icon: Icon, accent }: { icon: IconType; accent: string }) => {
  const [rot, setRot] = useState({ x: 12, y: -12 });
  const [dragging, setDragging] = useState(false);
  const last = useRef({ x: 0, y: 0 });

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setDragging(true);
    last.current = { x: e.clientX, y: e.clientY };
  };

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!dragging) return;
    const dx = e.clientX - last.current.x;
    const dy = e.clientY - last.current.y;
    last.current = { x: e.clientX, y: e.clientY };
    setRot(prev => ({ x: prev.x - dy * 1.2, y: prev.y + dx * 1.2 }));
  }, [dragging]);

  const onMouseUp = () => setDragging(false);

  return (
    <div
      style={{ perspective: '400px', cursor: dragging ? 'grabbing' : 'grab' }}
      className="select-none"
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
    >
      <motion.div
        animate={{ rotateX: rot.x, rotateY: rot.y }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        style={{
          transformStyle: 'preserve-3d',
          width: 80, height: 80,
          borderRadius: 20,
          background: `radial-gradient(circle at 30% 25%, ${accent}33, rgba(17, 22, 37, 0.8))`,
          border: `1.5px solid ${accent}55`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: `
            0 -8px 16px 0 ${accent}22,
            0 12px 28px 0 #00000099,
            0 0 30px 0 ${accent}22,
            inset 0 1px 0 ${accent}55
          `,
        }}
      >
        <Icon size={40} color={accent} style={{ filter: `drop-shadow(0 0 8px ${accent}99)` }} />
      </motion.div>
    </div>
  );
};

// ─── Individual Skill Row (for filtered category views) ───────────────────────
const SkillRow = ({ skill }: { skill: Skill }) => {
  const [hovered, setHovered] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const meta = skillMeta[skill.name] ?? { icon: SiNodedotjs, accent: '#06B6D4' };

  const showTooltip = () => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    setHovered(true);
  };

  const scheduleHide = () => {
    hideTimer.current = setTimeout(() => setHovered(false), 200);
  };

  return (
    <div className="relative flex items-center gap-3">
      {/* Skill badge */}
      <motion.div
        className="flex-1 flex items-center justify-between px-4 py-2.5 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors duration-300 cursor-default"
        whileHover={{
          scale: 1.02,
          borderColor: `${meta.accent}44`,
          boxShadow: `0 4px 15px ${meta.accent}15`,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
        onMouseEnter={showTooltip}
        onMouseLeave={scheduleHide}
      >
        <span className="text-sm font-bold text-gray-200">{skill.name}</span>
        <div className="flex gap-1">
          {[1,2,3,4,5].map(d => (
            <div key={d} className="w-1.5 h-1.5 rounded-full transition-all" style={{ background: d <= skill.level ? meta.accent : 'rgba(255,255,255,0.1)' }} />
          ))}
        </div>
      </motion.div>

      {/* Tooltip — right side on desktop, below on mobile */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', stiffness: 350, damping: 20 }}
            className="
              absolute z-50
              top-full left-0 mt-2 w-[90vw] max-w-sm
              lg:top-1/2 lg:-translate-y-1/2 lg:left-full lg:mt-0 lg:ml-3 lg:w-auto lg:max-w-none
            "
            style={{ filter: `drop-shadow(0 10px 30px ${meta.accent}15)` }}
            onMouseEnter={showTooltip}
            onMouseLeave={scheduleHide}
          >
            {/* Arrow — only visible on desktop (lg) */}
            <div
              className="hidden lg:block absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[8px]"
              style={{ borderRightColor: 'rgba(17, 22, 37, 0.98)' }}
            />

            <div
              className="flex flex-col gap-4 bg-[#111625]/98 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl"
              style={{ width: 260 }}
            >
              {/* TOP: 3D draggable icon — centered, desktop only */}
              <div className="hidden lg:flex flex-col items-center justify-center gap-1.5">
                <DraggableIcon icon={meta.icon} accent={meta.accent} />
                <p className="text-[9px] text-gray-500 uppercase tracking-widest mt-1">Drag to rotate</p>
              </div>

              {/* BOTTOM: Usage descriptions */}
              <div>
                <p className="text-[10px] uppercase tracking-widest mb-2" style={{ color: meta.accent }}>Used In</p>
                <div className="flex flex-col gap-2">
                  {skill.usedIn.map((use) => (
                    <div key={use.name} className={`rounded-xl border px-3 py-2 ${typeColors[use.type]}`}>
                      <p className="text-[10px] font-black uppercase tracking-widest mb-0.5">{use.name}</p>
                      <p className="text-[11px] leading-snug opacity-80">{use.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Simple badge (for "All" view — with icon on the left) ───────────────────
const SkillBadge = ({ skill }: { skill: Skill }) => {
  const meta = skillMeta[skill.name] ?? { icon: SiNodedotjs, accent: '#06B6D4' };
  const Icon = meta.icon;

  return (
    <motion.div
      whileHover={{
        scale: 1.03,
        borderColor: `${meta.accent}aa`,
        backgroundColor: `${meta.accent}12`,
        boxShadow: `0 4px 20px ${meta.accent}15`,
      }}
      transition={{ type: 'spring', stiffness: 450, damping: 15 }}
      className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-sm font-semibold text-gray-200 cursor-default"
    >
      <Icon size={16} color={meta.accent} style={{ flexShrink: 0, filter: `drop-shadow(0 0 4px ${meta.accent}55)` }} />
      <span className="flex-1">{skill.name}</span>
      <span className="flex gap-1">
        {[1,2,3,4,5].map(d => (
          <span
            key={d}
            className="w-1.5 h-1.5 rounded-full transition-colors duration-300"
            style={{
              backgroundColor: d <= skill.level ? meta.accent : 'rgba(255,255,255,0.1)',
              boxShadow: d <= skill.level ? `0 0 6px ${meta.accent}` : 'none',
            }}
          />
        ))}
      </span>
    </motion.div>
  );
};

// ─── Main Section ──────────────────────────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
};

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const { isLowEnd, isMobile } = useDeviceCapability();
  const disableGlow = isMobile;
  const displayed = activeCategory
    ? skillCategories.filter(c => c.label === activeCategory)
    : skillCategories;

  return (
    <section id="skills" className="w-full py-24 px-6 md:px-12 bg-transparent text-white font-sans relative overflow-visible">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Heading */}
        <div className="text-center mb-16">
          <p className="text-xs font-bold tracking-[0.3em] text-cyan-500 uppercase mb-3">What I work with</p>
          <h2 className="text-4xl md:text-6xl font-extrabold">
            Skills &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Tech Stack</span>
          </h2>
          <p className="text-gray-400 mt-4 text-sm">
            {activeCategory ? 'Hover any skill — drag the icon in the tooltip to rotate it in 3D' : 'Select a category for interactive details'}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-14 bg-[#111625]/40 p-2 rounded-full border border-white/5 max-w-fit mx-auto backdrop-blur-md">
          <button
            onClick={() => setActiveCategory(null)}
            className={`relative px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
              activeCategory === null ? 'text-[#0b031b] z-10' : 'text-gray-400 hover:text-white'
            }`}
          >
            {activeCategory === null && (
              <motion.span
                layoutId="activeSkillTab"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                className="absolute inset-0 bg-cyan-400 rounded-full -z-10"
              />
            )}
            All
          </button>
          {skillCategories.map(cat => (
            <button
              key={cat.label}
              onClick={() => setActiveCategory(activeCategory === cat.label ? null : cat.label)}
              className={`relative px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                activeCategory === cat.label ? 'text-[#0b031b] z-10' : 'text-gray-400 hover:text-white'
              }`}
            >
              {activeCategory === cat.label && (
                <motion.span
                  layoutId="activeSkillTab"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  className="absolute inset-0 bg-cyan-400 rounded-full -z-10"
                />
              )}
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div
          key={activeCategory ?? 'all'}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
        >
          {displayed.map(cat => (
            <motion.div
              key={cat.label}
              layout
              variants={cardVariants}
              whileHover={{ y: -5 }}
            >
              <BorderGlow
                backgroundColor="#0d0d1a"
                borderRadius={24}
                glowColor="185 100 70"
                glowIntensity={1.2}
                glowRadius={36}
                edgeSensitivity={28}
                coneSpread={22}
                colors={['#22d3ee', '#a855f7', '#3b82f6']}
                disableTracking={disableGlow}
              >
                <div className="p-6 overflow-visible">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-2xl">{cat.icon}</span>
                    <h3 className="text-lg font-bold">{cat.label}</h3>
                  </div>

                  {/* ALL view: simple badges; FILTERED view: skill rows with tooltips */}
                  <div className="flex flex-col gap-3 overflow-visible">
                    {activeCategory === null
                      ? cat.skills.map(skill => (
                          <SkillBadge key={skill.name} skill={skill} />
                        ))
                      : cat.skills.map(skill => (
                          <SkillRow key={skill.name} skill={skill} />
                        ))
                    }
                  </div>
                </div>
              </BorderGlow>
            </motion.div>
          ))}
        </motion.div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-6 mt-12 text-[10px] uppercase tracking-widest">
          <span className="flex items-center gap-2 text-cyan-400"><span className="w-2 h-2 rounded-full bg-cyan-400" />Project</span>
          <span className="flex items-center gap-2 text-purple-400"><span className="w-2 h-2 rounded-full bg-purple-400" />Experience</span>
          <span className="flex items-center gap-2 text-green-400"><span className="w-2 h-2 rounded-full bg-green-400" />Education</span>
        </div>
      </div>
    </section>
  );
};

export default Skills;

