import React, { useState, useEffect } from 'react';
import { playHoverSound } from '../utils/audio';

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'hackathons', label: 'Hackathons' },
  { id: 'contact', label: 'Contact' }
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setScrollProgress((scrollY / docHeight) * 100);
      }
      setIsScrolled(scrollY > 40);

      // ScrollSpy logic
      const sections = NAV_ITEMS.map((item) => document.getElementById(item.id));
      const scrollPosition = scrollY + 220;

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

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    playHoverSound();
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-[3px] z-[1001] transition-all duration-75"
        style={{
          width: `${scrollProgress}%`,
          background: 'linear-gradient(135deg, #5b8cff 0%, #9b6bff 55%, #ff6bd6 100%)',
          boxShadow: '0 0 12px #9b6bff'
        }}
      />

      {/* Main Navbar Header */}
      <header
        className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-400 ${
          isScrolled
            ? 'py-3 bg-[#080b1a]/85 backdrop-blur-xl border-b border-white/10 shadow-lg'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="w-[92%] max-w-[1180px] mx-auto flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('home');
            }}
            className="flex items-center gap-2.5 font-extrabold text-lg tracking-tight text-white group cursor-pointer"
          >
            <span
              className="w-9 h-9 rounded-xl flex items-center justify-center font-mono font-bold text-sm text-white shadow-[0_0_25px_rgba(120,110,255,0.4)] group-hover:scale-105 transition-transform"
              style={{
                background: 'linear-gradient(135deg, #5b8cff 0%, #9b6bff 55%, #ff6bd6 100%)'
              }}
            >
              DM
            </span>
            <span className="font-bold text-white group-hover:text-[#5be6ff] transition-colors">
              Dhivesh M
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'text-white font-semibold shadow-[0_0_20px_rgba(155,107,255,0.4)]'
                      : 'text-[#b7bcd6] hover:text-white hover:bg-white/5'
                  }`}
                  style={{
                    background: isActive
                      ? 'linear-gradient(135deg, #5b8cff 0%, #9b6bff 55%, #ff6bd6 100%)'
                      : 'transparent'
                  }}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Nav Actions */}
          <div className="flex items-center gap-2.5">
            {/* Hire Me CTA Button */}
            <button
              onClick={() => scrollToSection('contact')}
              className="hidden sm:inline-flex px-5 py-2 rounded-full font-semibold text-xs text-white shadow-[0_0_25px_rgba(120,110,255,0.4)] hover:scale-105 transition-all cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #5b8cff 0%, #9b6bff 55%, #ff6bd6 100%)'
              }}
            >
              Hire Me
            </button>

            {/* Mobile Hamburger Burger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              className="lg:hidden w-9 h-9 rounded-xl border border-white/15 flex items-center justify-center bg-white/5 text-white cursor-pointer"
            >
              <i className="fa-solid fa-bars text-sm" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <>
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1050]"
          />
          <div className="fixed top-0 right-0 h-full w-[80%] max-w-[320px] bg-[#0c1024] border-l border-white/10 z-[1100] p-8 flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <span className="font-mono text-xs uppercase tracking-wider text-[#9b6bff] font-bold">
                  Navigation
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-slate-400 hover:text-white cursor-pointer"
                >
                  <i className="fa-solid fa-xmark text-lg" />
                </button>
              </div>

              <div className="flex flex-col gap-2 mt-6">
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="text-left py-3 px-4 rounded-xl text-sm font-semibold text-[#b7bcd6] hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 space-y-3">
              <button
                onClick={() => scrollToSection('contact')}
                className="w-full py-3 rounded-full text-center font-bold text-xs text-white cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #5b8cff 0%, #9b6bff 55%, #ff6bd6 100%)'
                }}
              >
                Hire Me
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
