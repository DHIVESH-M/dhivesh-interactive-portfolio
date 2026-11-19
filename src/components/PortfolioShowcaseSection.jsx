import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { playHoverSound } from '../utils/audio';
import { GithubIcon } from './SocialIcons';
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// 3 Curated Signature Architecture Spotlights from Dhivesh's real work
const SPOTLIGHT_SYSTEMS = [
  {
    index: '01',
    category: 'AI & Multi-Agent Intelligence',
    title: 'SkillPath AI',
    tagline: 'Adaptive Career Gap Intelligence & Learning Roadmap Engine',
    description: 'An intelligent multi-agent platform analyzing user skill proficiency matrices, mapping labor-market career gaps, and generating individualized dynamic roadmaps with continuous evaluation loops.',
    technologies: ['Python', 'Custom Neural Models', 'Vector Pipelines', 'Algorithm Design'],
    metrics: [
      { label: 'Agent Coordination', val: 'Multi-Agent' },
      { label: 'Evaluation Speed', val: '< 180ms' },
      { label: 'Roadmap Accuracy', val: 'Adaptive' }
    ],
    github: 'https://github.com/DHIVESH-M',
    type: 'ai-agents'
  },
  {
    index: '02',
    category: 'Hardware IoT & Real-Time Telemetry',
    title: 'AquaShield',
    tagline: 'Edge IoT Hydro-Sensing & Groundwater Telemetry Platform',
    description: 'An end-to-end environmental sensing network capturing pH, turbidity, TDS, and water table levels via microcontroller edge nodes, broadcasting live telemetry alerts to prevent regional contamination.',
    technologies: ['C / Embedded Firmware', 'IoT Sensor Nodes', 'Telemetry Pipelines', 'Real-time Alerts'],
    metrics: [
      { label: 'Sensor Sampling', val: '10 Hz' },
      { label: 'Edge Protocol', val: 'MQTT / HTTP' },
      { label: 'Telemetry Uptime', val: 'Real-time' }
    ],
    github: 'https://github.com/DHIVESH-M',
    type: 'iot-telemetry'
  },
  {
    index: '03',
    category: 'Intelligent Cognitive Assistant',
    title: 'Mindspace AI',
    tagline: 'Adaptive Neural Wellness & Behavioral Pattern Assistant',
    description: 'A responsive cognitive support system employing natural language processing to track mood fluctuations, analyze emotional burnout markers, and provide context-aware guided interventions.',
    technologies: ['Python', 'NLP Embeddings', 'Pattern Classification', 'Secure Storage'],
    metrics: [
      { label: 'Sentiment Precision', val: 'High' },
      { label: 'Inference Mode', val: 'Client Edge' },
      { label: 'Privacy Guard', val: 'Zero Leakage' }
    ],
    github: 'https://github.com/DHIVESH-M',
    type: 'neural-health'
  }
];

