import React from 'react';
import { educationInfo } from '../data/portfolioData';
import { playHoverSound } from '../utils/audio';

export default function AboutSection() {
  return (
    <section id="about" className="relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Ambient Radial Aura */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-[92%] max-w-[1180px] mx-auto relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-xs font-mono text-[#00f5ff] uppercase tracking-widest backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00f5ff] shadow-[0_0_8px_#00f5ff] animate-ping" />
            <span>About Me</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black font-heading text-white tracking-tight">
            Turning curiosity into <span className="grad-text">working code</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            An engineering perspective centered on neural models, hardware microcontrollers, and real-time interactive systems.
          </p>
        </div>

        {/* Main Grid: Story + Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          {/* Left Column: Narrative Card & Counters */}
          <div className="lg:col-span-5 p-8 rounded-3xl glass-panel border border-white/10 card-3d-interactive space-y-5">
            <p className="text-sm text-slate-200 leading-relaxed font-normal">
              I'm a second-year <strong className="text-white font-bold text-[#00f5ff]">B.Sc. Artificial Intelligence and Machine Learning</strong> student, passionate about AI model development, software engineering, IoT, and emerging creative technologies.
            </p>

            <p className="text-sm text-slate-200 leading-relaxed font-normal">
              I enjoy building real-world projects, competing in innovation hackathons, mastering low-level algorithms, and engineering practical solutions that solve genuine community problems.
            </p>

            <p className="text-sm text-slate-200 leading-relaxed font-normal">
              My goal is to become an <strong className="text-white font-bold text-[#a855f7]">AI Engineer</strong> who builds impactful technology — one system, one hackathon, one line of code at a time.
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10 text-center">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/40 transition-colors">
                <span className="block text-2xl font-black grad-text font-heading">06+</span>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Projects</span>
              </div>

              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/40 transition-colors">
                <span className="block text-2xl font-black grad-text font-heading">06</span>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Certs</span>
              </div>

              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-pink-500/40 transition-colors">
                <span className="block text-2xl font-black grad-text font-heading">2028</span>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Grad Year</span>
              </div>
            </div>
          </div>

          {/* Right Column: Experience Timeline */}
          <div className="lg:col-span-7 relative pl-8 border-l-2 border-cyan-500/30 space-y-8">
            {[
              {
                title: "AI & ML Foundations",
                meta: "2024 — Present",
                desc: "Building deep core strengths in Python, Java, C, and machine learning fundamentals alongside mathematical optimization.",
                icon: "fa-brain"
              },
              {
                title: "Hackathons & Rapid Prototyping",
                meta: "Ongoing",
                desc: "Competing in the Smart India Hackathon and campus innovation sprints — rapid engineering under national time constraints.",
                icon: "fa-trophy"
              },
              {
                title: "Real-World Hardware & Platforms",
                meta: "Active Engineering",
                desc: "Shipping deployed systems spanning IoT microplastic filtration hardware, agricultural marketplaces, and crash safety beacons.",
                icon: "fa-microchip"
              },
              {
                title: "Future: Autonomous AI Engineer",
                meta: "Career Horizon — 2028",
                desc: "Graduating from Rathinam Global University and stepping into an AI engineering role creating technology with measurable global impact.",
                icon: "fa-rocket"
              }
            ].map((step, idx) => (
              <div key={idx} onMouseEnter={playHoverSound} className="relative group">
                {/* Timeline Dot */}
                <div className="absolute -left-[41px] top-1.5 w-5 h-5 rounded-full bg-[#07080b] border-2 border-cyan-400 flex items-center justify-center group-hover:scale-125 group-hover:border-[#00f5ff] group-hover:shadow-[0_0_15px_#00f5ff] transition-all">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00f5ff]" />
                </div>

                <div className="p-6 rounded-2xl glass-panel border border-white/10 card-3d-interactive transition-all">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-base font-bold font-heading text-white group-hover:text-[#00f5ff] transition-colors">
                      {step.title}
                    </h4>
                    <span className="text-xs font-mono text-[#00f5ff]">
                      {step.meta}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Academic Degree Highlight Card with Radiant Neon Border */}
        <div className="p-8 rounded-3xl glass-panel border border-cyan-500/30 card-3d-interactive max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left bg-gradient-to-r from-cyan-950/20 via-black/40 to-purple-950/20">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl shrink-0 shadow-[0_0_25px_rgba(0,245,255,0.4)]"
            style={{
              background: 'linear-gradient(135deg, #00f5ff 0%, #a855f7 55%, #ec4899 100%)'
            }}
          >
            <i className="fa-solid fa-graduation-cap" />
          </div>

          <div className="flex-1 space-y-1">
            <span className="text-[10px] font-mono text-[#a855f7] uppercase tracking-wider font-bold">
              Formal Degree Programme
            </span>
            <h3 className="text-xl font-bold font-heading text-white">
              {educationInfo.degree}
            </h3>
            <div className="text-sm font-semibold text-[#00f5ff]">
              {educationInfo.institution}
            </div>
            <div className="text-xs font-mono text-slate-400">
              {educationInfo.year} &bull; {educationInfo.location}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
