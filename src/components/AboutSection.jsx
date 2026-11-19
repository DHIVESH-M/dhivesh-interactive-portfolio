import React, { useState } from 'react';
import { educationInfo } from '../data/portfolioData';
import { playHoverSound } from '../utils/audio';

export default function AboutSection() {
  return (
    <section id="about" className="relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Ambient Radial Aura */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-[92%] max-w-[1180px] mx-auto relative z-10">
        {/* Section Header & Hanging Keychain ID Card */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-14">
          <div className="max-w-2xl space-y-3">
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

          {/* Hanging Interactive Keychain ID Badge */}
          <HangingKeychainIdCard />
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
                meta: "2025 — Present",
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

// Hanging Keychain Interactive ID Badge with Decaying Pendulum Jiggle Physics
function HangingKeychainIdCard() {
  const [isJiggling, setIsJiggling] = useState(false);

  const triggerJiggle = () => {
    playHoverSound();
    setIsJiggling(false);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsJiggling(true);
      });
    });
  };

  return (
    <div className="relative shrink-0 flex flex-col items-center select-none pt-1">
      {/* Top Ceiling Mount Grommet */}
      <div className="w-5 h-5 rounded-full bg-gradient-to-b from-slate-200 via-slate-400 to-slate-600 border border-white/50 shadow-md shadow-cyan-500/20 z-20 flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-[#0a0f24] border border-slate-400" />
      </div>

      {/* Hanging Physics Container (Swings / Jiggles from Mount) */}
      <div
        onClick={triggerJiggle}
        title="Click to jiggle keychain ID badge!"
        className={`relative cursor-pointer group ${
          isJiggling ? 'keychain-jiggle' : 'keychain-sway'
        }`}
        onAnimationEnd={() => setIsJiggling(false)}
      >
        {/* Lanyard Braided Cord */}
        <div className="w-2.5 h-12 mx-auto bg-gradient-to-b from-slate-800 via-cyan-500 to-slate-900 rounded-full shadow-[0_0_12px_rgba(0,245,255,0.4)] flex justify-center">
          <div className="w-0.5 h-full bg-cyan-300 opacity-80" />
        </div>

        {/* Metallic Swivel Keychain Ring & Lobster Hook */}
        <div className="relative -mt-1 flex flex-col items-center">
          {/* Chrome Swivel Ring */}
          <div className="w-6 h-6 rounded-full border-2 border-slate-300 bg-transparent shadow-sm flex items-center justify-center">
            <div className="w-2.5 h-3.5 bg-gradient-to-b from-slate-300 via-slate-100 to-slate-400 rounded-sm shadow" />
          </div>
          {/* Metal Trigger Clip Clasp */}
          <div className="w-3.5 h-4 bg-gradient-to-b from-slate-400 via-slate-200 to-slate-500 rounded-b-sm border-t border-slate-600 -mt-1 shadow" />
        </div>

        {/* The Student ID Badge Card */}
        <div className="relative w-60 sm:w-64 rounded-2xl bg-[#080d22]/95 border-2 border-cyan-400/40 p-4 shadow-2xl shadow-cyan-950/80 backdrop-blur-xl group-hover:border-cyan-300 transition-colors overflow-hidden mt-1">
          {/* Holographic Iridescent Shimmer Foil Overlay */}
          <div className="absolute inset-0 pointer-events-none id-card-holo-foil opacity-35 mix-blend-screen" />

          {/* Top Oval Punch Hole (for keychain clip) */}
          <div className="w-8 h-2 rounded-full bg-[#04060e] border border-white/20 mx-auto mb-3 shadow-inner" />

          {/* Card Header: University & Dept */}
          <div className="text-center pb-2.5 mb-2.5 border-b border-white/10 space-y-0.5">
            <div className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold">
              Rathinam Global University
            </div>
            <div className="text-[9px] font-mono text-slate-300 tracking-wider">
              Official Student Identification
            </div>
          </div>

          {/* Middle: Photo + Smart Chip + Info */}
          <div className="flex items-center gap-3 mb-3">
            {/* Student Photo */}
            <div className="relative w-20 h-20 rounded-xl overflow-hidden border-2 border-cyan-400/60 shadow-md shadow-cyan-500/25 shrink-0 bg-slate-900">
              <img
                src="/images/profile.png"
                alt="Dhivesh M"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute bottom-0 inset-x-0 bg-cyan-950/80 text-[7px] font-mono text-center text-cyan-300 py-0.5 font-bold">
                VERIFIED
              </div>
            </div>

            {/* Smart Microchip & Dept Metadata */}
            <div className="flex-1 min-w-0 space-y-1">
              {/* Gold Contact Smart Chip */}
              <div className="w-8 h-6 rounded bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 border border-amber-300 shadow-sm flex items-center justify-center p-0.5 mb-1.5">
                <div className="w-full h-full border border-amber-800/40 rounded-xs flex flex-col justify-between p-0.5">
                  <div className="w-full h-px bg-amber-800/40" />
                  <div className="w-full h-px bg-amber-800/40" />
                </div>
              </div>

              <div className="text-xs font-mono font-bold text-white truncate">
                DHIVESH M
              </div>
              <div className="text-[9px] font-mono text-cyan-300 leading-tight">
                B.Sc. AI &amp; ML
              </div>
              <div className="text-[8px] font-mono text-slate-400">
                BATCH: 2025 — 2028
              </div>
            </div>
          </div>

          {/* Bottom: Barcode + Security Hologram */}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between">
            {/* Barcode Stripes */}
            <div className="flex items-end gap-0.5 h-6">
              {[3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8, 9, 7, 9, 3, 2, 3, 8].map((h, bIdx) => (
                <div
                  key={bIdx}
                  className="w-0.5 bg-slate-300"
                  style={{ height: `${(h % 5 + 4) * 2.5}px` }}
                />
              ))}
            </div>

            {/* Holographic Security Seal */}
            <div className="px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-400/40 text-[8px] font-mono text-cyan-300 font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>ID #AIML-042</span>
            </div>
          </div>
        </div>

        {/* Interactive Click Tip Tag */}
        <div className="text-center mt-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-900/90 border border-cyan-400/30 text-[9px] font-mono text-cyan-300 shadow-sm group-hover:border-cyan-400 transition-colors">
            <span>⚡ Tap to Jiggle</span>
          </span>
        </div>
      </div>
    </div>
  );
}
