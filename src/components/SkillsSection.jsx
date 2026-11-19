import React, { useState, useEffect, useRef } from 'react';
import { skillsWithPercentages } from '../data/portfolioData';
import { playHoverSound } from '../utils/audio';
import HandDrawnSkillFlow from './HandDrawnSkillFlow';

export default function SkillsSection({ isReducedMotion = false }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const sectionRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Trigger skill bar animation on entering viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHasAnimated(true);
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const categories = ['All', 'Programming', 'AI & Machine Learning', 'Creative & Development Tools'];

  const filteredCategories = activeCategory === 'All'
    ? skillsWithPercentages
    : skillsWithPercentages.filter((c) => c.category === activeCategory);

  return (
    <section id="skills" ref={sectionRef} className="relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#080b1a]/95">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[550px] bg-[#9b6bff]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-[92%] max-w-[1180px] mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/15 bg-white/5 text-xs font-mono text-[#9b6bff] uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-[#9b6bff] shadow-[0_0_8px_#9b6bff]" />
            <span>Technical Capabilities</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Technical <span className="grad-text">Toolkit</span>
          </h2>

          <p className="text-sm sm:text-base text-[#b7bcd6] leading-relaxed font-light">
            Core programming languages, neural architectures, and creative development tools applied across hackathon systems and academic builds.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  playHoverSound();
                }}
                className={`px-4 py-2 rounded-full text-xs font-mono font-semibold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'text-white shadow-[0_0_20px_rgba(155,107,255,0.4)]'
                    : 'text-[#b7bcd6] bg-white/5 hover:text-white hover:bg-white/10 border border-white/10'
                }`}
                style={{
                  background: activeCategory === cat
                    ? 'linear-gradient(135deg, #5b8cff 0%, #9b6bff 55%, #ff6bd6 100%)'
                    : undefined
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid with Animated Moving Glowing Highlights */}
        <div className="space-y-10 mb-24">
          {filteredCategories.map((catGroup, gIdx) => (
            <div key={catGroup.category} className="space-y-4">
              <h3 className="text-sm font-mono uppercase tracking-wider text-[#9b6bff] font-bold flex items-center gap-2">
                <span>// {catGroup.category}</span>
                <span className="h-px flex-1 bg-white/10" />
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {catGroup.skills.map((skill, sIdx) => (
                  <SkillProgressBarCard
                    key={skill.id}
                    skill={skill}
                    hasAnimated={hasAnimated}
                    delay={sIdx * 0.12 + gIdx * 0.15}
                    isReducedMotion={isReducedMotion}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Note on Visual Placeholders */}
        <div className="text-center max-w-xl mx-auto mb-20 p-4 rounded-2xl bg-white/5 border border-white/10 text-xs font-mono text-[#7d84a6]">
          <span className="text-[#5be6ff] font-bold">ℹ Note:</span> Percentages represent initial visual curriculum placeholders &amp; hackathon domain engagement.
        </div>

        {/* Hand-Drawn Animated Skill Flow Journey Connecting About to Skills */}
        <div className="pt-8 border-t border-white/10">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#5be6ff]">
              Interactive Trajectory
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              The Hand-Drawn <span className="grad-text">Skill Journey</span>
            </h3>
            <p className="text-xs text-[#b7bcd6] font-mono">
              Follow the organic hand-drawn circuit path connecting each verified skill and learning frontier.
            </p>
          </div>
          <HandDrawnSkillFlow />
        </div>
      </div>
    </section>
  );
}

// Individual Skill Card with Animated Progress Line & Moving Highlight
function SkillProgressBarCard({ skill, hasAnimated, delay, isReducedMotion }) {
  const [currentPct, setCurrentPct] = useState(0);

  useEffect(() => {
    if (!hasAnimated || isReducedMotion) return;

    const duration = 1400; // 1.4s
    const startTime = performance.now() + delay * 1000;
    let animId;

    const animate = (currentTime) => {
      if (currentTime < startTime) {
        animId = requestAnimationFrame(animate);
        return;
      }
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const val = Math.round(eased * skill.pct);
      setCurrentPct(val);

      if (progress < 1) {
        animId = requestAnimationFrame(animate);
      }
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [hasAnimated, skill.pct, delay, isReducedMotion]);

  const displayPct = isReducedMotion && hasAnimated ? skill.pct : currentPct;

  return (
    <div
      onMouseEnter={playHoverSound}
      className="p-6 rounded-2xl glass-panel border border-white/10 hover:border-[#9b6bff]/50 hover:shadow-[0_15px_40px_-15px_rgba(155,107,255,0.4)] transition-all duration-300 group cursor-default flex flex-col justify-between space-y-4"
    >
      {/* Top Header: Icon, Name & Percentage */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#9b6bff] text-lg group-hover:scale-110 group-hover:text-[#5be6ff] transition-all">
              <i className={`fa-solid ${skill.icon}`} />
            </div>
            <div>
              <h4 className="text-base font-bold text-white group-hover:text-[#5be6ff] transition-colors">
                {skill.name}
              </h4>
              <span className="text-[10px] font-mono text-[#7d84a6]">
                {skill.status}
              </span>
            </div>
          </div>

          {/* Animated Numeric Counter */}
          <div className="font-mono font-bold text-lg text-[#5b8cff] tracking-tight">
            {displayPct}%
          </div>
        </div>

        <p className="text-xs text-[#b7bcd6] leading-relaxed font-light line-clamp-2">
          {skill.desc}
        </p>
      </div>

      {/* Progress Track with Visibly Traveling Highlight & Glowing Endpoint */}
      <div className="space-y-1.5 pt-2">
        <div className="w-full h-2.5 rounded-full bg-white/5 border border-white/10 overflow-hidden relative">
          {/* Main Animated Growing Fill Bar */}
          <div
            className="h-full rounded-full relative transition-all duration-75"
            style={{
              width: `${displayPct}%`,
              background: 'linear-gradient(135deg, #5b8cff 0%, #9b6bff 55%, #ff6bd6 100%)',
              boxShadow: '0 0 12px rgba(155, 107, 255, 0.6)'
            }}
          >
            {/* Visibly Traveling Light Pulse Sweeping Across the Filled Line */}
            {hasAnimated && !isReducedMotion && (
              <div
                className="absolute inset-y-0 w-16 bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none skill-travel-highlight"
                style={{
                  filter: 'blur(1px)'
                }}
              />
            )}
          </div>
        </div>

        {/* Track Subtext */}
        <div className="flex justify-between text-[10px] font-mono text-[#7d84a6]">
          <span>0%</span>
          <span>Target: {skill.pct}%</span>
        </div>
      </div>
    </div>
  );
}