export default function PortfolioShowcaseSection({ isReducedMotion = false }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [tiltStyle, setTiltStyle] = useState('');
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const ribbonRef = useRef(null);
  const headlineRef = useRef(null);
  const currentSystem = SPOTLIGHT_SYSTEMS[activeIdx];

  // GSAP Entrance Animations
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || isReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Headline reveal
      if (headlineRef.current) {
        gsap.fromTo(
          headlineRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 75%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // 2. Stage reveal
      if (stageRef.current) {
        gsap.fromTo(
          stageRef.current,
          { opacity: 0, y: 50, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // 3. Ribbon stroke reveal
      if (ribbonRef.current) {
        gsap.fromTo(
          ribbonRef.current,
          { strokeDashoffset: 1400, opacity: 0 },
          {
            strokeDashoffset: 0,
            opacity: 1,
            duration: 1.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, [isReducedMotion]);

  // Subtle 3D Perspective Tilt on Desktop Mouse Move
  const handleMouseMove = (e) => {
    if (isReducedMotion || window.innerWidth < 768) return;
    const stage = stageRef.current;
    if (!stage) return;

    const rect = stage.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const midX = rect.width / 2;
    const midY = rect.height / 2;

    const rotX = ((y - midY) / midY) * -5;
    const rotY = ((x - midX) / midX) * 5;

    setTiltStyle(`perspective(1200px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale3d(1.005, 1.005, 1.005)`);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.2
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle('perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % SPOTLIGHT_SYSTEMS.length);
    playHoverSound();
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + SPOTLIGHT_SYSTEMS.length) % SPOTLIGHT_SYSTEMS.length);
    playHoverSound();
  };

  const handleSelect = (idx) => {
    setActiveIdx(idx);
    playHoverSound();
  };

  const scrollToSection = (targetId) => {
    playHoverSound();
    const elem = document.getElementById(targetId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="showcase"
      ref={sectionRef}
      className="relative min-h-screen pt-28 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden select-none bg-[#07080b]"
      style={{
        backgroundImage: `
          radial-gradient(circle at 50% 30%, rgba(35, 30, 95, 0.4) 0%, rgba(12, 14, 25, 0.8) 55%, #07080b 95%),
          linear-gradient(180deg, rgba(7, 8, 11, 0.9) 0%, rgba(17, 19, 36, 0.4) 30%, rgba(17, 19, 36, 0.4) 70%, #07080b 100%)
        `
      }}
    >
      {/* Background Connecting Curved Silver Ribbon */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
        viewBox="0 0 1400 1000"
        fill="none"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="cinematicRibbonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.4" />
            <stop offset="35%" stopColor="#cbd5e1" stopOpacity="0.65" />
            <stop offset="70%" stopColor="#64748b" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#334155" stopOpacity="0.3" />
          </linearGradient>

          <filter id="ribbonGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="16" stdDeviation="30" floodColor="#1e1b4b" floodOpacity="0.5" />
          </filter>
        </defs>

        {/* Ambient shadow path */}
        <path
          d="M 1250 -60 C 1100 160, 960 240, 720 400 C 420 600, 260 760, 380 960 C 440 1060, 560 1120, 680 1200"
          stroke="#050710"
          strokeWidth="110"
          strokeLinecap="round"
          strokeOpacity="0.6"
          filter="blur(20px)"
          fill="none"
        />

        {/* Main Ribbon Strand */}
        <path
          ref={ribbonRef}
          d="M 1250 -60 C 1100 160, 960 240, 720 400 C 420 600, 260 760, 380 960 C 440 1060, 560 1120, 680 1200"
          stroke="url(#cinematicRibbonGrad)"
          strokeWidth="75"
          strokeLinecap="round"
          strokeDasharray="1600"
          strokeDashoffset="0"
          filter="url(#ribbonGlow)"
          fill="none"
        />

        {/* Specular Edge Highlight */}
        <path
          d="M 1250 -60 C 1100 160, 960 240, 720 400 C 420 600, 260 760, 380 960 C 440 1060, 560 1120, 680 1200"
          stroke="#ffffff"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeOpacity="0.35"
          fill="none"
        />
      </svg>

      {/* Subtle CRT Scanline Texture (Ultra-subtle, non-distracting) */}
      <div
        className="absolute inset-0 pointer-events-none z-10 opacity-15 mix-blend-overlay"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.3) 0px, rgba(0, 0, 0, 0.3) 1px, transparent 1px, transparent 3px)',
          backgroundSize: '100% 3px'
        }}
      />

      {/* Ambient Lighting Accents */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-6xl mx-auto relative z-20 flex flex-col items-center">
        {/* Cinematic Headline & Subtitle */}
        <div ref={headlineRef} className="text-center mb-10 sm:mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-300 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>THE LIVING SYSTEMS OF DHIVESH M</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight uppercase leading-none">
            <span>YOU NEED </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300">
              THIS PORTFOLIO
            </span>
          </h2>

          <p className="text-xs sm:text-sm font-mono text-slate-400 max-w-xl mx-auto leading-relaxed">
            Direct interactive architectural spotlight: where artificial intelligence, real-time IoT telemetry, and practical software converge.
          </p>

          {/* Interactive Mode Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-3">
            {SPOTLIGHT_SYSTEMS.map((sys, idx) => (
              <button
                key={sys.index}
                onClick={() => handleSelect(idx)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  activeIdx === idx
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-lg shadow-cyan-500/25 scale-105'
                    : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <span>{sys.index}</span>
                <span>&bull;</span>
                <span>{sys.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Primary Showcase Stage (Full-bleed 3D Perspective Card, No Fake Window) */}
        <div
          ref={stageRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: tiltStyle,
            transition: 'transform 0.15s ease-out'
          }}
          className="relative w-full rounded-3xl bg-[#0b0e17]/95 border border-white/15 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden backdrop-blur-xl group will-change-transform"
        >
          {/* Specular Glare Overlay */}
          <div
            className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-300 mix-blend-screen"
            style={{
              background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.2) 0%, transparent 55%)`,
              opacity: glarePos.opacity
            }}
          />

          {/* Stage Top Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 bg-[#080a11] border-b border-white/10 text-xs font-mono">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-cyan-300 font-bold tracking-wider">
                SPOTLIGHT {currentSystem.index} // {currentSystem.category.toUpperCase()}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                title="Previous System"
                className="p-2 rounded-xl bg-slate-900 border border-white/10 text-slate-400 hover:text-white hover:border-cyan-500/40 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                title="Next System"
                className="p-2 rounded-xl bg-slate-900 border border-white/10 text-slate-400 hover:text-white hover:border-cyan-500/40 transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Stage Core Content: Split Architecture Layout */}
          <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Interactive Schematic Vector Illustration */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="relative w-full h-64 sm:h-72 rounded-2xl bg-[#06080e] border border-white/10 p-4 flex items-center justify-center overflow-hidden group-hover:border-cyan-500/30 transition-colors">
                {/* Background grid */}
                <div 
                  className="absolute inset-0 opacity-20 pointer-events-none"
                  style={{
                    backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)',
                    backgroundSize: '24px 24px'
                  }}
                />

                {/* Vector Architecture Diagram */}
                <SystemArchitectureVisual type={currentSystem.type} />

                {/* System Badge */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#07080b]/90 border border-cyan-500/30 text-[10px] font-mono text-cyan-300 backdrop-blur-md">
                  {currentSystem.category}
                </div>
              </div>
            </div>

            {/* Right Column: Technical Architecture Details */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400">
                  <span>ARCHITECTURE BREAKDOWN</span>
                  <span>&bull;</span>
                  <span className="text-emerald-400">STATUS: VERIFIED BUILD</span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                  {currentSystem.title}
                </h3>

                <p className="text-sm font-mono text-cyan-300">
                  {currentSystem.tagline}
                </p>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                  {currentSystem.description}
                </p>
              </div>

              {/* Real Performance / Engineering Metrics */}
              <div className="grid grid-cols-3 gap-3">
                {currentSystem.metrics.map((m, mIdx) => (
                  <div key={mIdx} className="p-3 rounded-2xl bg-white/5 border border-white/5 text-center">
                    <div className="text-sm sm:text-base font-black text-cyan-400 font-mono">
                      {m.val}
                    </div>
                    <div className="text-[10px] font-mono text-slate-400 mt-0.5 truncate">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Technologies Applied */}
              <div className="space-y-2">
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                  Applied Technologies
                </div>
                <div className="flex flex-wrap gap-2">
                  {currentSystem.technologies.map((t, tidx) => (
                    <span
                      key={tidx}
                      className="px-2.5 py-1 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono text-cyan-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <button
                  onClick={() => scrollToSection('projects')}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs font-mono flex items-center gap-2 shadow-lg shadow-cyan-500/20 hover:from-cyan-400 hover:to-blue-500 transition-all cursor-pointer"
                >
                  <span>Explore All 6 Projects In Full Detail</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={currentSystem.github}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 hover:border-cyan-500/40 text-xs font-mono text-slate-300 hover:text-white flex items-center gap-2 transition-colors"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>Inspect Code</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Ground Baseline with Walking Cat Silhouette */}
      <div className="relative mt-16 max-w-6xl mx-auto">
        <div className="h-px bg-gradient-to-r from-transparent via-white/15 to-transparent w-full pointer-events-none" />

        <div className="relative w-full h-12 overflow-hidden pointer-events-none">
          <div
            className="absolute bottom-0 left-0 inline-block will-change-transform"
            style={{
              animation: isReducedMotion ? 'none' : 'catWalkAcross 16s linear infinite'
            }}
          >
            <img
              src="/images/walking-cat.webp"
              alt="Decorative Walking Cat Silhouette"
              className="w-20 sm:w-24 h-auto opacity-70 drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)]"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// Bespoke Vector Architectural Illustrations for the 3 Systems
function SystemArchitectureVisual({ type }) {
  if (type === 'ai-agents') {
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full max-w-[220px]" fill="none">
        {/* Central Core Agent */}
        <circle cx="100" cy="80" r="26" fill="#0c1020" stroke="#00f0ff" strokeWidth="2" />
        <circle cx="100" cy="80" r="16" fill="rgba(0, 240, 255, 0.15)" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 3" />
        <circle cx="100" cy="80" r="5" fill="#00f0ff" className="animate-pulse" />

        {/* Orbiting Satellite Sub-Agents */}
        <g className="animate-spin origin-center" style={{ animationDuration: '20s' }}>
          <circle cx="45" cy="45" r="14" fill="#0c1020" stroke="#3b82f6" strokeWidth="1.5" />
          <circle cx="45" cy="45" r="3" fill="#3b82f6" />
          <line x1="57" y1="55" x2="82" y2="70" stroke="rgba(0, 240, 255, 0.4)" strokeDasharray="2 2" />

          <circle cx="155" cy="45" r="14" fill="#0c1020" stroke="#818cf8" strokeWidth="1.5" />
          <circle cx="155" cy="45" r="3" fill="#818cf8" />
          <line x1="143" y1="55" x2="118" y2="70" stroke="rgba(0, 240, 255, 0.4)" strokeDasharray="2 2" />

          <circle cx="45" cy="115" r="14" fill="#0c1020" stroke="#10b981" strokeWidth="1.5" />
          <circle cx="45" cy="115" r="3" fill="#10b981" />
          <line x1="57" y1="105" x2="82" y2="90" stroke="rgba(0, 240, 255, 0.4)" strokeDasharray="2 2" />

          <circle cx="155" cy="115" r="14" fill="#0c1020" stroke="#f59e0b" strokeWidth="1.5" />
          <circle cx="155" cy="115" r="3" fill="#f59e0b" />
          <line x1="143" y1="105" x2="118" y2="90" stroke="rgba(0, 240, 255, 0.4)" strokeDasharray="2 2" />
        </g>
      </svg>
    );
  }

  if (type === 'iot-telemetry') {
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full max-w-[220px]" fill="none">
        {/* Hydro Wave Lines */}
        <path d="M 20 110 Q 55 90 90 110 T 160 110" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
        <path d="M 30 125 Q 65 105 100 125 T 170 125" stroke="#0284c7" strokeWidth="1.5" strokeOpacity="0.7" />

        {/* Microcontroller Edge Node Box */}
        <rect x="75" y="35" width="50" height="50" rx="10" fill="#0c1020" stroke="#00f0ff" strokeWidth="2" />
        <rect x="85" y="45" width="30" height="30" rx="6" fill="rgba(0, 240, 255, 0.1)" stroke="#38bdf8" strokeWidth="1" />
        <circle cx="100" cy="60" r="4" fill="#00f0ff" className="animate-pulse" />

        {/* Sensor Probe Lines extending into water */}
        <line x1="90" y1="85" x2="90" y2="120" stroke="#00f0ff" strokeWidth="1.5" strokeDasharray="3 3" />
        <line x1="110" y1="85" x2="110" y2="120" stroke="#00f0ff" strokeWidth="1.5" strokeDasharray="3 3" />

        {/* Radio Broadcast Waves */}
        <path d="M 70 25 A 35 35 0 0 1 130 25" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 2" />
        <path d="M 60 15 A 50 50 0 0 1 140 15" stroke="#0284c7" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.5" />
      </svg>
    );
  }

  // Neural health / Cognitive Assistant
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full max-w-[220px]" fill="none">
      {/* Neural Network Nodes */}
      <circle cx="50" cy="50" r="10" fill="#0c1020" stroke="#818cf8" strokeWidth="1.5" />
      <circle cx="50" cy="110" r="10" fill="#0c1020" stroke="#818cf8" strokeWidth="1.5" />

      <circle cx="100" cy="40" r="12" fill="#0c1020" stroke="#00f0ff" strokeWidth="2" />
      <circle cx="100" cy="80" r="14" fill="#0c1020" stroke="#38bdf8" strokeWidth="2" />
      <circle cx="100" cy="120" r="12" fill="#0c1020" stroke="#00f0ff" strokeWidth="2" />

      <circle cx="150" cy="60" r="11" fill="#0c1020" stroke="#a78bfa" strokeWidth="1.5" />
      <circle cx="150" cy="100" r="11" fill="#0c1020" stroke="#a78bfa" strokeWidth="1.5" />

      {/* Synaptic Interconnections */}
      <line x1="59" y1="53" x2="90" y2="43" stroke="rgba(0, 240, 255, 0.4)" strokeWidth="1" />
      <line x1="59" y1="56" x2="88" y2="76" stroke="rgba(0, 240, 255, 0.4)" strokeWidth="1" />
      <line x1="59" y1="105" x2="88" y2="84" stroke="rgba(0, 240, 255, 0.4)" strokeWidth="1" />
      <line x1="59" y1="108" x2="90" y2="117" stroke="rgba(0, 240, 255, 0.4)" strokeWidth="1" />

      <line x1="112" y1="43" x2="140" y2="57" stroke="rgba(129, 140, 248, 0.5)" strokeWidth="1" />
      <line x1="114" y1="80" x2="140" y2="65" stroke="rgba(129, 140, 248, 0.5)" strokeWidth="1" />
      <line x1="114" y1="80" x2="140" y2="95" stroke="rgba(129, 140, 248, 0.5)" strokeWidth="1" />
      <line x1="112" y1="117" x2="140" y2="103" stroke="rgba(129, 140, 248, 0.5)" strokeWidth="1" />

      {/* Pulse Center */}
      <circle cx="100" cy="80" r="4" fill="#00f0ff" className="animate-pulse" />
    </svg>
  );
}
