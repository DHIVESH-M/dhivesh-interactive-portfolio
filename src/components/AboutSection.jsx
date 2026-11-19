import React from 'react';
import { educationInfo } from '../data/portfolioData';
import { playHoverSound } from '../utils/audio';

export default function AboutSection() {
  return (
    <section id="about" className="relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#080b1a]">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#5b8cff]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-[92%] max-w-[1180px] mx-auto relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/15 bg-white/5 text-xs font-mono text-[#9b6bff] uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-[#9b6bff] shadow-[0_0_8px_#9b6bff]" />
            <span>About Me</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Turning curiosity into <span className="grad-text">working code</span>
          </h2>

          <p className="text-sm sm:text-base text-[#b7bcd6] leading-relaxed font-light">
            An engineering perspective centered on neural models, hardware microcontrollers, and real-time interactive systems.
          </p>
        </div>

        {/* Main Grid: Story + Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          {/* Left Column: Narrative Card & Counters */}
          <div className="lg:col-span-5 p-8 rounded-3xl glass-panel border border-white/10 space-y-5">
            <p className="text-sm text-[#b7bcd6] leading-relaxed font-light">
              I'm a second-year <strong className="text-white font-semibold">B.Sc. Artificial Intelligence and Machine Learning</strong> student, passionate about AI model development, software engineering, IoT, and emerging creative technologies.
            </p>

            <p className="text-sm text-[#b7bcd6] leading-relaxed font-light">
              I enjoy building real-world projects, competing in innovation hackathons, mastering low-level algorithms, and engineering practical solutions that solve genuine community problems.
            </p>

            <p className="text-sm text-[#b7bcd6] leading-relaxed font-light">
              My goal is to become an <strong className="text-white font-semibold">AI Engineer</strong> who builds impactful technology — one system, one hackathon, one line of code at a time.
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10 text-center">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
                <span className="block text-2xl font-black grad-text font-mono">06+</span>
                <span className="text-[10px] font-mono text-[#7d84a6] uppercase tracking-wider">Projects</span>
              </div>

              <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
                <span className="block text-2xl font-black grad-text font-mono">06</span>
                <span className="text-[10px] font-mono text-[#7d84a6] uppercase tracking-wider">Certs</span>
              </div>

              <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
                <span className="block text-2xl font-black grad-text font-mono">2028</span>
                <span className="text-[10px] font-mono text-[#7d84a6] uppercase tracking-wider">Grad Year</span>
              </div>
            </div>
          </div>

          {/* Right Column: Experience Timeline */}
          <div className="lg:col-span-7 relative pl-8 border-l-2 border-[#9b6bff]/30 space-y-8">
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
                <div className="absolute -left-[41px] top-1.5 w-5 h-5 rounded-full bg-[#080b1a] border-2 border-[#9b6bff] flex items-center justify-center group-hover:scale-125 group-hover:border-[#5be6ff] transition-all">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#5b8cff]" />
                </div>

                <div className="p-6 rounded-2xl glass-panel border border-white/10 group-hover:border-[#9b6bff]/50 transition-all">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-base font-bold text-white group-hover:text-[#5be6ff] transition-colors">
                      {step.title}
                    </h4>
                    <span className="text-xs font-mono text-[#5b8cff]">
                      {step.meta}
                    </span>
                  </div>
                  <p className="text-xs text-[#b7bcd6] leading-relaxed font-light">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Academic Degree Highlight Card */}
        <div className="p-8 rounded-3xl glass-panel border border-white/15 max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl shrink-0 shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #5b8cff 0%, #9b6bff 55%, #ff6bd6 100%)'
            }}
          >
            <i className="fa-solid fa-graduation-cap" />
          </div>

          <div className="flex-1 space-y-1">
            <span className="text-[10px] font-mono text-[#9b6bff] uppercase tracking-wider font-bold">
              Formal Degree Programme
            </span>
            <h3 className="text-xl font-bold text-white">
              {educationInfo.degree}
            </h3>
            <div className="text-sm font-semibold text-[#5be6ff]">
              {educationInfo.institution}
            </div>
            <div className="text-xs font-mono text-[#7d84a6]">
              {educationInfo.year} &bull; {educationInfo.location}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
