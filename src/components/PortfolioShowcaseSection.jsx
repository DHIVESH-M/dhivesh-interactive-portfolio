import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  personalInfo, 
  featuredProjects
} from '../data/portfolioData';
import { playHoverSound } from '../utils/audio';
import { LinkedinIcon } from './SocialIcons';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Sparkles, 
  ArrowUpRight,
  Shield,
  Terminal
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PREVIEW_SECTIONS = [
  { id: 'home', label: '01 // HOME', title: 'Introduction & Identity' },
  { id: 'about', label: '02 // ABOUT', title: 'Background & Philosophy' },
  { id: 'skills', label: '03 // SKILLS', title: 'Core Technical Arsenal' },
  { id: 'projects', label: '04 // PROJECTS', title: 'Real Practical Systems' },
  { id: 'contact', label: '05 // CONTACT', title: 'Get In Touch' },
];

export default function PortfolioShowcaseSection({ isReducedMotion = false }) {
  const [activeTab, setActiveTab] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [tiltStyle, setTiltStyle] = useState('');
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const sectionRef = useRef(null);
  const mockupRef = useRef(null);
  const ribbonRef = useRef(null);
  const headlineRef = useRef(null);
  const butterflyRef = useRef(null);
  const hashtagTopRef = useRef(null);
  const hashtagBottomRef = useRef(null);
  const catRef = useRef(null);

  // Auto-cycle through preview sections every 4.5 seconds
  useEffect(() => {
    if (!isAutoPlaying || isReducedMotion) return;

    const intervalTime = 4500;
    const stepTime = 50;
    const totalSteps = intervalTime / stepTime;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveTab((cur) => (cur + 1) % PREVIEW_SECTIONS.length);
          return 0;
        }
        return prev + (100 / totalSteps);
      });
    }, stepTime);

    return () => clearInterval(interval);
  }, [isAutoPlaying, isReducedMotion, activeTab]);

  // Entrance animations via GSAP ScrollTrigger
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || isReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Headline reveal
      if (headlineRef.current) {
        gsap.fromTo(
          headlineRef.current.children,
          { opacity: 0, y: 35, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      }

      // 2. Central Mockup scale & entrance
      if (mockupRef.current) {
        gsap.fromTo(
          mockupRef.current,
          { opacity: 0, scale: 0.88, y: 60 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      }

      // 3. Ribbon parallax
      if (ribbonRef.current) {
        gsap.fromTo(
          ribbonRef.current,
          { strokeDashoffset: 1200, opacity: 0 },
          {
            strokeDashoffset: 0,
            opacity: 1,
            duration: 1.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      }

      // 4. Hashtags float entrance
      if (hashtagTopRef.current) {
        gsap.fromTo(
          hashtagTopRef.current,
          { opacity: 0, scale: 0.7, rotation: -30 },
          {
            opacity: 0.95,
            scale: 1,
            rotation: -14,
            duration: 1.2,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: section,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      }

      if (hashtagBottomRef.current) {
        gsap.fromTo(
          hashtagBottomRef.current,
          { opacity: 0, scale: 0.6, rotation: 10 },
          {
            opacity: 0.85,
            scale: 1,
            rotation: -8,
            duration: 1.4,
            ease: 'back.out(1.2)',
            scrollTrigger: {
              trigger: section,
              start: 'top 65%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      }

      // 5. Butterfly entrance
      if (butterflyRef.current) {
        gsap.fromTo(
          butterflyRef.current,
          { opacity: 0, y: -40, scale: 0.6 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, [isReducedMotion]);

  // 3D Perspective Tilt on Desktop Mouse Move
  const handleMouseMove = (e) => {
    if (isReducedMotion || window.innerWidth < 768) return;
    const mockup = mockupRef.current;
    if (!mockup) return;

    const rect = mockup.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const midX = rect.width / 2;
    const midY = rect.height / 2;

    const rotX = ((y - midY) / midY) * -7;
    const rotY = ((x - midX) / midX) * 7;

    setTiltStyle(`perspective(1200px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale3d(1.01, 1.01, 1.01)`);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.25
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle('perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  const selectTab = (idx) => {
    setActiveTab(idx);
    setProgress(0);
    playHoverSound();
  };

  const nextTab = () => {
    setActiveTab((cur) => (cur + 1) % PREVIEW_SECTIONS.length);
    setProgress(0);
    playHoverSound();
  };

  const prevTab = () => {
    setActiveTab((cur) => (cur - 1 + PREVIEW_SECTIONS.length) % PREVIEW_SECTIONS.length);
    setProgress(0);
    playHoverSound();
  };

  const scrollToFullSection = (targetId) => {
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
      className="relative min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden select-none"
      style={{
        background: 'linear-gradient(180deg, #100e38 0%, #1e186b 20%, #342bb0 45%, #6366f1 70%, #a5b4fc 88%, #e2e8f0 100%)'
      }}
    >
      {/* CRT Scanline Overlay Texture */}
      <div 
        className="absolute inset-0 pointer-events-none z-10 opacity-30 mix-blend-overlay"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.25) 0px, rgba(0, 0, 0, 0.25) 1px, transparent 1px, transparent 3px)',
          backgroundSize: '100% 3px'
        }}
      />

      {/* Atmospheric Shifting Radial Light Blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[750px] bg-indigo-500/20 rounded-full blur-[140px] pointer-events-none animate-pulse" />
      <div className="absolute top-10 right-10 w-[450px] h-[450px] bg-blue-400/25 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-[550px] h-[550px] bg-purple-400/20 rounded-full blur-[130px] pointer-events-none" />

      {/* Large Smooth Curved Grey/Silver Ribbon (Reference Video Match) */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
        viewBox="0 0 1200 1200"
        fill="none"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="ribbonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d1d5db" stopOpacity="0.85" />
            <stop offset="35%" stopColor="#9ca3af" stopOpacity="0.75" />
            <stop offset="70%" stopColor="#6b7280" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#4b5563" stopOpacity="0.9" />
          </linearGradient>

          <filter id="ribbonShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="18" stdDeviation="24" floodColor="#090726" floodOpacity="0.6" />
          </filter>
        </defs>

        {/* 3D Ribbon Drop Shadow Path */}
        <path
          d="M 1050 -50 C 950 180, 820 260, 680 400 C 500 580, 320 720, 480 920 C 580 1040, 750 1120, 820 1250"
          stroke="#0b082e"
          strokeWidth="110"
          strokeLinecap="round"
          strokeOpacity="0.4"
          filter="blur(16px)"
          fill="none"
        />

        {/* Main Silver Curved Ribbon Band */}
        <path
          ref={ribbonRef}
          d="M 1050 -50 C 950 180, 820 260, 680 400 C 500 580, 320 720, 480 920 C 580 1040, 750 1120, 820 1250"
          stroke="url(#ribbonGrad)"
          strokeWidth="90"
          strokeLinecap="round"
          strokeDasharray="1600"
          strokeDashoffset="0"
          filter="url(#ribbonShadow)"
          fill="none"
        />

        {/* Specular Edge Highlight on Ribbon */}
        <path
          d="M 1050 -50 C 950 180, 820 260, 680 400 C 500 580, 320 720, 480 920 C 580 1040, 750 1120, 820 1250"
          stroke="#ffffff"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeOpacity="0.45"
          fill="none"
        />
      </svg>

      {/* Large Decorative Black Hashtag (Upper Right Area) */}
      <div 
        ref={hashtagTopRef}
        className="absolute top-8 right-4 sm:right-12 md:right-20 lg:right-28 pointer-events-none z-10 select-none"
        style={{
          transform: 'rotate(-14deg)',
          animation: isReducedMotion ? 'none' : 'floatAndBob 7s ease-in-out infinite'
        }}
      >
        <span 
          className="text-8xl sm:text-9xl md:text-[160px] lg:text-[210px] font-black text-black leading-none block tracking-tighter"
          style={{
            textShadow: '0 12px 35px rgba(0, 0, 0, 0.75), 0 0 10px rgba(0, 0, 0, 0.5)',
            WebkitTextStroke: '2px rgba(20, 15, 60, 0.6)'
          }}
        >
          #
        </span>
      </div>

      {/* Floating 3D Geometric/Origami Butterfly (Near Top Along Ribbon) */}
      <div 
        ref={butterflyRef}
        className="absolute top-20 right-[22%] sm:right-[26%] md:right-[30%] pointer-events-none z-20"
        style={{
          animation: isReducedMotion ? 'none' : 'butterflyHover 5s ease-in-out infinite'
        }}
      >
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
          {/* Butterfly Ambient Glow */}
          <div className="absolute inset-0 bg-blue-500/30 rounded-full blur-xl" />

          {/* 3D Origami Butterfly Wings */}
          <svg 
            viewBox="0 0 100 100" 
            className="w-full h-full drop-shadow-[0_12px_24px_rgba(10,5,40,0.8)]"
          >
            {/* Left Wing Facets */}
            <g className="origin-center" style={{ animation: isReducedMotion ? 'none' : 'wingFlapLeft 1.2s ease-in-out infinite alternate' }}>
              <polygon points="50,45 15,20 28,52" fill="#0b0f24" stroke="#38bdf8" strokeWidth="0.8" />
              <polygon points="50,45 28,52 20,78 45,62" fill="#1e1b4b" stroke="#60a5fa" strokeWidth="0.8" />
              <polygon points="50,45 45,62 50,85" fill="#312e81" stroke="#818cf8" strokeWidth="0.8" />
            </g>

            {/* Right Wing Facets */}
            <g className="origin-center" style={{ animation: isReducedMotion ? 'none' : 'wingFlapRight 1.2s ease-in-out infinite alternate' }}>
              <polygon points="50,45 85,20 72,52" fill="#0b0f24" stroke="#38bdf8" strokeWidth="0.8" />
              <polygon points="50,45 72,52 80,78 55,62" fill="#1e1b4b" stroke="#60a5fa" strokeWidth="0.8" />
              <polygon points="50,45 55,62 50,85" fill="#312e81" stroke="#818cf8" strokeWidth="0.8" />
            </g>

            {/* Central Spine */}
            <line x1="50" y1="35" x2="50" y2="88" stroke="#00f0ff" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="50" cy="35" r="3.5" fill="#00f0ff" />
          </svg>
        </div>
      </div>

      {/* Decorative Faint Stencil Watermark (Reference Style: "CODE_WITH_ME23") */}
      <div className="absolute top-[62%] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 opacity-15 select-none whitespace-nowrap">
        <span className="text-4xl sm:text-6xl md:text-8xl font-black font-mono tracking-[0.25em] text-white">
          DHIVESH_M // 2026
        </span>
      </div>

      {/* Section Content Wrapper */}
      <div className="max-w-6xl mx-auto relative z-20 flex flex-col items-center">
        {/* Animated Bold Headline */}
        <div ref={headlineRef} className="text-center mb-8 sm:mb-12 space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-mono font-bold text-white tracking-widest shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
            <span>INTERACTIVE PORTFOLIO ENGINE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white uppercase drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
            <span>YOU NEED </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-blue-200">
              THIS PORTFOLIO
            </span>
          </h2>

          <p className="text-xs sm:text-sm font-mono text-blue-100/90 max-w-xl mx-auto tracking-wide">
            Live interactive preview of actual systems, machine learning architectures, and creative technologies.
          </p>
        </div>

        {/* Central Framed Portfolio Browser / Display Mockup */}
        <div
          ref={mockupRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: tiltStyle,
            transition: 'transform 0.15s ease-out',
          }}
          className="relative w-full max-w-4xl rounded-3xl bg-[#090d18]/95 border-2 border-white/30 shadow-[0_25px_70px_rgba(10,5,40,0.6)] overflow-hidden backdrop-blur-xl group will-change-transform"
        >
          {/* Specular Glare Overlay */}
          <div
            className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-300 mix-blend-screen"
            style={{
              background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.28) 0%, transparent 60%)`,
              opacity: glarePos.opacity
            }}
          />

          {/* Device Top Chrome Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 bg-[#060913] border-b border-white/15 text-xs font-mono">
            {/* Traffic Lights */}
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/90 shadow-sm" />
              <span className="w-3 h-3 rounded-full bg-amber-500/90 shadow-sm" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/90 shadow-sm" />
              <span className="ml-3 text-[11px] text-slate-400 font-bold hidden sm:inline">
                DHIVESH_OS v2.4
              </span>
            </div>

            {/* URL Address Pill */}
            <div className="flex-1 max-w-md mx-2 px-3.5 py-1 rounded-full bg-slate-900/90 border border-white/10 text-[11px] text-slate-300 flex items-center justify-center gap-2 truncate shadow-inner">
              <Shield className="w-3 h-3 text-cyan-400 shrink-0" />
              <span className="text-cyan-300 font-medium">https://</span>
              <span className="text-white truncate">dhivesh.dev/portfolio/{PREVIEW_SECTIONS[activeTab].id}</span>
            </div>

            {/* Autoplay & Navigation Controls */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={prevTab}
                title="Previous Section"
                className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                title={isAutoPlaying ? "Pause Auto-Tour" : "Resume Auto-Tour"}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  isAutoPlaying 
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30' 
                    : 'bg-slate-800/80 text-slate-400 hover:text-white'
                }`}
              >
                {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>

              <button
                onClick={nextTab}
                title="Next Section"
                className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Preview Navigation Tabs & Timer Progress Bar */}
          <div className="relative bg-[#0b101e] border-b border-white/10">
            {/* Auto-cycle Progress Line */}
            {isAutoPlaying && (
              <div 
                className="absolute top-0 left-0 h-0.5 bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 transition-all duration-75"
                style={{ width: `${progress}%` }}
              />
            )}

            <div className="flex overflow-x-auto no-scrollbar px-3 py-2 gap-2">
              {PREVIEW_SECTIONS.map((tab, idx) => {
                const isActive = activeTab === idx;
                return (
                  <button
                    key={tab.id}
                    onClick={() => selectTab(idx)}
                    className={`px-3 py-1.5 rounded-xl text-[11px] font-mono font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md shadow-cyan-500/20'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dynamic Mockup Viewport Body */}
          <div className="relative p-6 sm:p-8 min-h-[380px] sm:min-h-[440px] flex flex-col justify-between">
            {/* VIEW 1: HOME PREVIEW */}
            {activeTab === 0 && (
              <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                  <div className="flex items-center gap-4">
                    <img
                      src="/images/profile.png"
                      alt="Dhivesh M Portrait"
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-cyan-400 shadow-lg shadow-cyan-500/20"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl sm:text-2xl font-black text-white">
                          {personalInfo.name}
                        </h3>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-[10px] font-mono text-emerald-300">
                          Active Builder
                        </span>
                      </div>
                      <p className="text-xs font-mono text-cyan-300">
                        {personalInfo.role}
                      </p>
                      <p className="text-[11px] font-mono text-slate-400">
                        {personalInfo.education.institution}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => scrollToFullSection('hero')}
                    className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-mono font-bold text-xs flex items-center gap-1.5 hover:bg-cyan-400 transition-colors shadow-md shadow-cyan-500/20 cursor-pointer"
                  >
                    <span>Experience Full Hero</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400">
                      Core Mission
                    </span>
                    <p className="text-sm font-semibold text-white leading-snug">
                      "{personalInfo.tagline}"
                    </p>
                    <p className="text-xs text-slate-300 font-light leading-relaxed">
                      Specializing in applied machine learning, neural reasoning models, hardware IoT integration, and creative 3D interfaces.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                      Engineering Metrics
                    </span>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="p-2 rounded-xl bg-black/40 border border-white/5">
                        <div className="text-lg font-black text-cyan-400">06</div>
                        <div className="text-[10px] font-mono text-slate-400">Systems</div>
                      </div>
                      <div className="p-2 rounded-xl bg-black/40 border border-white/5">
                        <div className="text-lg font-black text-blue-400">09</div>
                        <div className="text-[10px] font-mono text-slate-400">Core Tech</div>
                      </div>
                      <div className="p-2 rounded-xl bg-black/40 border border-white/5">
                        <div className="text-lg font-black text-emerald-400">100%</div>
                        <div className="text-[10px] font-mono text-slate-400">Hands-on</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* VIEW 2: ABOUT PREVIEW */}
            {activeTab === 1 && (
              <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-white">
                      About &amp; Academic Foundation
                    </h3>
                    <p className="text-xs font-mono text-cyan-400">
                      Rathinam College of Arts and Science &bull; Pollachi, Tamil Nadu
                    </p>
                  </div>
                  <button
                    onClick={() => scrollToFullSection('about')}
                    className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>View Section</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-3 text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                  <p>
                    I am an AI/ML developer focused on bringing algorithms into real-world action. Rather than stopping at notebook prototypes, I build full-stack interactive systems connecting custom machine learning pipelines to telemetry sensors, spatial visuals, and intuitive human experiences.
                  </p>
                  <p>
                    My background combines rigorous foundational programming in C and Java with machine learning workflows in Python, paired with 3D modeling in Blender and game prototyping in Unity.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="px-3 py-1 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono text-cyan-300">
                    &bull; Neural Models &amp; Inference
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-blue-950/40 border border-blue-500/30 text-xs font-mono text-blue-300">
                    &bull; Hardware Telemetry &amp; IoT
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-indigo-950/40 border border-indigo-500/30 text-xs font-mono text-indigo-300">
                    &bull; Creative 3D Environments
                  </span>
                </div>
              </div>
            )}

            {/* VIEW 3: SKILLS PREVIEW */}
            {activeTab === 2 && (
              <div className="space-y-5 animate-in fade-in zoom-in-95 duration-300">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-white">
                      Technical Skills &amp; Learning Frontiers
                    </h3>
                    <p className="text-xs font-mono text-cyan-400">
                      Exact 9 showcased skills &bull; No inflated percentages
                    </p>
                  </div>
                  <button
                    onClick={() => scrollToFullSection('skills')}
                    className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>View 3D Galaxy</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    { name: 'C', status: 'Project Applied', cat: 'Systems', color: 'border-cyan-500/40' },
                    { name: 'Java', status: 'Project Applied', cat: 'OOP', color: 'border-cyan-500/40' },
                    { name: 'Python', status: 'Project Applied', cat: 'AI/ML', color: 'border-cyan-500/40' },
                    { name: 'AI Model Building', status: 'Project Applied', cat: 'Deep Learning', color: 'border-cyan-500/40' },
                    { name: 'Real-Time Projects', status: 'Project Applied', cat: 'IoT & Telemetry', color: 'border-cyan-500/40' },
                    { name: 'Blender', status: 'Project Applied', cat: '3D Polygonal', color: 'border-cyan-500/40' },
                    { name: 'Adobe Illustrator', status: 'Project Applied', cat: 'Vector Identity', color: 'border-cyan-500/40' },
                    { name: 'Unity — Learning', status: 'Active Learner', cat: 'Spatial Simulation', color: 'border-amber-500/40' },
                    { name: 'AWS — Learning', status: 'Active Learner', cat: 'Cloud Deployment', color: 'border-amber-500/40' },
                  ].map((s, idx) => (
                    <div 
                      key={idx}
                      className={`p-3 rounded-2xl bg-white/5 border ${s.color} hover:bg-white/10 transition-colors`}
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
                        <span>{s.cat}</span>
                        <span className={s.status.includes('Learner') ? 'text-amber-300' : 'text-cyan-300'}>
                          {s.status.includes('Learner') ? 'Learner' : 'Core'}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white">
                        {s.name}
                      </h4>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* VIEW 4: PROJECTS PREVIEW */}
            {activeTab === 3 && (
              <div className="space-y-4 animate-in fade-in zoom-in-95 duration-300">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-white">
                      Featured Practical Systems
                    </h3>
                    <p className="text-xs font-mono text-cyan-400">
                      6 end-to-end engineered platforms
                    </p>
                  </div>
                  <button
                    onClick={() => scrollToFullSection('projects')}
                    className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>View All 6 Cards</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {featuredProjects.slice(0, 4).map((p) => (
                    <div
                      key={p.id}
                      className="p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/40 transition-colors group/card"
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                        <span className="text-cyan-400 font-bold">{p.badge}</span>
                        <span className="text-slate-400">{p.status}</span>
                      </div>
                      <h4 className="text-sm font-bold text-white group-hover/card:text-cyan-300 transition-colors">
                        {p.title}
                      </h4>
                      <p className="text-xs text-slate-300 font-light line-clamp-2 mt-1">
                        {p.tagline}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-2.5">
                        {p.technologies.slice(0, 3).map((t, tidx) => (
                          <span key={tidx} className="px-1.5 py-0.5 rounded bg-black/40 text-[9px] font-mono text-slate-300">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* VIEW 5: CONTACT PREVIEW */}
            {activeTab === 4 && (
              <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-white">
                      Let's Build Something Intelligent
                    </h3>
                    <p className="text-xs font-mono text-cyan-400">
                      Open for AI/ML engineering, internships &amp; collaborative builds
                    </p>
                  </div>
                  <button
                    onClick={() => scrollToFullSection('contact')}
                    className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Full Contact Form</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <a
                    href={`mailto:${personalInfo.contacts.email}`}
                    className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 hover:border-cyan-400 transition-colors flex items-center gap-3.5"
                  >
                    <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400">
                      <Terminal className="w-5 h-5" />
                    </div>
                    <div className="truncate">
                      <div className="text-[10px] font-mono uppercase text-slate-400">Direct Email</div>
                      <div className="text-sm font-bold text-white truncate">{personalInfo.contacts.email}</div>
                    </div>
                  </a>

                  <a
                    href={personalInfo.contacts.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-4 rounded-2xl bg-blue-950/30 border border-blue-500/30 hover:border-blue-400 transition-colors flex items-center gap-3.5"
                  >
                    <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-400">
                      <LinkedinIcon className="w-5 h-5" />
                    </div>
                    <div className="truncate">
                      <div className="text-[10px] font-mono uppercase text-slate-400">Professional Profile</div>
                      <div className="text-sm font-bold text-white truncate">LinkedIn / Dhivesh M</div>
                    </div>
                  </a>
                </div>

                <div className="flex items-center justify-between pt-2 text-xs font-mono text-slate-400">
                  <span>📍 Pollachi, Tamil Nadu, India</span>
                  <a
                    href={personalInfo.contacts.resumePdf}
                    target="_blank"
                    rel="noreferrer"
                    className="text-cyan-400 hover:text-white underline"
                  >
                    Download Official Resume (PDF) &rarr;
                  </a>
                </div>
              </div>
            )}

            {/* Bottom Preview Controls Bar */}
            <div className="pt-4 mt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-slate-300">Section {activeTab + 1} of {PREVIEW_SECTIONS.length}</span>
              </span>

              <div className="flex items-center gap-3">
                <span className="hidden sm:inline text-slate-400">Click tabs or arrows to inspect</span>
                <button
                  onClick={() => scrollToFullSection(PREVIEW_SECTIONS[activeTab].id)}
                  className="text-cyan-300 hover:text-white flex items-center gap-1 font-bold cursor-pointer"
                >
                  <span>Explore In Full Page</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Large Decorative Secondary Hashtag (Lower Left Area - Blurred in Background) */}
      <div 
        ref={hashtagBottomRef}
        className="absolute bottom-6 left-2 sm:left-6 md:left-12 pointer-events-none z-10 select-none"
        style={{
          transform: 'rotate(-8deg)',
          filter: 'blur(3px)',
          animation: isReducedMotion ? 'none' : 'floatAndBobSlow 9s ease-in-out infinite'
        }}
      >
        <span 
          className="text-7xl sm:text-9xl md:text-[140px] lg:text-[180px] font-black text-black leading-none block tracking-tighter opacity-80"
          style={{
            textShadow: '0 8px 30px rgba(0, 0, 0, 0.7)'
          }}
        >
          #
        </span>
      </div>

      {/* Walking Black Cat Silhouette Along the Lower Area (Reference Video Match) */}
      <div 
        ref={catRef}
        className="absolute bottom-2 sm:bottom-4 left-0 w-full pointer-events-none z-20 overflow-hidden select-none"
      >
        {/* Subtle Faint Floor Ambient Line */}
        <div className="absolute bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />

        {/* Animated Walking Cat Moving Horizontally Across the Screen */}
        <div 
          className="relative inline-block will-change-transform"
          style={{
            animation: isReducedMotion ? 'none' : 'catWalkAcross 14s linear infinite',
          }}
        >
          <img
            src="/images/walking-cat.webp"
            alt="Decorative Walking Cat Silhouette"
            className="w-24 sm:w-28 md:w-32 h-auto select-none pointer-events-none drop-shadow-[0_8px_16px_rgba(10,5,35,0.7)]"
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
}
