import React, { useState } from 'react';
import Navbar from './components/Navbar';
import DogBoneCursor from './components/DogBoneCursor';
import HeroVideoSection from './components/HeroVideoSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import LearningJourneySection from './components/LearningJourneySection';
import ResumeSection from './components/ResumeSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function App() {
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#07080b] text-slate-100 overflow-x-hidden">
      {/* 1. Custom Dog Bone Cursor & Puppy Companion */}
      <DogBoneCursor isReducedMotion={isReducedMotion} />

      {/* 2. Top Navigation Bar */}
      <Navbar 
        isReducedMotion={isReducedMotion} 
        setIsReducedMotion={setIsReducedMotion} 
      />

      {/* 3. Hero Section with Scroll-Controlled Google Flow Video & Glass Fragment Skills */}
      <section id="hero">
        <HeroVideoSection isReducedMotion={isReducedMotion} />
      </section>

      {/* 4. About Me Section */}
      <AboutSection />

      {/* 5. Technical Skills & Learning Areas */}
      <SkillsSection />

      {/* 6. Featured Real-Time Projects (IDEAS THAT BECOME REAL PROJECTS) */}
      <ProjectsSection />

      {/* 7. Personal Learning Journey & Official Certifications */}
      <LearningJourneySection />

      {/* 8. Official Resume Preview & Download */}
      <ResumeSection />

      {/* 9. Hire Me & Contact Section */}
      <ContactSection />

      {/* 10. Footer with Scroll-to-Top Indicator */}
      <Footer />
    </div>
  );
}
