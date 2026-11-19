import React, { useState } from 'react';
import { personalInfo } from '../data/portfolioData';
import { playHoverSound } from '../utils/audio';

export default function ContactSection() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    playHoverSound();
    setTimeout(() => {
      setSubmitted(false);
      setFormState({ name: '', email: '', message: '' });
    }, 4500);
  };

  return (
    <section id="contact" className="relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="w-[92%] max-w-[1180px] mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-xs font-mono text-[#00f5ff] uppercase tracking-widest backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00f5ff] shadow-[0_0_8px_#00f5ff] animate-ping" />
            <span>Connect &amp; Collaborate</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black font-heading text-white tracking-tight">
            Let's Build Something <span className="grad-text">Together</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 font-normal">
            Open to internships, AI/ML engineering collaborations, and hackathon prototypes. Reach out anytime.
          </p>
        </div>

        {/* Contact Info Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          <a
            href={`mailto:${personalInfo.contacts.email}`}
            onMouseEnter={playHoverSound}
            className="p-6 rounded-2xl glass-panel border border-white/10 card-3d-interactive transition-all group flex items-start gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-[#00f5ff] text-xl group-hover:scale-110 group-hover:shadow-[0_0_15px_#00f5ff] transition-all shrink-0">
              <i className="fa-regular fa-envelope" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Direct Email</span>
              <p className="text-sm font-bold text-white group-hover:text-[#00f5ff] transition-colors truncate">
                {personalInfo.contacts.email}
              </p>
            </div>
          </a>

          <a
            href={`tel:${personalInfo.contacts.phone}`}
            onMouseEnter={playHoverSound}
            className="p-6 rounded-2xl glass-panel border border-white/10 card-3d-interactive transition-all group flex items-start gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-[#a855f7] text-xl group-hover:scale-110 group-hover:shadow-[0_0_15px_#a855f7] transition-all shrink-0">
              <i className="fa-solid fa-phone" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Direct Call</span>
              <p className="text-sm font-bold text-white group-hover:text-[#a855f7] transition-colors truncate">
                {personalInfo.contacts.phone}
              </p>
            </div>
          </a>

          <a
            href={personalInfo.contacts.linkedin}
            target="_blank"
            rel="noreferrer"
            onMouseEnter={playHoverSound}
            className="p-6 rounded-2xl glass-panel border border-white/10 card-3d-interactive transition-all group flex items-start gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-[#ec4899] text-xl group-hover:scale-110 group-hover:shadow-[0_0_15px_#ec4899] transition-all shrink-0">
              <i className="fa-brands fa-linkedin-in" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">LinkedIn Profile</span>
              <p className="text-sm font-bold text-white group-hover:text-[#ec4899] transition-colors truncate">
                dhivesh-m-198b74377
              </p>
            </div>
          </a>

          <a
            href={personalInfo.contacts.github}
            target="_blank"
            rel="noreferrer"
            onMouseEnter={playHoverSound}
            className="p-6 rounded-2xl glass-panel border border-white/10 card-3d-interactive transition-all group flex items-start gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-[#00f5ff] text-xl group-hover:scale-110 group-hover:shadow-[0_0_15px_#00f5ff] transition-all shrink-0">
              <i className="fa-brands fa-github" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">GitHub Profile</span>
              <p className="text-sm font-bold text-white group-hover:text-[#00f5ff] transition-colors truncate">
                github.com/DHIVESH-M
              </p>
            </div>
          </a>

          <div
            onMouseEnter={playHoverSound}
            className="p-6 rounded-2xl glass-panel border border-white/10 card-3d-interactive transition-all flex items-start gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-xl shrink-0">
              <i className="fa-solid fa-location-dot" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Location</span>
              <p className="text-sm font-bold text-white truncate">
                Pollachi, Coimbatore, TN, India
              </p>
            </div>
          </div>

          <a
            href={personalInfo.contacts.resumePdf}
            download="Dhivesh_M_Resume.pdf"
            onMouseEnter={playHoverSound}
            className="p-6 rounded-2xl glass-panel border border-white/10 card-3d-interactive transition-all group flex items-start gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-[#a855f7] text-xl group-hover:scale-110 group-hover:shadow-[0_0_15px_#a855f7] transition-all shrink-0">
              <i className="fa-solid fa-file-arrow-down" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Curriculum Vitae</span>
              <p className="text-sm font-bold text-white group-hover:text-[#a855f7] transition-colors truncate">
                Download Official PDF
              </p>
            </div>
          </a>
        </div>

        {/* Interactive Quick Dispatch Form */}
        <div className="max-w-2xl mx-auto p-8 sm:p-10 rounded-3xl glass-panel border border-cyan-500/25 card-3d-interactive shadow-2xl">
          <h3 className="text-xl sm:text-2xl font-bold font-heading text-white mb-2 text-center">
            Send a Direct Message
          </h3>
          <p className="text-xs text-slate-300 text-center mb-6 font-mono">
            Directly delivered to my primary communication inbox.
          </p>

          {submitted ? (
            <div className="p-6 rounded-2xl bg-[#4ade80]/15 border border-[#4ade80]/40 text-center space-y-2 animate-in zoom-in-95 duration-200">
              <i className="fa-solid fa-check-circle text-2xl text-[#4ade80]" />
              <h4 className="text-base font-bold text-white">Message Dispatched!</h4>
              <p className="text-xs text-[#b7bcd6]">Thank you! I will review your message and reply promptly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono text-[#7d84a6] mb-1.5 uppercase">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="e.g. Alex"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#9b6bff] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-[#7d84a6] mb-1.5 uppercase">Your Email</label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="alex@domain.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#9b6bff] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-[#7d84a6] mb-1.5 uppercase">Project Details / Message</label>
                <textarea
                  rows="4"
                  required
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Tell me about your opportunity, hackathon idea, or project scope..."
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#9b6bff] transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl font-bold font-heading text-sm text-white shadow-[0_0_25px_rgba(0,245,255,0.4)] transition-all hover:scale-[1.01] hover:shadow-[0_0_35px_rgba(0,245,255,0.6)] cursor-pointer flex items-center justify-center gap-2"
                style={{
                  background: 'linear-gradient(135deg, #00f5ff 0%, #a855f7 55%, #ec4899 100%)'
                }}
              >
                <i className="fa-solid fa-paper-plane text-xs" />
                <span>Send Message</span>
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Floating Hire Me Button (Corner) */}
      <a
        href="#contact"
        onClick={playHoverSound}
        className="fixed bottom-7 right-7 z-[900] px-5 py-3 rounded-full text-white font-bold font-heading text-xs sm:text-sm flex items-center gap-2.5 shadow-[0_12px_40px_-8px_rgba(0,245,255,0.6)] hover:scale-105 hover:shadow-[0_12px_45px_rgba(168,85,247,0.7)] transition-all cursor-pointer"
        style={{
          background: 'linear-gradient(135deg, #00f5ff 0%, #a855f7 55%, #ec4899 100%)'
        }}
      >
        <i className="fa-solid fa-handshake" />
        <span className="hidden sm:inline">Hire Me</span>
      </a>
    </section>
  );
}
