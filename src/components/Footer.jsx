import React from 'react';
import { personalInfo } from '../data/portfolioData';
import { playHoverSound } from '../utils/audio';

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  const scrollToTop = () => {
    playHoverSound();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-12 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-[#060814] z-10">
      <div className="w-[92%] max-w-[1180px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="text-xs sm:text-sm text-[#7d84a6] font-mono text-center sm:text-left">
          &copy; {CURRENT_YEAR} {personalInfo.name}. Crafted with curiosity &amp; code.
        </div>

        <div className="flex items-center gap-3">
          <a
            href={personalInfo.contacts.github}
            target="_blank"
            rel="noreferrer"
            title="GitHub"
            className="w-9 h-9 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-[#b7bcd6] hover:text-white hover:border-[#9b6bff] transition-colors"
          >
            <i className="fa-brands fa-github text-sm" />
          </a>

          <a
            href={personalInfo.contacts.linkedin}
            target="_blank"
            rel="noreferrer"
            title="LinkedIn"
            className="w-9 h-9 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-[#b7bcd6] hover:text-white hover:border-[#9b6bff] transition-colors"
          >
            <i className="fa-brands fa-linkedin-in text-sm" />
          </a>

          <a
            href={`mailto:${personalInfo.contacts.email}`}
            title="Email"
            className="w-9 h-9 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-[#b7bcd6] hover:text-white hover:border-[#9b6bff] transition-colors"
          >
            <i className="fa-regular fa-envelope text-sm" />
          </a>

          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="w-9 h-9 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-[#b7bcd6] hover:text-white hover:border-[#9b6bff] hover:-translate-y-1 transition-all cursor-pointer"
          >
            <i className="fa-solid fa-arrow-up text-sm" />
          </button>
        </div>
      </div>
    </footer>
  );
}
