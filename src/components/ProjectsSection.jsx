import React, { useState } from 'react';
import { featuredProjects } from '../data/portfolioData';
import { playHoverSound } from '../utils/audio';
import { GithubIcon } from './SocialIcons';
import { 
  X, 
  CheckCircle,
  Eye,
  Radio,
  ChevronRight
} from 'lucide-react';

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState(null);

  const openProjectModal = (proj) => {
    setSelectedProject(proj);
    playHoverSound();
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
  };

  return (
    <section id="projects" className="relative py-28 px-6 bg-[#07080b] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-10 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-xs font-mono text-cyan-300">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>03 &bull; PRACTICAL ENGINEERING</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            IDEAS THAT BECOME <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">REAL PROJECTS</span>
          </h2>
          <p className="text-slate-400 font-mono text-sm leading-relaxed">
            Real implementations spanning AI agents, environmental IoT hardware, assistive platforms, and rural marketplaces.
          </p>
        </div>

        {/* Projects Grid with 3D Interactive Perspective Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project) => (
            <Project3DCard
              key={project.id}
              project={project}
              openProjectModal={openProjectModal}
            />
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0d111a] border border-cyan-500/40 p-6 sm:p-8 shadow-2xl shadow-cyan-500/20">
            {/* Close Button */}
            <button
              onClick={closeProjectModal}
              className="absolute top-6 right-6 p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-400 hover:text-white hover:border-cyan-500/50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="space-y-2 mb-6 pr-12">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                <span>{selectedProject.category}</span>
                <span>&bull;</span>
                <span className="text-slate-400">{selectedProject.status}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                {selectedProject.title}
              </h3>
              <p className="text-sm font-mono text-cyan-300">
                {selectedProject.tagline}
              </p>
            </div>

            {/* Modal Illustration Preview */}
            <div className="w-full h-44 rounded-2xl bg-[#07080b] border border-white/10 p-4 mb-6 flex items-center justify-center">
              <ProjectIllustration type={selectedProject.id} isLarge />
            </div>

            {/* Modal Description */}
            <div className="space-y-4 mb-6 text-sm text-slate-300 leading-relaxed font-light">
              <p>{selectedProject.description}</p>
            </div>

            {/* Architecture Highlights */}
            <div className="space-y-3 mb-6">
              <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400">
                Key Technical Highlights &bull; Architecture
              </h4>
              <div className="space-y-2">
                {selectedProject.highlights.map((hl, hlIdx) => (
                  <div key={hlIdx} className="flex items-start gap-2.5 text-xs text-slate-300 font-light">
                    <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies */}
            <div className="space-y-2 mb-8">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Applied Technologies
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.technologies.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-md bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono text-cyan-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Action Buttons */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
              <button
                onClick={closeProjectModal}
                className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-slate-300 hover:text-white"
              >
                Close View
              </button>
              {selectedProject.githubUrl && (
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs font-mono flex items-center gap-2 shadow-md shadow-cyan-500/30"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>Inspect on GitHub</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// 3D Perspective Tilt Card with Specular Glare following mouse
function Project3DCard({ project, openProjectModal }) {
  const cardRef = React.useRef(null);
  const [transformStyle, setTransformStyle] = React.useState('');
  const [glareStyle, setGlareStyle] = React.useState('none');

  const onMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const midX = rect.width / 2;
    const midY = rect.height / 2;
    const rotX = ((y - midY) / midY) * -10;
    const rotY = ((x - midX) / midX) * 10;

    setTransformStyle(`perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`);
    setGlareStyle(`radial-gradient(circle at ${x}px ${y}px, rgba(0, 240, 255, 0.22) 0%, transparent 65%)`);
  };

  const onMouseLeave = () => {
    setTransformStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setGlareStyle('none');
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        transform: transformStyle,
        transition: 'transform 0.15s ease-out'
      }}
      className="group relative rounded-3xl glass-panel border border-white/10 hover:border-cyan-500/50 hover:shadow-[0_15px_40px_rgba(0,240,255,0.2)] flex flex-col justify-between overflow-hidden will-change-transform"
    >
      {/* 3D Dynamic Specular Glare */}
      <div 
        className="absolute inset-0 pointer-events-none z-20 mix-blend-screen transition-opacity duration-200"
        style={{ background: glareStyle }}
      />

      {/* Card Top: Interactive Thumbnail Illustration */}
      <div 
        onClick={() => openProjectModal(project)}
        className="relative w-full h-52 bg-[#0d121e] border-b border-white/5 overflow-hidden cursor-pointer"
      >
        <div className="w-full h-full p-4 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
          <ProjectIllustration type={project.id} />
        </div>

        <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-[#07080b]/80 border border-white/10 text-[10px] font-mono text-slate-300 backdrop-blur-md">
          {project.category}
        </div>

        <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-[10px] font-mono text-cyan-300 backdrop-blur-md">
          {project.status}
        </div>

        <div className="absolute inset-0 bg-[#07080b]/50 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 backdrop-blur-[2px] transition-opacity duration-200">
          <span className="px-3.5 py-1.5 rounded-full bg-cyan-500 text-slate-950 text-xs font-bold font-mono flex items-center gap-1.5 shadow-lg shadow-cyan-500/40">
            <Eye className="w-3.5 h-3.5" />
            Inspect Architecture
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
            {project.title}
          </h3>

          <p className="text-xs font-mono text-cyan-400/80">
            {project.tagline}
          </p>

          <p className="text-xs text-slate-400 leading-relaxed font-light line-clamp-3">
            {project.description}
          </p>
        </div>

        <div className="pt-2">
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((tech, tIdx) => (
              <span
                key={tIdx}
                className="px-2 py-0.5 rounded-md bg-slate-900 border border-white/10 text-[10px] font-mono text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-white/5 flex items-center justify-between">
          <button
            onClick={() => openProjectModal(project)}
            className="text-xs font-mono text-cyan-400 hover:text-white flex items-center gap-1 group-hover:translate-x-1 transition-all cursor-pointer"
          >
            <span>View Project</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                title="View GitHub Repository"
                className="p-2 rounded-lg bg-slate-900 border border-white/10 text-slate-400 hover:text-white hover:border-cyan-500/40 transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Custom Bespoke Vector Architectural Illustrations for all 6 projects
function ProjectIllustration({ type, isLarge = false }) {
  const sizeClass = isLarge ? "w-full h-full max-h-40" : "w-full h-full max-h-44";

  switch (type) {
    case 'skillpath-ai':
      return (
        <svg viewBox="0 0 240 120" className={sizeClass} fill="none">
          {/* Orbital rings */}
          <ellipse cx="120" cy="60" rx="90" ry="35" stroke="#00F0FF" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
          <ellipse cx="120" cy="60" rx="60" ry="22" stroke="#3B82F6" strokeWidth="1" opacity="0.6" />
          {/* Central Core */}
          <circle cx="120" cy="60" r="14" fill="#0E1626" stroke="#00F0FF" strokeWidth="2" />
          <circle cx="120" cy="60" r="6" fill="#00F0FF" className="animate-ping" opacity="0.75" />
          {/* Orbiting nodes (Skills) */}
          <circle cx="50" cy="50" r="7" fill="#1E293B" stroke="#38BDF8" strokeWidth="1.5" />
          <text x="44" y="53" fontSize="8" fill="#38BDF8" fontFamily="monospace">ML</text>
          <circle cx="180" cy="75" r="7" fill="#1E293B" stroke="#00F0FF" strokeWidth="1.5" />
          <text x="174" y="78" fontSize="8" fill="#00F0FF" fontFamily="monospace">AI</text>
          <circle cx="150" cy="38" r="6" fill="#1E293B" stroke="#A855F7" strokeWidth="1.5" />
          <circle cx="90" cy="80" r="6" fill="#1E293B" stroke="#10B981" strokeWidth="1.5" />
          {/* Connecting rays */}
          <line x1="120" y1="60" x2="50" y2="50" stroke="#00F0FF" strokeWidth="1" opacity="0.5" />
          <line x1="120" y1="60" x2="180" y2="75" stroke="#00F0FF" strokeWidth="1" opacity="0.5" />
          <line x1="120" y1="60" x2="150" y2="38" stroke="#38BDF8" strokeWidth="1" opacity="0.4" />
          <line x1="120" y1="60" x2="90" y2="80" stroke="#38BDF8" strokeWidth="1" opacity="0.4" />
        </svg>
      );

    case 'mindspace-ai':
      return (
        <svg viewBox="0 0 240 120" className={sizeClass} fill="none">
          {/* Voice Frequency Waves */}
          {[20, 35, 50, 65, 80, 95, 110, 125, 140, 155, 170, 185, 200, 215].map((x, i) => {
            const h = Math.sin(i * 0.7) * 28 + 32;
            return (
              <rect
                key={i}
                x={x}
                y={60 - h / 2}
                width="5"
                height={h}
                rx="2.5"
                fill={i % 2 === 0 ? "#00F0FF" : "#3B82F6"}
                opacity={0.3 + (i / 14) * 0.6}
              />
            );
          })}
          {/* Memory Node Center */}
          <circle cx="120" cy="60" r="18" fill="#07080B" stroke="#00F0FF" strokeWidth="2" />
          <path d="M114 56 Q120 50 126 56 Q120 68 114 56 Z" fill="#00F0FF" />
          <circle cx="120" cy="66" r="2" fill="#FFFFFF" />
        </svg>
      );

    case 'worqiz':
      return (
        <svg viewBox="0 0 240 120" className={sizeClass} fill="none">
          {/* Triangular Platform Matrix */}
          <polygon points="120,25 45,95 195,95" stroke="#00F0FF" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.5" />
          {/* 3 User Nodes */}
          {/* Worker Node */}
          <circle cx="120" cy="25" r="14" fill="#0F172A" stroke="#00F0FF" strokeWidth="2" />
          <text x="110" y="28" fontSize="8" fill="#00F0FF" fontFamily="monospace">WORKER</text>
          {/* Field Agent Node */}
          <circle cx="45" cy="95" r="14" fill="#0F172A" stroke="#38BDF8" strokeWidth="2" />
          <text x="37" y="98" fontSize="8" fill="#38BDF8" fontFamily="monospace">AGENT</text>
          {/* Merchant Shop Node */}
          <circle cx="195" cy="95" r="14" fill="#0F172A" stroke="#818CF8" strokeWidth="2" />
          <text x="187" y="98" fontSize="8" fill="#818CF8" fontFamily="monospace">SHOP</text>
          {/* Center Dispatch Hub */}
          <circle cx="120" cy="72" r="10" fill="#00F0FF" fillOpacity="0.2" stroke="#00F0FF" strokeWidth="1.5" />
          <line x1="120" y1="25" x2="120" y2="72" stroke="#00F0FF" strokeWidth="1" />
          <line x1="45" y1="95" x2="120" y2="72" stroke="#38BDF8" strokeWidth="1" />
          <line x1="195" y1="95" x2="120" y2="72" stroke="#818CF8" strokeWidth="1" />
        </svg>
      );

    case 'aquashield':
      return (
        <svg viewBox="0 0 240 120" className={sizeClass} fill="none">
          {/* Multi-stage filtration pipe */}
          <rect x="30" y="42" width="180" height="36" rx="8" stroke="#38BDF8" strokeWidth="1.5" fill="#0B132B" />
          {/* Stage 1 Mesh */}
          <line x1="80" y1="42" x2="80" y2="78" stroke="#00F0FF" strokeWidth="2" strokeDasharray="2 2" />
          {/* Stage 2 Fine Filter */}
          <line x1="130" y1="42" x2="130" y2="78" stroke="#00F0FF" strokeWidth="3" strokeDasharray="1 1" />
          {/* Microplastic particles filtered */}
          <circle cx="50" cy="54" r="3" fill="#F43F5E" />
          <circle cx="62" cy="66" r="2.5" fill="#F43F5E" />
          <circle cx="95" cy="50" r="2" fill="#FB923C" />
          <circle cx="110" cy="68" r="1.5" fill="#FB923C" />
          {/* Purified water outflow */}
          <path d="M 140 60 Q 170 54 200 60" stroke="#00F0FF" strokeWidth="3" strokeLinecap="round" />
          {/* Sensor probe */}
          <rect x="155" y="24" width="10" height="20" rx="2" fill="#00F0FF" />
          <line x1="160" y1="20" x2="160" y2="24" stroke="#00F0FF" strokeWidth="1.5" />
          <text x="170" y="32" fontSize="8" fill="#38BDF8" fontFamily="monospace">ESP32</text>
        </svg>
      );

    case 'namma-ooru-vivasai':
      return (
        <svg viewBox="0 0 240 120" className={sizeClass} fill="none">
          {/* Agritech Field Contours */}
          <path d="M 30 90 Q 80 60 140 85 T 210 70" stroke="#10B981" strokeWidth="2" fill="none" opacity="0.7" />
          <path d="M 30 105 Q 90 75 150 100 T 210 85" stroke="#059669" strokeWidth="1.5" fill="none" opacity="0.5" />
          {/* Direct farmer node */}
          <circle cx="60" cy="50" r="14" fill="#064E3B" stroke="#10B981" strokeWidth="2" />
          <text x="50" y="53" fontSize="8" fill="#A7F3D0" fontFamily="monospace">FARM</text>
          {/* Direct buyer node */}
          <circle cx="180" cy="50" r="14" fill="#064E3B" stroke="#10B981" strokeWidth="2" />
          <text x="170" y="53" fontSize="8" fill="#A7F3D0" fontFamily="monospace">BUYER</text>
          {/* Direct zero-middleman vector */}
          <path d="M 75 50 Q 120 25 165 50" stroke="#00F0FF" strokeWidth="2.5" strokeDasharray="4 3" />
          <polygon points="168,50 160,46 162,53" fill="#00F0FF" />
          <text x="100" y="22" fontSize="8" fill="#00F0FF" fontFamily="monospace">0% MIDDLEMEN</text>
        </svg>
      );

    case 'road-safety-sos':
      return (
        <svg viewBox="0 0 240 120" className={sizeClass} fill="none">
          {/* Highway radar grid */}
          <circle cx="120" cy="65" r="45" stroke="#F59E0B" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
          <circle cx="120" cy="65" r="28" stroke="#EF4444" strokeWidth="1" opacity="0.5" />
          {/* Emergency SOS Center */}
          <polygon points="120,40 135,70 105,70" fill="#EF4444" fillOpacity="0.2" stroke="#EF4444" strokeWidth="2" />
          <circle cx="120" cy="65" r="5" fill="#EF4444" className="animate-ping" />
          <text x="110" y="62" fontSize="9" fontWeight="bold" fill="#F8FAFC" fontFamily="monospace">SOS</text>
          {/* Satellite Beacon Vectors */}
          <line x1="120" y1="40" x2="60" y2="18" stroke="#00F0FF" strokeWidth="1.5" strokeDasharray="2 2" />
          <circle cx="60" cy="18" r="6" fill="#0F172A" stroke="#00F0FF" strokeWidth="1.5" />
          <line x1="120" y1="40" x2="180" y2="18" stroke="#00F0FF" strokeWidth="1.5" strokeDasharray="2 2" />
          <circle cx="180" cy="18" r="6" fill="#0F172A" stroke="#00F0FF" strokeWidth="1.5" />
        </svg>
      );

    default:
      return null;
  }
}
