import React, { useState, useEffect } from 'react';
import { ArrowUp, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { personalInfo } from '../data/portfolioData';
import { playHoverSound } from '../utils/audio';

export default function Footer() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      if (totalScroll > 0) {
        setScrollProgress((currentScroll / totalScroll) * 100);
      }
      setShowTopBtn(currentScroll > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    playHoverSound();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer className="relative py-12 px-6 bg-[#040507] border-t border-white/5 text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono">
          {/* Brand Info */}
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 font-bold">
              D
            </div>
            <div>
              <div className="text-white font-bold">Dhivesh M &bull; AI/ML Portfolio</div>
              <div className="text-slate-500 text-[11px]">Pollachi, Tamil Nadu, India</div>
            </div>
          </div>

          {/* Copyright & Personality note */}
          <div className="text-center md:text-left text-slate-500">
            <span>&copy; 2026 Dhivesh M. Turning Ideas Into Intelligent Real-World Experiences.</span>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <a
              href={personalInfo.contacts.github}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-slate-900 border border-white/10 hover:text-cyan-300 hover:border-cyan-400/40 transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.contacts.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-slate-900 border border-white/10 hover:text-cyan-300 hover:border-cyan-400/40 transition-colors"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${personalInfo.contacts.email}`}
              className="p-2 rounded-lg bg-slate-900 border border-white/10 hover:text-cyan-300 hover:border-cyan-400/40 transition-colors"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </footer>

      {/* Floating Back to Top Button with Circular Progress Ring */}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          onMouseEnter={playHoverSound}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-slate-950/90 border border-cyan-500/40 text-cyan-300 flex items-center justify-center backdrop-blur-md shadow-lg shadow-cyan-500/20 hover:scale-110 active:scale-95 transition-all cursor-pointer group"
        >
          {/* Circular SVG Progress */}
          <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 48 48">
            <circle
              cx="24"
              cy="24"
              r="20"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="2.5"
              fill="none"
            />
            <circle
              cx="24"
              cy="24"
              r="20"
              stroke="#00f0ff"
              strokeWidth="2.5"
              strokeDasharray={125.6}
              strokeDashoffset={125.6 - (125.6 * scrollProgress) / 100}
              strokeLinecap="round"
              fill="none"
              className="transition-all duration-75"
            />
          </svg>
          <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      )}
    </>
  );
}
