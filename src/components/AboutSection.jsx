import React from 'react';
import { personalInfo } from '../data/portfolioData';
import { playHoverSound } from '../utils/audio';
import { 
  GraduationCap, 
  MapPin, 
  Cpu, 
  Layers, 
  Code2, 
  Sparkles, 
  ExternalLink,
  BrainCircuit,
  Boxes
} from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="relative py-28 px-6 bg-[#07080b] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono text-cyan-300">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>01 &bull; IDENTITY &amp; PHILOSOPHY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            ABOUT <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">DHIVESH M</span>
          </h2>
          <p className="text-slate-400 font-mono text-sm max-w-xl">
            Undergraduate builder at the intersection of Artificial Intelligence, embedded systems, and creative 3D technology.
          </p>
        </div>

        {/* Main Grid: Portrait Card + Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Portrait Card with Cybernetic Frame */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm group">
              {/* Outer Glowing Border */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 opacity-60 blur-lg group-hover:opacity-100 group-hover:blur-xl transition-all duration-500" />

              {/* Main Portrait Container */}
              <div className="relative rounded-3xl bg-[#0d111a] border border-cyan-500/30 p-4 overflow-hidden backdrop-blur-xl">
                {/* Tech Grid Pattern Header */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-[11px] font-mono text-slate-400">
                  <span className="flex items-center gap-1.5 text-cyan-300">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    ID: DHIVESH-M-AIML
                  </span>
                  <span>STATUS: ACTIVE BUILDER</span>
                </div>

                {/* Dhivesh's Real Portrait Photo */}
                <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-slate-900 border border-white/10">
                  <img
                    src="/images/profile.png"
                    alt="Dhivesh M"
                    className="w-full h-full object-cover object-top filter grayscale-[15%] contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d111a] via-transparent to-transparent opacity-80" />
                  
                  {/* Electric corner markers */}
                  <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-cyan-400" />
                  <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-cyan-400" />
                  <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-cyan-400" />
                  <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-cyan-400" />
                </div>

                {/* Quick Info Bar below image */}
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Pollachi, Tamil Nadu</span>
                  </div>
                  <div className="text-cyan-400 font-semibold">
                    AIML '28
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bio Narrative & Pillars */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg font-light">
              {personalInfo.bio.map((paragraph, idx) => (
                <p key={idx} className="tracking-wide">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Core Focus Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div 
                onMouseEnter={playHoverSound}
                className="p-4 rounded-2xl glass-panel border border-white/10 hover:border-cyan-500/40 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-3 group-hover:scale-110 group-hover:bg-cyan-500/20 transition-transform">
                  <BrainCircuit className="w-5 h-5" />
                </div>
                <h4 className="text-white font-bold text-sm mb-1">Practical AI / ML</h4>
                <p className="text-xs text-slate-400 leading-normal">
                  Focused on applicable intelligence: models, real-time inference, and algorithmic solutions.
                </p>
              </div>

              <div 
                onMouseEnter={playHoverSound}
                className="p-4 rounded-2xl glass-panel border border-white/10 hover:border-cyan-500/40 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-3 group-hover:scale-110 group-hover:bg-blue-500/20 transition-transform">
                  <Boxes className="w-5 h-5" />
                </div>
                <h4 className="text-white font-bold text-sm mb-1">3D &amp; Creative Tech</h4>
                <p className="text-xs text-slate-400 leading-normal">
                  Crafting 3D assets in Blender and exploring real-time environments in Unity.
                </p>
              </div>

              <div 
                onMouseEnter={playHoverSound}
                className="p-4 rounded-2xl glass-panel border border-white/10 hover:border-cyan-500/40 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-3 group-hover:scale-110 group-hover:bg-indigo-500/20 transition-transform">
                  <Code2 className="w-5 h-5" />
                </div>
                <h4 className="text-white font-bold text-sm mb-1">Real-Time Prototypes</h4>
                <p className="text-xs text-slate-400 leading-normal">
                  Bridging software logic with sensors and microcontrollers for immediate physical impact.
                </p>
              </div>
            </div>

            {/* Education Highlight Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900/90 to-[#0e1422] border border-cyan-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-400/30 text-cyan-400">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">
                    {personalInfo.education.degree}
                  </div>
                  <div className="text-xs text-slate-400">
                    {personalInfo.education.institution}
                  </div>
                </div>
              </div>
              <div className="px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-[11px] font-mono text-cyan-300 whitespace-nowrap">
                {personalInfo.education.year}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
