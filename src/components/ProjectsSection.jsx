import React, { useState } from 'react';
import { featuredProjects } from '../data/portfolioData';
import { playHoverSound } from '../utils/audio';

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const filterCategories = ['All', 'AI & Machine Learning', 'IoT & Hardware', 'Web & Platforms'];

  const filteredProjects = activeFilter === 'All'
    ? featuredProjects
    : featuredProjects.filter((p) => p.category === activeFilter || p.isUpcoming);

  const openModal = (proj) => {
    setSelectedProject(proj);
    playHoverSound();
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <section id="projects" className="relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#070a18]">
      {/* Background Lighting */}
      <div className="absolute top-1/4 right-10 w-[550px] h-[550px] bg-[#5b8cff]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-[#9b6bff]/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="w-[92%] max-w-[1180px] mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/15 bg-white/5 text-xs font-mono text-[#5be6ff] uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5be6ff] shadow-[0_0_8px_#5be6ff]" />
            <span>Engineering Portfolio</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Things I've <span className="grad-text">Built</span>
          </h2>

          <p className="text-sm sm:text-base text-[#b7bcd6] leading-relaxed font-light">
            Real implementations spanning AI agents, environmental IoT hardware, rural market platforms, and emergency safety telemetry.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {filterCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveFilter(cat);
                  playHoverSound();
                }}
                className={`px-4 py-2 rounded-full text-xs font-mono font-semibold transition-all cursor-pointer ${
                  activeFilter === cat
                    ? 'text-white shadow-[0_0_20px_rgba(91,140,255,0.4)]'
                    : 'text-[#b7bcd6] bg-white/5 hover:text-white hover:bg-white/10 border border-white/10'
                }`}
                style={{
                  background: activeFilter === cat
                    ? 'linear-gradient(135deg, #5b8cff 0%, #9b6bff 55%, #ff6bd6 100%)'
                    : undefined
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenDetails={() => openModal(project)}
            />
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-[1200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0c1024] border border-white/20 p-6 sm:p-8 shadow-2xl shadow-indigo-950/60">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/10 border border-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <i className="fa-solid fa-xmark text-sm" />
            </button>

            {/* Modal Header */}
            <div className="space-y-2 mb-6 pr-12">
              <div className="flex items-center gap-2 text-xs font-mono text-[#5be6ff]">
                <span>{selectedProject.category}</span>
                <span>&bull;</span>
                <span className="text-[#b7bcd6]">{selectedProject.status}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                {selectedProject.title}
              </h3>
              <p className="text-sm font-mono text-[#9b6bff]">
                {selectedProject.tagline}
              </p>
            </div>

            {/* Modal Media Preview */}
            <div className="w-full h-52 sm:h-60 rounded-2xl overflow-hidden bg-black/40 border border-white/10 mb-6 flex items-center justify-center">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Description */}
            <div className="space-y-4 mb-6 text-sm text-[#b7bcd6] leading-relaxed font-light">
              <p>{selectedProject.description}</p>
            </div>

            {/* Highlights */}
            {selectedProject.highlights && (
              <div className="space-y-2 mb-6">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#5be6ff] font-bold">
                  Technical Architecture Highlights:
                </h4>
                <div className="space-y-2">
                  {selectedProject.highlights.map((hl, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-[#b7bcd6]">
                      <i className="fa-solid fa-check text-[#4ade80] mt-0.5" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Applied Tech Badges */}
            <div className="space-y-2 mb-8">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#7d84a6]">
                Technologies &amp; Libraries:
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.technologies.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-white"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 rounded-full border border-white/15 bg-white/5 text-xs font-mono text-[#b7bcd6] hover:text-white cursor-pointer"
              >
                Close View
              </button>

              {selectedProject.githubUrl && (
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2 rounded-full text-white font-bold text-xs font-mono flex items-center gap-2 shadow-lg cursor-pointer"
                  style={{
                    background: 'linear-gradient(135deg, #5b8cff 0%, #9b6bff 55%, #ff6bd6 100%)'
                  }}
                >
                  <i className="fa-brands fa-github text-sm" />
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

// 3D Perspective Tilt Project Card with Image Zoom
function ProjectCard({ project, onOpenDetails }) {
  const cardRef = React.useRef(null);
  const [transformStyle, setTransformStyle] = React.useState('');
  const [glareStyle, setGlareStyle] = React.useState('none');

  const onMouseMove = (e) => {
    if (window.innerWidth < 768) return;
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const midX = rect.width / 2;
    const midY = rect.height / 2;
    const rotX = ((y - midY) / midY) * -8;
    const rotY = ((x - midX) / midX) * 8;

    setTransformStyle(`perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`);
    setGlareStyle(`radial-gradient(circle at ${x}px ${y}px, rgba(155, 107, 255, 0.22) 0%, transparent 60%)`);
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
      className={`group relative rounded-3xl glass-panel border border-white/10 hover:border-[#9b6bff]/60 hover:shadow-[0_20px_50px_-15px_rgba(155,107,255,0.4)] flex flex-col justify-between overflow-hidden will-change-transform ${
        project.isUpcoming ? 'opacity-85 border-dashed border-[#9b6bff]/40' : ''
      }`}
    >
      {/* Specular Glare */}
      <div
        className="absolute inset-0 pointer-events-none z-20 mix-blend-screen transition-opacity duration-200"
        style={{ background: glareStyle }}
      />

      {/* Card Media Header */}
      <div
        onClick={onOpenDetails}
        className="relative w-full h-52 bg-[#090d1e] border-b border-white/10 overflow-hidden cursor-pointer"
      >
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
        />

        <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-[#080b1a]/85 border border-white/15 text-[10px] font-mono text-[#b7bcd6] backdrop-blur-md">
          {project.category}
        </div>

        <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-[#9b6bff]/20 border border-[#9b6bff]/50 text-[10px] font-mono text-[#5be6ff] backdrop-blur-md">
          {project.badge}
        </div>

        {/* Hover inspect overlay */}
        <div className="absolute inset-0 bg-[#080b1a]/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 backdrop-blur-[2px] transition-opacity duration-200">
          <span
            className="px-4 py-2 rounded-full text-white text-xs font-bold font-mono flex items-center gap-2 shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #5b8cff 0%, #9b6bff 55%, #ff6bd6 100%)'
            }}
          >
            <i className="fa-regular fa-eye text-xs" />
            <span>View Architecture</span>
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#9b6bff] font-bold">
            {project.status}
          </span>

          <h3 className="text-xl font-bold text-white group-hover:text-[#5be6ff] transition-colors">
            {project.title}
          </h3>

          <p className="text-xs text-[#b7bcd6] leading-relaxed font-light line-clamp-3">
            {project.description}
          </p>
        </div>

        {/* Tech Badges */}
        <div className="pt-2">
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((t, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-[#b7bcd6]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between">
          <button
            onClick={onOpenDetails}
            className="text-xs font-mono font-bold text-[#5be6ff] hover:text-white flex items-center gap-1 group-hover:translate-x-1 transition-all cursor-pointer"
          >
            <span>{project.isUpcoming ? 'Explore R&D' : 'Details'}</span>
            <i className="fa-solid fa-arrow-right text-[10px]" />
          </button>

          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                title="View GitHub Repository"
                className="p-2 rounded-lg bg-white/5 border border-white/10 text-[#b7bcd6] hover:text-white hover:border-[#9b6bff] transition-colors"
              >
                <i className="fa-brands fa-github text-sm" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
