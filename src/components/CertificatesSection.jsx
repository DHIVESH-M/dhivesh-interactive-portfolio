import React from 'react';
import { verifiedCertifications, hackathons, achievementsByNumbers } from '../data/portfolioData';
import { playHoverSound } from '../utils/audio';

export default function CertificatesSection() {
  return (
    <section id="certificates" className="relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-[92%] max-w-[1180px] mx-auto relative z-10 space-y-28">
        {/* 1. Official Certifications */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-xs font-mono text-[#00f5ff] uppercase tracking-widest backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00f5ff] shadow-[0_0_8px_#00f5ff] animate-ping" />
              <span>Verified Credentials</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black font-heading text-white tracking-tight">
              Learning <span className="grad-text">Milestones</span>
            </h2>

            <p className="text-sm text-slate-300 font-normal">
              Formal courses and industry credentials backing up my AI, programming, and management capabilities.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {verifiedCertifications.map((cert, idx) => (
              <div
                key={idx}
                onMouseEnter={playHoverSound}
                className="p-6 rounded-2xl glass-panel border border-white/10 card-3d-interactive flex items-start gap-4 group"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center font-bold font-heading text-white text-sm shrink-0 shadow-[0_0_15px_rgba(0,245,255,0.3)] group-hover:scale-110 transition-transform"
                  style={{
                    background: 'linear-gradient(135deg, #00f5ff 0%, #a855f7 55%, #ec4899 100%)'
                  }}
                >
                  {cert.code}
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold font-heading text-white group-hover:text-[#00f5ff] transition-colors line-clamp-2">
                    {cert.title}
                  </h4>
                  <span className="block text-xs font-mono text-cyan-400/80 mt-1">
                    {cert.issuer}
                  </span>
                  <span className="inline-block mt-2 text-[10px] font-mono text-emerald-400 font-semibold">
                    &bull; {cert.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Hackathons Section */}
        <div id="hackathons">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-pink-500/30 bg-pink-500/10 text-xs font-mono text-pink-400 uppercase tracking-widest backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-400 shadow-[0_0_8px_#ec4899]" />
              <span>High-Pressure Engineering</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black font-heading text-white tracking-tight">
              Built Under <span className="grad-text">Pressure</span>
            </h2>

            <p className="text-sm text-slate-300 font-normal">
              Demonstrated problem-solving, rapid prototyping, and embedded teamwork across competitive events.
            </p>
          </div>

          <div className="max-w-3xl mx-auto relative pl-10 border-l-2 border-pink-500/40 space-y-8">
            {hackathons.map((h, idx) => (
              <div key={idx} onMouseEnter={playHoverSound} className="relative group">
                <div
                  className="absolute -left-[53px] top-1.5 w-10 h-10 rounded-full flex items-center justify-center text-white text-sm shadow-[0_0_15px_rgba(236,72,153,0.5)] group-hover:scale-110 transition-transform"
                  style={{
                    background: 'linear-gradient(135deg, #00f5ff 0%, #a855f7 55%, #ec4899 100%)'
                  }}
                >
                  <i className="fa-solid fa-trophy" />
                </div>

                <div className="p-6 rounded-2xl glass-panel border border-white/10 card-3d-interactive transition-all">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <h4 className="text-base font-bold font-heading text-white group-hover:text-[#00f5ff] transition-colors">
                      {h.title}
                    </h4>
                    <span className="px-2.5 py-0.5 rounded-full bg-pink-500/15 border border-pink-500/40 text-[10px] font-mono text-pink-400 font-semibold">
                      {h.status}
                    </span>
                  </div>
                  <div className="text-xs font-mono text-[#00f5ff] mb-2 font-semibold">
                    {h.role}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    {h.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Achievements By The Numbers */}
        <div id="achievements">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-xs font-mono text-[#00f5ff] uppercase tracking-widest backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00f5ff] shadow-[0_0_8px_#00f5ff]" />
              <span>Impact Metrics</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black font-heading text-white tracking-tight">
              By The <span className="grad-text">Numbers</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {achievementsByNumbers.map((a, idx) => (
              <div
                key={idx}
                onMouseEnter={playHoverSound}
                className="p-8 rounded-2xl glass-panel border border-white/10 card-3d-interactive text-center space-y-2 group"
              >
                <div className="text-4xl sm:text-5xl font-black grad-text font-heading group-hover:scale-105 transition-transform">
                  {a.num}{a.suffix}
                </div>
                <div className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
                  {a.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
