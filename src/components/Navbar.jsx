import React, { useState, useEffect } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Eye, 
  Menu, 
  X, 
  FileText, 
  Sparkles 
} from 'lucide-react';
import { toggleAudioMute, getAudioMuted, playHoverSound } from '../utils/audio';

const NAV_ITEMS = [
  { id: 'hero', label: 'Home' },
  { id: 'showcase', label: 'Showcase' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'journey', label: 'Journey' },
  { id: 'resume', label: 'Resume' },
  { id: 'contact', label: 'Contact' }
];

export default function Navbar({ isReducedMotion, setIsReducedMotion }) {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(getAudioMuted());

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 80);

      // ScrollSpy logic
      const sections = NAV_ITEMS.map((item) => document.getElementById(item.id));
      const scrollPosition = scrollY + 250;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec && sec.offsetTop <= scrollPosition) {
          setActiveSection(NAV_ITEMS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const nextMuted = toggleAudioMute();
    setIsMuted(nextMuted);
  };

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    playHoverSound();
    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'py-3 bg-[#07080b]/85 backdrop-blur-xl border-b border-cyan-500/15 shadow-lg shadow-black/40'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo / Brand */}
          <button
            onClick={() => scrollToSection('hero')}
            onMouseEnter={playHoverSound}
            className="flex items-center gap-3 group text-left cursor-pointer"
          >
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-[1.5px] shadow-[0_0_15px_rgba(0,240,255,0.4)] group-hover:shadow-[0_0_25px_rgba(0,240,255,0.7)] transition-all">
              <div className="w-full h-full bg-[#07080b] rounded-[10px] flex items-center justify-center">
                <span className="font-mono font-bold text-sm text-cyan-400 group-hover:text-white transition-colors">
                  D
                </span>
              </div>
            </div>
            <div>
              <div className="text-sm font-bold tracking-tight text-white group-hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                DHIVESH M
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              </div>
              <div className="text-[10px] font-mono text-slate-400 tracking-wider">
                AI/ML &bull; CREATIVE TECH
              </div>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-900/60 border border-white/10 backdrop-blur-md">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  onMouseEnter={playHoverSound}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                    isActive
                      ? 'text-cyan-300 font-semibold bg-cyan-500/15 shadow-[inset_0_0_12px_rgba(0,240,255,0.2)]'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-cyan-400 rounded-full shadow-[0_0_6px_rgba(0,240,255,0.8)]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Utility Controls & Action CTA */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Audio Toggle */}
            <button
              onClick={handleSoundToggle}
              title={isMuted ? 'Turn Sound ON' : 'Mute Sound'}
              className="p-2 rounded-xl bg-slate-900/70 border border-slate-700/60 text-slate-400 hover:text-cyan-300 hover:border-cyan-500/40 backdrop-blur-md transition-all cursor-pointer"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
            </button>

            {/* Reduced Motion Toggle */}
            <button
              onClick={() => setIsReducedMotion(!isReducedMotion)}
              title={isReducedMotion ? 'Enable Full Motion' : 'Reduce Motion'}
              className={`p-2 rounded-xl border backdrop-blur-md transition-all cursor-pointer ${
                isReducedMotion
                  ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                  : 'bg-slate-900/70 border-slate-700/60 text-slate-400 hover:text-cyan-300 hover:border-cyan-500/40'
              }`}
            >
              <Eye className="w-4 h-4" />
            </button>

            {/* Resume Button */}
            <a
              href="/resume/resume.pdf"
              download="Dhivesh_M_Resume.pdf"
              onMouseEnter={playHoverSound}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-700 hover:border-cyan-500/40 text-xs font-mono text-slate-300 hover:text-cyan-300 backdrop-blur-md transition-all"
            >
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              <span>Resume</span>
            </a>

            {/* Hire Me CTA */}
            <button
              onClick={() => scrollToSection('contact')}
              onMouseEnter={playHoverSound}
              className="flex items-center gap-2 px-4 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs tracking-wide shadow-md shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Hire Me</span>
            </button>
          </div>

          {/* Mobile Hamburger Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-300 hover:text-cyan-300 focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-cyan-400" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#07080b]/95 backdrop-blur-2xl flex flex-col justify-between p-8 pt-28 md:hidden animate-in fade-in duration-200">
          <div className="space-y-4">
            <p className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-6">
              Navigation Menu
            </p>
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="w-full text-left py-2.5 text-2xl font-bold tracking-tight text-slate-200 hover:text-cyan-300 border-b border-slate-800/80 flex items-center justify-between"
              >
                <span>{item.label}</span>
                <span className="text-xs font-mono text-slate-500">&rarr;</span>
              </button>
            ))}
          </div>

          <div className="pt-8 border-t border-slate-800/80 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-mono text-slate-400">Audio Feedback</span>
              <button
                onClick={handleSoundToggle}
                className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-cyan-300 flex items-center gap-1.5"
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-cyan-400" />}
                <span>{isMuted ? 'Muted' : 'Enabled'}</span>
              </button>
            </div>

            <a
              href="/resume/resume.pdf"
              download="Dhivesh_M_Resume.pdf"
              className="w-full py-3 rounded-xl bg-slate-900 border border-cyan-500/40 text-center font-mono text-sm text-cyan-300 flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span>Download Official Resume</span>
            </a>

            <button
              onClick={() => scrollToSection('contact')}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-center tracking-wide shadow-lg shadow-cyan-500/30"
            >
              Get In Touch &bull; Hire Dhivesh
            </button>
          </div>
        </div>
      )}
    </>
  );
}
