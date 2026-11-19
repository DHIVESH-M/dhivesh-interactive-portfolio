import React, { useState } from 'react';
import ThreeBackground from './components/3d/ThreeBackground';
import CyberGlowCursor from './components/CyberGlowCursor';
import Navbar from './components/Navbar';
import HeroVideoSection from './components/HeroVideoSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import CertificatesSection from './components/CertificatesSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function App() {
  const [isReducedMotion] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#07080b] text-[#f8fafc] overflow-x-hidden selection:bg-[#00f5ff]/30 selection:text-white">
      {/* Interactive Full-Page Three.js 3D Background with Neural Particles, Floating Polyhedra & Horizon Cyber Grid */}
      <ThreeBackground isReducedMotion={isReducedMotion} />

      {/* Cyber Ambient Cursor Glow Aura */}
      <CyberGlowCursor isReducedMotion={isReducedMotion} />

      {/* Top Navigation Bar */}
      <Navbar />

      {/* 1. Cinematic Glass-Shooting Video Hero with 2.5D Face Tracking, 3D Glass Shards & Skill Fragments */}
      <HeroVideoSection isReducedMotion={isReducedMotion} />

      {/* 2. About Me & Academic Education Section */}
      <AboutSection />

      {/* 3. Skills Section with Animated Progress Lines, Traveling Glowing Highlight, and Hand-Drawn Journey */}
      <SkillsSection isReducedMotion={isReducedMotion} />

      {/* 4. Projects Showcase with Custom Project Visuals, Categories, and Architecture Modal */}
      <ProjectsSection />

      {/* 5. Verified Certifications, Hackathons Under Pressure, and Achievements */}
      <CertificatesSection />

      {/* 6. Hire Me & Contact Section */}
      <ContactSection />

      {/* 7. Footer with Back-to-Top Indicator */}
      <Footer />
    </div>
  );
}
