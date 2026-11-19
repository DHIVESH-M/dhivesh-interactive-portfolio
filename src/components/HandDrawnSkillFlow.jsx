import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { playHoverSound } from '../utils/audio';
import { Sparkles, Terminal } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// The exact required skills list in sequence
const SKILL_JOURNEY_NODES = [
  {
    id: 'c',
    name: 'C',
    category: 'Programming',
    type: 'Project Applied',
    status: 'Core Foundation',
    annotation: 'Procedural roots & memory architecture',
    description: 'Low-level systems programming, embedded firmware logic, and efficient algorithm design applied in hardware systems.',
    color: '#38bdf8',
    side: 'left'
  },
  {
    id: 'java',
    name: 'Java',
    category: 'Programming',
    type: 'Project Applied',
    status: 'Core Foundation',
    annotation: 'Object-oriented engineering & data structures',
    description: 'Modular application logic, object-oriented design patterns, multithreading, and algorithmic problem solving.',
    color: '#00f0ff',
    side: 'right'
  },
  {
    id: 'python',
    name: 'Python',
    category: 'Programming',
    type: 'Project Applied',
    status: 'Core AI Scripting',
    annotation: 'Data processing & model orchestration',
    description: 'Core scripting for data analysis, neural network pipelines, computer vision prototypes, and automated workflows.',
    color: '#60a5fa',
    side: 'left'
  },
  {
    id: 'ai-model-building',
    name: 'AI Model Building',
    category: 'Artificial Intelligence',
    type: 'Project Applied',
    status: 'Specialized Domain',
    annotation: 'Custom architectures & parameter tuning',
    description: 'Designing custom neural models, feature engineering, classification routines, and mathematical model calibration.',
    color: '#00f0ff',
    side: 'right'
  },
  {
    id: 'real-time-projects',
    name: 'Real-Time Projects',
    category: 'Artificial Intelligence',
    type: 'Project Applied',
    status: 'Hardware + Intelligence',
    annotation: 'Sensor integration & edge inference',
    description: 'Deploying real-time intelligence into physical systems: ESP32 telemetry in AquaShield and emergency crash beacons in Road Safety SOS.',
    color: '#38bdf8',
    side: 'left'
  },
  {
    id: 'blender',
    name: 'Blender',
    category: 'Creative Technologies',
    type: 'Project Applied',
    status: '3D Spatial Design',
    annotation: 'Polygonal hard-surface & assets',
    description: '3D asset modeling, mechanical enclosure drafting, scene lighting, material shading, and visual rendering.',
    color: '#f97316',
    side: 'right'
  },
  {
    id: 'illustrator',
    name: 'Adobe Illustrator',
    category: 'Creative Technologies',
    type: 'Project Applied',
    status: 'Visual Identity',
    annotation: 'Vector iconography & layout systems',
    description: 'Crafting brand identity assets, vector technical schematics, UI components, and agricultural marketplace diagrams.',
    color: '#f59e0b',
    side: 'left'
  },
  {
    id: 'unity',
    name: 'Unity — Learning',
    category: 'Creative Technologies',
    type: 'Learner',
    status: 'Active Learner',
    annotation: 'Game mechanics & 3D simulations',
    description: 'Exploring game loops, physics engines, C# scripting, spatial interactions, and virtual environment prototyping.',
    color: '#fbbf24',
    side: 'right'
  },
  {
    id: 'aws',
    name: 'AWS — Learning',
    category: 'Cloud Computing',
    type: 'Learner',
    status: 'Active Learner',
    annotation: 'Cloud infrastructure & deployment',
    description: 'Learning scalable compute fundamentals, cloud storage, container deployment, and serverless hosting on Amazon Web Services.',
    color: '#fbbf24',
    side: 'left'
  }
];

