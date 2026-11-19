import React from 'react';
import { verifiedCertifications, hackathons, achievementsByNumbers } from '../data/portfolioData';
import { playHoverSound } from '../utils/audio';

export default function CertificatesSection() {
  return (
    <section id="certificates" className="relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#070a18]">
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[#9b6bff]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-[92%] max-w-[1180px] mx-auto relative z-10 space-y-28">
        {/* 1. Official Certifications */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/15 bg-white/5 text-xs font-mono text-[#9b6bff] uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-[#9b6bff] shadow-[0_0_8px_#9b6bff]" />
              <span>Verified Credentials</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Learning <span className="grad-text">Milestones</span>
            </h2>

            <p className="text-sm text-[#b7bcd6] font-light">
              Formal courses and industry credentials backing up my AI, programming, and management capabilities.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {verifiedCertifications.map((cert, idx) => (
              <div
                key={idx}
                onMouseEnter={playHoverSound}
                className="p-6 rounded-2xl glass-panel border border-white/10 hover:border-[#9b6bff]/50 hover:shadow-[0_15px_40px_-15px_rgba(155,107,255,0.4)] transition-all flex items-start gap-4 group"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white text-sm shrink-0 shadow-md group-hover:scale-110 transition-transform"
                  style={{
                    background: 'linear-gradient(135deg, #5b8cff 0%, #9b6bff 55%, #ff6bd6 100%)'
                  }}
                >
                  {cert.code}
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-white group-hover:text-[#5be6ff] transition-colors line-clamp-2">
                    {cert.title}
                  </h4>
                  <span className="block text-xs font-mono text-[#7d84a6] mt-1">
                    {cert.issuer}
                  </span>
                  <span className="inline-block mt-2 text-[10px] font-mono text-[#4ade80]">
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
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/15 bg-white/5 text-xs font-mono text-[#ff6bd6] uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff6bd6] shadow-[0_0_8px_#ff6bd6]" />
              <span>High-Pressure Engineering</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Built Under <span className="grad-text">Pressure</span>
            </h2>

            <p className="text-sm text-[#b7bcd6] font-light">
              Demonstrated problem-solving, rapid prototyping, and embedded teamwork across competitive events.
            </p>
          </div>

          <div className="max-w-3xl mx-auto relative pl-10 border-l-2 border-[#ff6bd6]/30 space-y-8">
            {hackathons.map((h, idx) => (
              <div key={idx} onMouseEnter={playHoverSound} className="relative group">
                <div
                  className="absolute -left-[53px] top-1.5 w-10 h-10 rounded-full flex items-center justify-center text-white text-sm shadow-lg group-hover:scale-110 transition-transform"
                  style={{
                    background: 'linear-gradient(135deg, #5b8cff 0%, #9b6bff 55%, #ff6bd6 100%)'
                  }}
                >
                  <i className="fa-solid fa-trophy" />
                </div>

                <div className="p-6 rounded-2xl glass-panel border border-white/10 group-hover:border-[#ff6bd6]/50 transition-all">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <h4 className="text-base font-bold text-white group-hover:text-[#5be6ff] transition-colors">
                      {h.title}
                    </h4>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#ff6bd6]/15 border border-[#ff6bd6]/40 text-[10px] font-mono text-[#ff6bd6]">
                      {h.status}
                    </span>
                  </div>
                  <div className="text-xs font-mono text-[#5b8cff] mb-2 font-semibold">
                    {h.role}
                  </div>
                  <p className="text-xs text-[#b7bcd6] leading-relaxed font-light">
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
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/15 bg-white/5 text-xs font-mono text-[#5be6ff] uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5be6ff] shadow-[0_0_8px_#5be6ff]" />
              <span>Impact Metrics</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              By The <span className="grad-text">Numbers</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {achievementsByNumbers.map((a, idx) => (
              <div
                key={idx}
                onMouseEnter={playHoverSound}
                className="p-8 rounded-2xl glass-panel border border-white/10 hover:border-[#9b6bff]/50 text-center space-y-2 group"
              >
                <div className="text-4xl sm:text-5xl font-extrabold grad-text font-mono group-hover:scale-105 transition-transform">
                  {a.num}{a.suffix}
                </div>
                <div className="text-xs font-mono uppercase tracking-wider text-[#7d84a6]">
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
