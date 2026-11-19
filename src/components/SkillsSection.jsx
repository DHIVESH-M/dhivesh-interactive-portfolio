import React from 'react';
import { technicalSkills } from '../data/portfolioData';
import { playHoverSound } from '../utils/audio';
import Skills3DConstellation from './3d/Skills3DConstellation';
import { 
  Sparkles, 
  Terminal, 
  BrainCircuit, 
  Cpu, 
  Layers, 
  Cloud, 
  Gamepad2, 
  CheckCircle2, 
  Compass,
  Zap
} from 'lucide-react';

export default function SkillsSection() {
  return (
    <section id="skills" className="relative py-28 px-6 bg-[#07080b]/90 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-cyan-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-xs font-mono text-cyan-300">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>02 &bull; TECHNICAL ARSENAL</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            MY SKILLS &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">LEARNING AREAS</span>
          </h2>
          <p className="text-slate-400 font-mono text-sm leading-relaxed">
            Technologies actively applied across my hackathon systems and academic projects, alongside active domains I am currently learning.
          </p>

          {/* Legend: Project Applied vs Learner */}
          <div className="flex items-center justify-center gap-6 pt-4 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,240,255,0.8)]" />
              <span className="text-slate-300">Project Applied</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
              <span className="text-slate-300">Active Learner / Exploring</span>
            </div>
          </div>
        </div>

        {/* Three.js Interactive 3D Skill Constellation Galaxy */}
        <div className="mb-14">
          <Skills3DConstellation />
        </div>

        {/* Skills Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {technicalSkills.map((categoryGroup, catIdx) => (
            <div
              key={catIdx}
              className="p-7 rounded-3xl glass-panel border border-white/10 hover:border-cyan-500/30 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center justify-between pb-5 mb-6 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                      {categoryGroup.category === "Programming" && <Terminal className="w-5 h-5" />}
                      {categoryGroup.category === "Artificial Intelligence" && <BrainCircuit className="w-5 h-5" />}
                      {categoryGroup.category === "Creative Technologies" && <Gamepad2 className="w-5 h-5" />}
                      {categoryGroup.category === "Cloud Computing" && <Cloud className="w-5 h-5" />}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white tracking-wide">
                        {categoryGroup.category}
                      </h3>
                      <p className="text-[11px] font-mono text-slate-400">
                        {categoryGroup.items.length} {categoryGroup.items.length === 1 ? 'Focus Area' : 'Focus Areas'}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
                    SEC 0{catIdx + 1}
                  </span>
                </div>

                {/* Skill Cards within category */}
                <div className="space-y-4">
                  {categoryGroup.items.map((skill, itemIdx) => {
                    const isLearner = skill.status === "Learner";

                    return (
                      <div
                        key={itemIdx}
                        onMouseEnter={playHoverSound}
                        className="group relative p-4 rounded-2xl bg-slate-900/40 border border-white/5 hover:border-cyan-500/40 hover:bg-slate-900/80 transition-all duration-300"
                      >
                        <div className="flex items-start gap-4">
                          {/* Custom Bespoke SVG Icon for each skill */}
                          <div className="mt-0.5 w-11 h-11 shrink-0 rounded-xl bg-[#0b0e17] border border-cyan-500/20 flex items-center justify-center group-hover:border-cyan-400/60 group-hover:scale-105 transition-all">
                            <SkillCustomIcon name={skill.name} />
                          </div>

                          {/* Skill Details */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                                {skill.name}
                              </h4>
                              
                              {/* Status Badge */}
                              <span
                                className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border ${
                                  isLearner
                                    ? 'bg-amber-950/40 border-amber-500/40 text-amber-300'
                                    : 'bg-cyan-950/40 border-cyan-500/40 text-cyan-300'
                                }`}
                              >
                                {skill.status}
                              </span>
                            </div>

                            <p className="text-xs text-slate-400 leading-relaxed font-light">
                              {skill.description}
                            </p>
                          </div>
                        </div>

                        {/* Subtle interactive bottom highlight on hover */}
                        <div className="absolute inset-x-4 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Category Footer Note */}
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>VERIFIED CURRICULUM</span>
                <span className="text-cyan-400/80">&bull; RATHINAM AIML</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Custom Bespoke SVG Icons for all exact skills
function SkillCustomIcon({ name }) {
  switch (name) {
    case 'Java':
      return (
        <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
          <path d="M12 24 C14 26 18 26 20 24 M10 20 C14 22 20 22 23 20" stroke="#00F0FF" strokeWidth="2" strokeLinecap="round" />
          <path d="M14 14 Q18 10 16 6 M18 13 Q22 9 20 5" stroke="#F97316" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M9 27 C13 28 20 28 24 27" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'C':
      return (
        <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
          <path d="M22 10 C20 7 14 7 11 11 C8 15 8 20 11 23 C14 26 20 26 23 23" stroke="#00F0FF" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="16" cy="16" r="2" fill="#00F0FF" />
        </svg>
      );
    case 'AI Model Development':
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
    case 'Machine Learning':
      return (
        <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
          <path d="M6 26 L12 18 L18 21 L26 8" stroke="#00F0FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="12" cy="18" r="2" fill="#38BDF8" />
          <circle cx="18" cy="21" r="2" fill="#38BDF8" />
          <circle cx="26" cy="8" r="2.5" fill="#F8FAFC" stroke="#00F0FF" strokeWidth="1.5" />
          <path d="M6 26 H26" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case 'Real-time AI Projects':
      return (
        <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
          <path d="M18 4 L8 18 H16 L14 28 L24 14 H16 L18 4 Z" fill="#00F0FF" fillOpacity="0.2" stroke="#00F0FF" strokeWidth="2" strokeLinejoin="round" />
        </svg>
      );
    case 'Unity':
      return (
        <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
          <circle cx="16" cy="16" r="11" stroke="#F59E0B" strokeWidth="1.5" />
          <path d="M16 8 V16 L22 20 M16 16 L10 20" stroke="#F59E0B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'Blender':
      return (
        <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
          <ellipse cx="16" cy="17" rx="7" ry="7" stroke="#EA580C" strokeWidth="2" />
          <circle cx="16" cy="17" r="2.5" fill="#00F0FF" />
          <path d="M16 10 L10 5 M18 10 L23 6 M16 24 L16 28" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'Adobe Illustrator':
      return (
        <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
          <rect x="5" y="5" width="22" height="22" rx="6" stroke="#F59E0B" strokeWidth="2" fill="#F59E0B" fillOpacity="0.1" />
          <path d="M11 21 L14 11 L17 21 M12 18 H16" stroke="#F8FAFC" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M20 12 V13 M20 16 V21" stroke="#F8FAFC" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case 'AWS':
      return (
        <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
          <path d="M8 20 C6 18 6 13 10 11 C11 8 16 7 19 9 C22 8 26 11 25 15 C28 16 27 21 24 21 Z" stroke="#F59E0B" strokeWidth="2" strokeLinejoin="round" fill="#F59E0B" fillOpacity="0.1" />
          <path d="M10 24 Q16 27 22 24" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
          <path d="M21 23 L23 24.5 L20.5 25.5" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return <Cpu className="w-5 h-5 text-cyan-400" />;
  }
}
