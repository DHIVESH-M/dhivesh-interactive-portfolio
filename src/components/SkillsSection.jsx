import React from 'react';
import Skills3DConstellation from './3d/Skills3DConstellation';
import HandDrawnSkillFlow from './HandDrawnSkillFlow';
import { Sparkles } from 'lucide-react';

export default function SkillsSection() {
  return (
    <section id="skills" className="relative py-28 px-6 bg-[#07080b]/90 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-cyan-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
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
        </div>

        {/* Three.js Interactive 3D Skill Constellation Galaxy */}
        <div className="mb-20">
          <Skills3DConstellation />
        </div>

        {/* Organic Hand-Drawn Animated Skill Flow Journey */}
        <HandDrawnSkillFlow />
      </div>
    </section>
  );
}
