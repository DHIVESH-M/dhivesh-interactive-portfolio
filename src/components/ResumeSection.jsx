import React, { useState } from 'react';
import { personalInfo } from '../data/portfolioData';
import { playHoverSound } from '../utils/audio';
import { 
  FileText, 
  Download, 
  ExternalLink, 
  GraduationCap, 
  Award, 
  Sparkles, 
  CheckCircle,
  Eye,
  FileCheck
} from 'lucide-react';

export default function ResumeSection() {
  const [activeTab, setActiveTab] = useState('summary');

  return (
    <section id="resume" className="relative py-28 px-6 bg-[#07080b] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-xs font-mono text-cyan-300">
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span>05 &bull; CURRICULUM VITAE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            OFFICIAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">RESUME</span>
          </h2>
          <p className="text-slate-400 font-mono text-sm leading-relaxed">
            Detailed academic record, core competencies, verified certificates, and hackathon prototypes.
          </p>

          {/* Download & View Actions */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a
              href={personalInfo.contacts.resumePdf}
              download="Dhivesh_M_Resume.pdf"
              onMouseEnter={playHoverSound}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm font-mono flex items-center gap-2 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Resume (PDF)</span>
            </a>

            <a
              href={personalInfo.contacts.resumePdf}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={playHoverSound}
              className="px-6 py-3 rounded-2xl bg-slate-900 border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 hover:text-white font-mono text-sm flex items-center gap-2 backdrop-blur-md transition-all cursor-pointer"
            >
              <ExternalLink className="w-4 h-4" />
              <span>View Fullscreen PDF</span>
            </a>
          </div>
        </div>

        {/* Clean Interactive Document Presentation Card */}
        <div className="max-w-4xl mx-auto rounded-3xl glass-panel border border-cyan-500/30 overflow-hidden shadow-2xl shadow-cyan-500/10">
          {/* Document Window Titlebar */}
          <div className="px-6 py-4 bg-[#0b0f19] border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-xs font-mono text-slate-300">
                DHIVESH_M_RESUME_2026.pdf
              </span>
            </div>

            <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-white/5">
              <button
                onClick={() => setActiveTab('summary')}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                  activeTab === 'summary'
                    ? 'bg-cyan-500/20 text-cyan-300 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Executive Summary
              </button>
              <button
                onClick={() => setActiveTab('academics')}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                  activeTab === 'academics'
                    ? 'bg-cyan-500/20 text-cyan-300 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Academics &amp; Objective
              </button>
            </div>
          </div>

          {/* Document Content View */}
          <div className="p-8 sm:p-12 space-y-8 bg-[#080b12]/80">
            {activeTab === 'summary' ? (
              <>
                {/* Header Info */}
                <div className="border-b border-white/10 pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h3 className="text-3xl font-black text-white tracking-tight">
                      DHIVESH M
                    </h3>
                    <p className="text-sm font-mono text-cyan-400">
                      AI &amp; ML Undergraduate &bull; Creative Technologist
                    </p>
                  </div>
                  <div className="text-xs font-mono text-slate-400 space-y-1">
                    <div>📍 Pollachi, Tamil Nadu, India</div>
                    <div>✉️ mdhivesh265@gmail.com</div>
                    <div>☎️ +91 80155 56443</div>
                  </div>
                </div>

                {/* Key Pillars */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
                      Technical Skills Portfolio
                    </h4>
                    <ul className="space-y-2 text-xs text-slate-300 font-light">
                      <li>&bull; <strong className="text-white">Programming:</strong> Java, C</li>
                      <li>&bull; <strong className="text-white">Artificial Intelligence:</strong> AI Model Development, Machine Learning, Real-time AI Projects</li>
                      <li>&bull; <strong className="text-white">Creative Technologies:</strong> Blender (3D Modeling), Adobe Illustrator, Unity (Learner)</li>
                      <li>&bull; <strong className="text-white">Cloud Computing:</strong> AWS (Learner)</li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
                      Key Prototype Systems
                    </h4>
                    <ul className="space-y-2 text-xs text-slate-300 font-light">
                      <li>&bull; <strong className="text-white">AquaShield:</strong> IoT Wastewater microplastic interception system (SIH Finalist).</li>
                      <li>&bull; <strong className="text-white">SkillPath AI:</strong> Multi-agent career gap intelligence platform.</li>
                      <li>&bull; <strong className="text-white">Mindspace AI:</strong> Voice assistant with memory and briefings.</li>
                      <li>&bull; <strong className="text-white">Namma Ooru Vivasai:</strong> Agritech direct marketplace.</li>
                    </ul>
                  </div>
                </div>

                {/* Hackathons & Challenges */}
                <div className="p-5 rounded-2xl bg-cyan-950/20 border border-cyan-500/20">
                  <div className="flex items-center gap-2 mb-2 text-sm font-bold text-cyan-300">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span>Hackathons &amp; Innovation Challenges</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    Actively involved in hackathons and competitive prototyping. Experienced in collaborating across cross-functional teams to ideate, build, and deliver working hardware and AI prototypes under intense time constraints.
                  </p>
                </div>
              </>
            ) : (
              <>
                {/* Career Objective & Academic Deep Dive */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
                      Career Objective
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                      Second-year B.Sc. Artificial Intelligence and Machine Learning student passionate about Artificial Intelligence, software development, and emerging technologies. Strong interest in building real-world applications, participating in innovation challenges, and continuously expanding technical expertise.
                    </p>
                  </div>

                  <div className="space-y-2 pt-4 border-t border-white/5">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
                      Formal Degree
                    </h4>
                    <div className="p-4 rounded-xl bg-slate-900 border border-white/5 space-y-1">
                      <div className="text-sm font-bold text-white">
                        Bachelor of Science — Artificial Intelligence and Machine Learning (AIML)
                      </div>
                      <div className="text-xs text-slate-400">
                        Rathinam College of Arts and Science / Rathinam Global University
                      </div>
                      <div className="text-xs font-mono text-cyan-300 pt-1">
                        Expected Graduation: 2028 &bull; Currently 2nd Year
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 pt-4 border-t border-white/5">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
                      Languages Known
                    </h4>
                    <div className="flex gap-3 text-xs font-mono text-slate-300">
                      <span className="px-3 py-1 rounded-lg bg-slate-900 border border-white/10">English (Professional)</span>
                      <span className="px-3 py-1 rounded-lg bg-slate-900 border border-white/10">Tamil (Native)</span>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Bottom Footer Verification Stamp */}
            <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <FileCheck className="w-4 h-4" />
                <span>Synchronized with PDF Asset</span>
              </span>
              <span>PATH: public/resume/resume.pdf</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
