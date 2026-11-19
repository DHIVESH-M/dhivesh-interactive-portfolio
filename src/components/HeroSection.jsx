import React, { useState, useEffect } from 'react';
import { personalInfo } from '../data/portfolioData';
import { playHoverSound } from '../utils/audio';

const TYPING_WORDS = [
  "AI Enthusiast",
  "Python Programmer",
  "Machine Learning Developer",
  "IoT & Telemetry Explorer",
  "Hackathon Participant",
  "Future AI Engineer"
];

export default function HeroSection({ onOpenCinematicHero }) {
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing effect loop
  useEffect(() => {
    const currentWord = TYPING_WORDS[wordIdx];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setCharIdx((prev) => prev + 1);
          if (charIdx + 1 === currentWord.length) {
            setTimeout(() => setIsDeleting(true), 1500);
          }
        } else {
          setCharIdx((prev) => prev - 1);
          if (charIdx - 1 === 0) {
            setIsDeleting(false);
            setWordIdx((prev) => (prev + 1) % TYPING_WORDS.length);
          }
        }
      },
      isDeleting ? 40 : 85
    );

    return () => clearTimeout(timeout);
  }, [charIdx, isDeleting, wordIdx]);

  const scrollTo = (id) => {
    playHoverSound();
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      <div className="w-[92%] max-w-[1180px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        {/* Left Column: Copy & Actions */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-md text-xs font-mono text-[#b7bcd6] shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#4ade80] shadow-[0_0_10px_#4ade80] animate-pulse" />
            <span>Open to internships &amp; collaborations</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.06]">
            Hi, I'm{' '}
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: 'linear-gradient(135deg, #5b8cff 0%, #9b6bff 55%, #ff6bd6 100%)'
              }}
            >
              {personalInfo.name}
            </span>
          </h1>

          {/* Role Subtitle */}
          <p className="text-lg sm:text-xl font-medium text-[#b7bcd6]">
            {personalInfo.role}
          </p>

          {/* Animated Typing Output */}
          <div className="min-h-[1.8em] flex items-center font-mono text-base sm:text-xl font-semibold text-[#5b8cff]">
            <span>{TYPING_WORDS[wordIdx].slice(0, charIdx)}</span>
            <span className="inline-block w-0.5 h-5 bg-[#9b6bff] ml-1 animate-pulse" />
          </div>

          {/* Personal Description */}
          <p className="text-sm sm:text-base text-[#b7bcd6] max-w-lg leading-relaxed font-light">
            I build real-world AI, web and IoT projects — from microplastic-filtering hardware to farmer marketplaces — driven by curiosity, hackathons, and a goal to become an impactful AI engineer.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
            <a
              href={personalInfo.contacts.resumePdf}
              download="Dhivesh_M_Resume.pdf"
              onClick={playHoverSound}
              className="btn btn-primary px-6 py-3.5 rounded-full font-semibold text-xs sm:text-sm flex items-center gap-2 cursor-pointer shadow-lg"
            >
              <i className="fa-solid fa-download text-xs" />
              <span>Download Resume</span>
            </a>

            <button
              onClick={() => scrollTo('contact')}
              className="btn btn-ghost px-6 py-3.5 rounded-full font-semibold text-xs sm:text-sm flex items-center gap-2 cursor-pointer"
            >
              <i className="fa-regular fa-paper-plane text-xs" />
              <span>Contact Me</span>
            </button>

            <button
              onClick={() => scrollTo('projects')}
              className="btn btn-ghost px-6 py-3.5 rounded-full font-semibold text-xs sm:text-sm flex items-center gap-2 cursor-pointer"
            >
              <i className="fa-solid fa-diagram-project text-xs" />
              <span>View Projects</span>
            </button>

            {/* Launch Cinematic 3D Glass Hero Video */}
            <button
              onClick={() => {
                playHoverSound();
                if (onOpenCinematicHero) onOpenCinematicHero();
              }}
              title="Watch Cinematic Glass Shooting Video"
              className="px-5 py-3.5 rounded-full border border-[#5b8cff]/50 bg-[#5b8cff]/10 hover:bg-[#5b8cff]/20 text-[#5be6ff] font-mono text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-sm hover:scale-105"
            >
              <i className="fa-solid fa-film text-xs" />
              <span>Watch 3D Hero Video</span>
            </button>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3 pt-2">
            <a
              href={personalInfo.contacts.github}
              target="_blank"
              rel="noreferrer"
              onClick={playHoverSound}
              title="GitHub Profile"
              className="w-11 h-11 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-[#b7bcd6] hover:text-white hover:border-[#9b6bff] hover:scale-110 transition-all"
            >
              <i className="fa-brands fa-github text-base" />
            </a>

            <a
              href={personalInfo.contacts.linkedin}
              target="_blank"
              rel="noreferrer"
              onClick={playHoverSound}
              title="LinkedIn Profile"
              className="w-11 h-11 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-[#b7bcd6] hover:text-white hover:border-[#9b6bff] hover:scale-110 transition-all"
            >
              <i className="fa-brands fa-linkedin-in text-base" />
            </a>

            <a
              href={`mailto:${personalInfo.contacts.email}`}
              onClick={playHoverSound}
              title="Direct Email"
              className="w-11 h-11 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-[#b7bcd6] hover:text-white hover:border-[#9b6bff] hover:scale-110 transition-all"
            >
              <i className="fa-regular fa-envelope text-base" />
            </a>
          </div>
        </div>

        {/* Right Column: Orbiting Rings & Profile Photo */}
        <div className="lg:col-span-5 flex items-center justify-center relative min-h-[420px]">
          {/* Orbiting Rings */}
          <div className="orbit-ring r1" />
          <div className="orbit-ring r2" />

          {/* Orbiting Floating Chips */}
          <div
            className="absolute top-4 left-4 sm:left-10 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md font-mono text-xs font-semibold text-white shadow-lg flex items-center gap-2 z-20"
            style={{ animation: 'chipFloat 5s ease-in-out infinite' }}
          >
            <i className="fa-brands fa-python text-[#5b8cff]" />
            <span>Python</span>
          </div>

          <div
            className="absolute bottom-12 right-2 sm:right-6 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md font-mono text-xs font-semibold text-white shadow-lg flex items-center gap-2 z-20"
            style={{ animation: 'chipFloat 5s ease-in-out infinite 1.5s' }}
          >
            <i className="fa-solid fa-brain text-[#9b6bff]" />
            <span>AI / ML</span>
          </div>

          <div
            className="absolute bottom-2 left-6 sm:left-12 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md font-mono text-xs font-semibold text-white shadow-lg flex items-center gap-2 z-20"
            style={{ animation: 'chipFloat 5s ease-in-out infinite 3s' }}
          >
            <i className="fa-solid fa-microchip text-[#5be6ff]" />
            <span>IoT &amp; Telemetry</span>
          </div>

          {/* Glowing Profile Ring */}
          <div
            className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full p-1.5 z-10 transition-all duration-500"
            style={{
              background: 'linear-gradient(135deg, #5b8cff 0%, #9b6bff 55%, #ff6bd6 100%)',
              animation: 'glowPulse 4s ease-in-out infinite'
            }}
          >
            <div className="w-full h-full rounded-full overflow-hidden bg-[#0c1024]">
              <img
                src="/images/profile.png"
                alt="Dhivesh M"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs font-mono text-[#7d84a6] tracking-widest pointer-events-none">
        <div className="w-5 h-8 border-2 border-white/20 rounded-full flex justify-center pt-1.5">
          <div className="w-1 h-2 rounded-full bg-[#9b6bff] animate-bounce" />
        </div>
        <span>SCROLL</span>
      </div>
    </section>
  );
}
