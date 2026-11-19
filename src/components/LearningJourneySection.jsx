import React from 'react';
import { learningJourney } from '../data/portfolioData';
import { playHoverSound } from '../utils/audio';
import { 
  Milestone, 
  Sparkles, 
  Clock, 
  Award, 
  Compass, 
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Hourglass
} from 'lucide-react';

export default function LearningJourneySection() {
  const verifiedCertifications = [
    {
      title: "Python for Data Science, AI & Development",
      issuer: "IBM & Coursera",
      status: "Verified Completion"
    },
    {
      title: "C for Everyone: Structured Programming",
      issuer: "University of California, Santa Cruz",
      status: "Verified Completion"
    },
    {
      title: "Applications of Generative AI in L&D",
      issuer: "LinkedIn Learning",
      status: "Verified Completion"
    },
    {
      title: "AI-Driven Project Management: Techniques & Insights",
      issuer: "LinkedIn Learning",
      status: "Verified Completion"
    },
    {
      title: "AI for Business Professionals",
      issuer: "HP LIFE",
      status: "Verified Completion"
    },
    {
      title: "Entrepreneurship: From Idea to Business",
      issuer: "Udemy",
      status: "Verified Completion"
    }
  ];

  return (
    <section id="journey" className="relative py-28 px-6 bg-[#07080b]/95 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-cyan-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-xs font-mono text-cyan-300">
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span>04 &bull; CONTINUOUS PROGRESSION</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            MY LEARNING <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">JOURNEY</span>
          </h2>
          <p className="text-slate-400 font-mono text-sm leading-relaxed">
            The chronological path from foundational low-level programming to custom AI models, hardware telemetry, and real-time creative technology.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto mb-24">
          {/* Central Vertical Timeline Spine */}
          <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-cyan-400 via-blue-500 to-slate-800 -translate-x-1/2" />

          {/* Timeline Nodes */}
          <div className="space-y-12">
            {learningJourney.map((step, idx) => {
              const isEven = idx % 2 === 0;
              const isExploring = step.status.includes('Learner');

              return (
                <div
                  key={idx}
                  onMouseEnter={playHoverSound}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? 'md:flex-row-reverse' : ''
                  } group`}
                >
                  {/* Timeline Node Center Marker */}
                  <div className="absolute left-4 md:left-1/2 top-6 -translate-x-1/2 z-20 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-[#07080b] border-2 border-cyan-400 group-hover:border-cyan-300 flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.6)] group-hover:scale-125 transition-all">
                      <div className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                    </div>
                  </div>

                  {/* Spacer for 2-column desktop layout */}
                  <div className="hidden md:block w-1/2" />

                  {/* Timeline Card */}
                  <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-8">
                    <div className="p-6 rounded-3xl glass-panel border border-white/10 group-hover:border-cyan-500/40 group-hover:shadow-[0_8px_30px_rgba(0,240,255,0.15)] transition-all duration-300">
                      {/* Node Header */}
                      <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/5">
                        <span className="text-xs font-mono font-bold text-cyan-400">
                          {step.stage}
                        </span>
                        <span
                          className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border ${
                            isExploring
                              ? 'bg-amber-950/40 border-amber-500/40 text-amber-300'
                              : 'bg-cyan-950/40 border-cyan-500/40 text-cyan-300'
                          }`}
                        >
                          {step.status}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                        {step.title}
                      </h3>

                      <p className="text-xs text-slate-300 leading-relaxed font-light mb-4">
                        {step.description}
                      </p>

                      {/* Associated Skills Chips */}
                      <div className="flex flex-wrap gap-1.5">
                        {step.skills.map((s, sIdx) => (
                          <span
                            key={sIdx}
                            className="px-2 py-0.5 rounded-md bg-slate-900 border border-white/5 text-[10px] font-mono text-slate-400"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Real Verified Certifications Grid */}
        <div className="mt-16 pt-16 border-t border-white/10">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400">
              <Award className="w-4 h-4" />
              <span>OFFICIAL CERTIFICATIONS</span>
            </div>
            <h3 className="text-2xl font-bold text-white">
              Coursework &amp; Credentials
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Directly documented from official educational platforms.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {verifiedCertifications.map((cert, cIdx) => (
              <div
                key={cIdx}
                onMouseEnter={playHoverSound}
                className="p-4 rounded-2xl glass-panel border border-white/5 hover:border-cyan-500/30 transition-all group"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {cert.title}
                    </h4>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">
                      {cert.issuer}
                    </p>
                    <span className="inline-block mt-2 text-[10px] font-mono text-emerald-400">
                      &bull; {cert.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