export default function HandDrawnSkillFlow() {
  const containerRef = useRef(null);
  const pathRef = useRef(null);
  const glowPathRef = useRef(null);
  const rocketRef = useRef(null);
  const mobileRocketRef = useRef(null);

  useEffect(() => {
    const path = pathRef.current;
    const glowPath = glowPathRef.current;
    const container = containerRef.current;
    const rocket = rocketRef.current;
    const mobileRocket = mobileRocketRef.current;
    if (!path || !container) return;

    const pathLength = path.getTotalLength();

    // Set initial dasharray & dashoffset for hand-drawn stroke animation
    path.style.strokeDasharray = `${pathLength}`;
    path.style.strokeDashoffset = `${pathLength}`;
    if (glowPath) {
      glowPath.style.strokeDasharray = `${pathLength}`;
      glowPath.style.strokeDashoffset = `${pathLength}`;
    }

    // Master function to sync the rocket and path with scroll progress
    const updateRocket = (progress) => {
      const p = Math.max(0, Math.min(1, progress));
      const offset = pathLength * (1 - p);
      path.style.strokeDashoffset = `${offset}`;
      if (glowPath) {
        glowPath.style.strokeDashoffset = `${offset}`;
      }

      // Desktop Rocket position & tangent angle
      if (rocket) {
        const len = p * pathLength;
        const pt = path.getPointAtLength(len);
        const p1 = path.getPointAtLength(Math.max(0, len - 3));
        const p2 = path.getPointAtLength(Math.min(pathLength, len + 3));
        const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) * (180 / Math.PI);

        rocket.style.opacity = '1';
        rocket.setAttribute('transform', `translate(${pt.x.toFixed(2)}, ${pt.y.toFixed(2)}) rotate(${angle.toFixed(2)}) scale(2.2)`);
      }

      // Mobile Rocket follower
      if (mobileRocket) {
        mobileRocket.style.top = `${(p * 96 + 2).toFixed(1)}%`;
        mobileRocket.style.opacity = '1';
      }
    };

    // Position rocket immediately at the start of the path so it is never hidden
    updateRocket(0);

    const st = ScrollTrigger.create({
      trigger: container,
      start: 'top 85%',
      end: 'bottom 65%',
      scrub: 0.6,
      onUpdate: (self) => {
        updateRocket(self.progress);
      }
    });

    // Refresh ScrollTrigger once everything is mounted
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
      updateRocket(st.progress || 0);
    }, 250);

    return () => {
      clearTimeout(refreshTimer);
      st.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-6xl mx-auto py-8 px-4">
      {/* Legend & Navigation Guide */}
      <div className="flex flex-wrap items-center justify-center gap-6 pb-12 text-xs font-mono">
        <span className="flex items-center gap-2 text-cyan-300">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,240,255,0.8)]" />
          <span>Project Applied (Core Expertise)</span>
        </span>
        <span className="flex items-center gap-2 text-amber-300">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
          <span>Active Learning Frontier</span>
        </span>
      </div>

      {/* Relative Timeline Track with Hand-Drawn SVG Spine */}
      <div className="relative">
        {/* Desktop Serpentine Hand-Drawn SVG Path */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none hidden md:block overflow-visible"
          viewBox="0 0 1000 1900"
          fill="none"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="handDrawnGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#00f0ff" />
              <stop offset="30%" stopColor="#3b82f6" />
              <stop offset="60%" stopColor="#00f0ff" />
              <stop offset="85%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#fbbf24" />
            </linearGradient>

            {/* Filter for subtle hand-drawn organic jitter */}
            <filter id="handSketchFilter" x="-10%" y="-10%" width="120%" height="120%">
              <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
            </filter>

            {/* Glowing marker head */}
            <radialGradient id="arrowGlow">
              <stop offset="0%" stopColor="#00f0ff" stopOpacity="1" />
              <stop offset="100%" stopColor="#00f0ff" stopOpacity="0" />
            </radialGradient>

            {/* Rocket Thruster & Hull Gradients */}
            <linearGradient id="rocketFuselageGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0b1329" />
              <stop offset="45%" stopColor="#1e293b" />
              <stop offset="85%" stopColor="#e2e8f0" />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>

            <linearGradient id="rocketFirePlumeOuter" x1="100%" y1="0%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="15%" stopColor="#ffea00" />
              <stop offset="35%" stopColor="#ff5500" />
              <stop offset="70%" stopColor="#dc2626" />
              <stop offset="100%" stopColor="#7f1d1d" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="rocketFirePlumeMid" x1="100%" y1="0%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="25%" stopColor="#00f5ff" />
              <stop offset="55%" stopColor="#ffdd00" />
              <stop offset="85%" stopColor="#ff4400" />
              <stop offset="100%" stopColor="#ff0000" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="rocketCanopyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00f5ff" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>

            <radialGradient id="rocketIntenseFireGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="18%" stopColor="#00f5ff" stopOpacity="0.95" />
              <stop offset="40%" stopColor="#ffaa00" stopOpacity="0.85" />
              <stop offset="70%" stopColor="#ff2200" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>

            <filter id="rocketGlowFilter" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background Guide Line (Faint dotted sketch) */}
          <path
            d="M 500 20 C 260 120, 240 220, 320 320 C 420 440, 760 380, 700 520 C 640 660, 240 600, 300 750 C 360 900, 760 840, 710 980 C 660 1120, 250 1060, 300 1200 C 350 1340, 750 1280, 700 1420 C 650 1560, 260 1500, 310 1640 C 360 1780, 740 1720, 680 1860"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="3"
            strokeDasharray="6 6"
            fill="none"
          />

          {/* Ambient Glow Trail */}
          <path
            ref={glowPathRef}
            d="M 500 20 C 260 120, 240 220, 320 320 C 420 440, 760 380, 700 520 C 640 660, 240 600, 300 750 C 360 900, 760 840, 710 980 C 660 1120, 250 1060, 300 1200 C 350 1340, 750 1280, 700 1420 C 650 1560, 260 1500, 310 1640 C 360 1780, 740 1720, 680 1860"
            stroke="#00f0ff"
            strokeWidth="8"
            strokeLinecap="round"
            strokeOpacity="0.3"
            filter="blur(8px)"
            fill="none"
          />

          {/* Main Hand-Drawn Inking Stroke */}
          <path
            ref={pathRef}
            d="M 500 20 C 260 120, 240 220, 320 320 C 420 440, 760 380, 700 520 C 640 660, 240 600, 300 750 C 360 900, 760 840, 710 980 C 660 1120, 250 1060, 300 1200 C 350 1340, 750 1280, 700 1420 C 650 1560, 260 1500, 310 1640 C 360 1780, 740 1720, 680 1860"
            stroke="url(#handDrawnGrad)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#handSketchFilter)"
            fill="none"
          />

          {/* Animated 3D Cyber Rocket Surfing Along the Path Tangent */}
          <g ref={rocketRef} id="journeyRocket" className="pointer-events-none" style={{ opacity: 1, willChange: 'transform' }}>
            {/* Intense Radiant Engine Blaze Aura */}
            <circle cx="-22" cy="0" r="54" fill="url(#rocketIntenseFireGlow)" className="rocket-thruster-blaze" />
            
            {/* Blazing Roaring Fire Jet Plume Blasting From Back */}
            <g id="rocketFireJet" className="pointer-events-none">
              {/* Outer Roaring Thermal Fire Plume */}
              <path
                d="M -19 -14 Q -55 -22 -115 0 Q -55 22 -19 14 Z"
                fill="url(#rocketFirePlumeOuter)"
                filter="url(#rocketGlowFilter)"
                className="rocket-flame-outer"
              />
              
              {/* Top Side Flame Flare Tongue */}
              <path
                d="M -19 -10 Q -52 -25 -88 -11 Q -48 -5 -19 -6 Z"
                fill="#ff3700"
                opacity="0.95"
                className="rocket-flame-outer"
              />
              
              {/* Bottom Side Flame Flare Tongue */}
              <path
                d="M -19 10 Q -52 25 -88 11 Q -48 5 -19 6 Z"
                fill="#ff3700"
                opacity="0.95"
                className="rocket-flame-outer"
              />

              {/* Middle Golden-Yellow Blazing Core Plume */}
              <path
                d="M -19 -9 Q -48 -11 -82 0 Q -48 11 -19 9 Z"
                fill="url(#rocketFirePlumeMid)"
                filter="url(#rocketGlowFilter)"
                className="rocket-flame-mid"
              />

              {/* Cyan Hyperdrive Supersonic Jet Stream */}
              <path
                d="M -19 -5 Q -38 -4 -60 0 Q -38 4 -19 5 Z"
                fill="#00f5ff"
                filter="url(#rocketGlowFilter)"
                className="rocket-flame-mid"
              />

              {/* Superheated White-Hot Ignition Needle */}
              <path
                d="M -19 -2.5 Q -30 -1.5 -44 0 Q -30 1.5 -19 2.5 Z"
                fill="#ffffff"
                className="rocket-flame-core"
              />

              {/* Mach Shock Diamonds in Exhaust Plume */}
              <polygon points="-30,0 -34,-4 -38,0 -34,4" fill="#ffffff" stroke="#00f5ff" strokeWidth="1" filter="drop-shadow(0 0 6px #00f5ff)" />
              <polygon points="-48,0 -52,-3.2 -56,0 -52,3.2" fill="#ffffff" stroke="#00f5ff" strokeWidth="0.8" opacity="0.95" />
              <polygon points="-66,0 -70,-2.5 -74,0 -70,2.5" fill="#ffea00" stroke="#ff4500" strokeWidth="0.8" opacity="0.9" />
              <polygon points="-84,0 -87,-1.8 -90,0 -87,1.8" fill="#ff4500" opacity="0.8" />
            </g>

            {/* High-Velocity Ejected Fiery Sparks & Burning Embers */}
            <g transform="translate(-20, 0)">
              <circle cx="0" cy="-4" r="2.8" fill="#ffea00" className="rocket-spark-1" filter="drop-shadow(0 0 6px #ffea00)" />
              <circle cx="0" cy="4" r="2.4" fill="#ff4500" className="rocket-spark-2" filter="drop-shadow(0 0 6px #ff4500)" />
              <circle cx="0" cy="-1" r="3" fill="#00f5ff" className="rocket-spark-3" filter="drop-shadow(0 0 6px #00f5ff)" />
              <circle cx="0" cy="6" r="2.2" fill="#ff6b00" className="rocket-spark-4" filter="drop-shadow(0 0 6px #ff6b00)" />
              <circle cx="0" cy="-8" r="2" fill="#ffffff" className="rocket-spark-2" filter="drop-shadow(0 0 4px #ffffff)" />
              <circle cx="0" cy="2" r="1.8" fill="#ff0055" className="rocket-spark-1" />
              <circle cx="0" cy="-3" r="1.5" fill="#f59e0b" className="rocket-spark-3" />
            </g>

            {/* Delta Wings & Stabilizers */}
            <path d="M -6 -9 L -22 -24 L -15 -9 Z" fill="#0369a1" stroke="#38bdf8" strokeWidth="1.5" />
            <path d="M -16 -17 L -6 -9" stroke="#00f5ff" strokeWidth="1.2" />
            
            <path d="M -6 9 L -22 24 L -15 9 Z" fill="#0369a1" stroke="#38bdf8" strokeWidth="1.5" />
            <path d="M -16 17 L -6 9" stroke="#00f5ff" strokeWidth="1.2" />

            {/* Engine Bell Nozzle */}
            <rect x="-19" y="-6.5" width="5" height="13" rx="2" fill="#1e293b" stroke="#00f5ff" strokeWidth="1.2" />

            {/* Main Fuselage Body */}
            <path
              d="M -16 -10.5 L 9 -10.5 Q 30 -7.5 42 0 Q 30 7.5 9 10.5 L -16 10.5 Z"
              fill="url(#rocketFuselageGrad)"
              stroke="#00f5ff"
              strokeWidth="2"
              filter="drop-shadow(0 0 14px rgba(0, 245, 255, 0.9))"
            />

            {/* Cyber Armor Seams */}
            <line x1="-3" y1="-9.5" x2="-3" y2="9.5" stroke="rgba(0, 245, 255, 0.7)" strokeWidth="1.2" />
            <line x1="10" y1="-9" x2="10" y2="9" stroke="rgba(0, 245, 255, 0.5)" strokeWidth="1.2" />

            {/* Cockpit Canopy Window */}
            <ellipse cx="16" cy="0" rx="8.5" ry="4.5" fill="url(#rocketCanopyGrad)" stroke="#38bdf8" strokeWidth="1.4" />
            <ellipse cx="18" cy="-1.5" rx="4" ry="1.6" fill="#ffffff" opacity="0.95" />

            {/* Racing Speed Stripe */}
            <line x1="-12" y1="0" x2="5" y2="0" stroke="#f43f5e" strokeWidth="2.2" strokeLinecap="round" />

            {/* Nose Tip Laser Beacon Sparkle */}
            <circle cx="42" cy="0" r="3" fill="#ffffff" filter="drop-shadow(0 0 10px #00f5ff)" />
          </g>
        </svg>

        {/* Mobile Vertical Flow Spine & Mobile Rocket Follower */}
        <div className="absolute left-6 top-4 bottom-4 w-1 bg-gradient-to-b from-cyan-400 via-blue-500 to-amber-400 md:hidden rounded-full shadow-[0_0_12px_rgba(0,240,255,0.6)]" />
        
        {/* Mobile Animated Rocket Icon with Blazing Fire Exhaust */}
        <div
          ref={mobileRocketRef}
          className="absolute left-6 -translate-x-1/2 md:hidden z-30 pointer-events-none transition-all duration-75"
          style={{ top: '2%', opacity: 1 }}
        >
          <div className="relative w-10 h-10 rounded-full bg-[#070b18] border-2 border-cyan-400 shadow-[0_0_20px_#00f5ff] flex items-center justify-center text-lg rotate-90">
            {/* Blazing Flame Exhaust Behind Mobile Rocket */}
            <span className="absolute -left-3 w-4 h-2 bg-gradient-to-l from-yellow-300 via-orange-500 to-transparent rounded-full animate-pulse filter blur-[1px]" />
            🚀
          </div>
        </div>

        {/* Skill Milestone Cards positioned along the path */}
        <div className="relative z-10 space-y-12 md:space-y-20">
          {SKILL_JOURNEY_NODES.map((skill, idx) => {
            const isLeft = skill.side === 'left';
            const isLearner = skill.type === 'Learner';

            return (
              <div
                key={skill.id}
                onMouseEnter={playHoverSound}
                className={`relative flex flex-col md:flex-row items-center ${
                  isLeft ? 'md:justify-start' : 'md:justify-end'
                } group`}
              >
                {/* Node Card */}
                <div
                  className={`w-full md:w-[46%] pl-14 md:pl-0 ${
                    isLeft ? 'md:pr-10' : 'md:pl-10'
                  }`}
                >
                  <div className="relative p-6 rounded-3xl glass-panel border border-white/10 hover:border-cyan-400/50 hover:shadow-[0_10px_35px_rgba(0,240,255,0.2)] transition-all duration-300 group-hover:scale-[1.02]">
                    {/* Hand-Drawn Sketch Indicator Tag */}
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-xs font-mono">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold text-cyan-400">
                          0{idx + 1} &bull; {skill.category}
                        </span>
                      </div>
                      <span
                        className={`text-[10px] px-2.5 py-0.5 rounded-full border ${
                          isLearner
                            ? 'bg-amber-950/50 border-amber-500/40 text-amber-300'
                            : 'bg-cyan-950/50 border-cyan-500/40 text-cyan-300'
                        }`}
                      >
                        {skill.status}
                      </span>
                    </div>

                    {/* Skill Title & Icon */}
                    <div className="flex items-start gap-4 mb-3">
                      <div className="w-12 h-12 rounded-2xl bg-[#090e1a] border border-cyan-500/30 flex items-center justify-center shrink-0 group-hover:border-cyan-400 group-hover:scale-110 shadow-md shadow-cyan-500/10 transition-all">
                        <SkillBespokeIcon id={skill.id} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="text-xl sm:text-2xl font-black text-white group-hover:text-cyan-300 transition-colors">
                          {skill.name}
                        </h4>
                        <div className="text-[11px] font-mono text-cyan-400/90 italic mt-0.5">
                          {skill.annotation}
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                      {skill.description}
                    </p>

                    {/* Hand-Drawn Sketch Accent in Card Corner */}
                    <svg
                      className="absolute bottom-2 right-2 w-10 h-10 pointer-events-none opacity-20 group-hover:opacity-60 transition-opacity"
                      viewBox="0 0 40 40"
                      fill="none"
                    >
                      <path d="M 5 35 Q 20 20 35 35" stroke="#00f0ff" strokeWidth="1.5" strokeDasharray="3 2" />
                      <path d="M 35 15 L 35 35 L 15 35" stroke="#00f0ff" strokeWidth="1" />
                    </svg>
                  </div>
                </div>

                {/* Hand-Drawn Connecting Milestone Dot (Mobile left-anchored, Desktop center-anchored) */}
                <div className="absolute left-6 md:left-1/2 top-8 md:top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center pointer-events-none">
                  {/* Organic Sketch Rings */}
                  <div className="relative w-9 h-9 rounded-full bg-[#07080b] border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.7)] group-hover:scale-125 transition-transform">
                    <div
                      className={`w-3.5 h-3.5 rounded-full ${
                        isLearner ? 'bg-amber-400' : 'bg-cyan-400'
                      } animate-pulse`}
                    />
                    {/* Hand-drawn scribble ring */}
                    <div className="absolute -inset-1 rounded-full border border-cyan-400/40 border-dashed animate-spin" style={{ animationDuration: '8s' }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Final Path Destination: Continuous Learning Horizon */}
        <div className="pt-16 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-slate-900/90 border border-cyan-500/40 text-xs font-mono text-cyan-300 shadow-xl shadow-cyan-500/20 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>CONTINUOUS LEARNING &bull; ALWAYS EXPERIMENTING</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Custom Bespoke Vector Icons for all exact required skills
function SkillBespokeIcon({ id }) {
  switch (id) {
    case 'c':
      return (
        <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
          <path d="M22 10 C20 7 14 7 11 11 C8 15 8 20 11 23 C14 26 20 26 23 23" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="16" cy="16" r="2" fill="#00F0FF" />
        </svg>
      );
    case 'java':
      return (
        <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
          <path d="M12 24 C14 26 18 26 20 24 M10 20 C14 22 20 22 23 20" stroke="#00F0FF" strokeWidth="2" strokeLinecap="round" />
          <path d="M14 14 Q18 10 16 6 M18 13 Q22 9 20 5" stroke="#F97316" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M9 27 C13 28 20 28 24 27" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'python':
      return (
        <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
          <path d="M16 6 C11 6 10 8 10 11 L10 13 H16 V15 H8 C6 15 5 17 5 21 C5 24 7 26 11 26 L12 26 V24 C12 21 14 20 17 20 H20 V18 C20 14 18 13 14 13 H12 V11 C12 8 14 7 16 7 Z" fill="#38BDF8" opacity="0.85" />
          <circle cx="13" cy="9.5" r="1.2" fill="#FFFFFF" />
          <path d="M16 26 C21 26 22 24 22 21 L22 19 H16 V17 H24 C26 17 27 15 27 11 C27 8 25 6 21 6 L20 6 V8 C20 11 18 12 15 12 H12 V14 C12 18 14 19 18 19 H20 V21 C20 24 18 25 16 25 Z" fill="#FACC15" opacity="0.85" />
          <circle cx="19" cy="22.5" r="1.2" fill="#FFFFFF" />
        </svg>
      );
    case 'ai-model-building':
      return (
        <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
          <circle cx="8" cy="10" r="2.5" fill="#00F0FF" />
          <circle cx="8" cy="22" r="2.5" fill="#00F0FF" />
          <circle cx="16" cy="16" r="3" fill="#3B82F6" stroke="#00F0FF" strokeWidth="1.5" />
          <circle cx="24" cy="10" r="2.5" fill="#00F0FF" />
          <circle cx="24" cy="22" r="2.5" fill="#00F0FF" />
          <line x1="10" y1="11" x2="14" y2="15" stroke="#38BDF8" strokeWidth="1.5" />
          <line x1="10" y1="21" x2="14" y2="17" stroke="#38BDF8" strokeWidth="1.5" />
          <line x1="18" y1="15" x2="22" y2="11" stroke="#38BDF8" strokeWidth="1.5" />
          <line x1="18" y1="17" x2="22" y2="21" stroke="#38BDF8" strokeWidth="1.5" />
        </svg>
      );
    case 'real-time-projects':
      return (
        <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
          <path d="M18 4 L8 18 H16 L14 28 L24 14 H16 L18 4 Z" fill="#00F0FF" fillOpacity="0.2" stroke="#00F0FF" strokeWidth="2" strokeLinejoin="round" />
        </svg>
      );
    case 'blender':
      return (
        <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
          <ellipse cx="16" cy="17" rx="7" ry="7" stroke="#EA580C" strokeWidth="2" />
          <circle cx="16" cy="17" r="2.5" fill="#00F0FF" />
          <path d="M16 10 L10 5 M18 10 L23 6 M16 24 L16 28" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'illustrator':
      return (
        <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
          <rect x="5" y="5" width="22" height="22" rx="6" stroke="#F59E0B" strokeWidth="2" fill="#F59E0B" fillOpacity="0.1" />
          <path d="M11 21 L14 11 L17 21 M12 18 H16" stroke="#F8FAFC" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M20 12 V13 M20 16 V21" stroke="#F8FAFC" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case 'unity':
      return (
        <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
          <circle cx="16" cy="16" r="11" stroke="#F59E0B" strokeWidth="1.5" />
          <path d="M16 8 V16 L22 20 M16 16 L10 20" stroke="#F59E0B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'aws':
      return (
        <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
          <path d="M8 20 C6 18 6 13 10 11 C11 8 16 7 19 9 C22 8 26 11 25 15 C28 16 27 21 24 21 Z" stroke="#F59E0B" strokeWidth="2" strokeLinejoin="round" fill="#F59E0B" fillOpacity="0.1" />
          <path d="M10 24 Q16 27 22 24" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
          <path d="M21 23 L23 24.5 L20.5 25.5" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return <Terminal className="w-5 h-5 text-cyan-400" />;
  }
}
