import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { heroGlassFragments } from '../data/portfolioData';
import { playShatterSound, playHoverSound } from '../utils/audio';
import { ChevronDown, Sparkles, Terminal, Cpu } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function HeroVideoSection({ isReducedMotion = false }) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const triggerRef = useRef(null);
  const shardsContainerRef = useRef(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [hasShattered, setHasShattered] = useState(false);

  const targetTimeRef = useRef(0);
  const currentTimeRef = useRef(0);
  const animFrameRef = useRef(null);

  // Setup GSAP ScrollTrigger for pinned video scrubbing
  useEffect(() => {
    const video = videoRef.current;
    const triggerEl = triggerRef.current;
    if (!triggerEl) return;

    // Smooth scrub animation frame loop
    const renderLoop = () => {
      if (video && video.duration && !video.seeking) {
        const diff = targetTimeRef.current - currentTimeRef.current;
        if (Math.abs(diff) > 0.02) {
          currentTimeRef.current += diff * 0.18;
          try {
            video.currentTime = currentTimeRef.current;
          } catch (e) {
            // Seek tolerance
          }
        }
      }
      animFrameRef.current = requestAnimationFrame(renderLoop);
    };

    animFrameRef.current = requestAnimationFrame(renderLoop);

    const st = ScrollTrigger.create({
      trigger: triggerEl,
      start: 'top top',
      end: '+=250%',
      pin: true,
      scrub: 0.6,
      anticipatePin: 1,
      onUpdate: (self) => {
        const p = self.progress;
        setScrollProgress(p);

        if (video && video.duration) {
          targetTimeRef.current = p * video.duration;
        }

        // Trigger glass break sound & state when past shatter point (~40% scroll)
        if (p >= 0.42 && !hasShattered) {
          setHasShattered(true);
          playShatterSound();
        } else if (p < 0.35 && hasShattered) {
          setHasShattered(false);
        }
      }
    });

    return () => {
      st.kill();
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [hasShattered, videoLoaded]);

  const handleVideoLoaded = () => {
    setVideoLoaded(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0.01; // show opening frame immediately
    }
  };

  const handleVideoError = () => {
    setVideoError(true);
  };

  const scrollToNext = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollBy({ top: window.innerHeight * 1.5, behavior: 'smooth' });
    }
  };

  const shatterOpacity = Math.min(1, Math.max(0, (scrollProgress - 0.35) * 3));

  return (
    <div ref={triggerRef} className="relative w-full h-screen bg-[#07080b] overflow-hidden select-none">
      {/* 1. BACKGROUND VIDEO LAYER */}
      <div className="absolute inset-0 w-full h-full">
        {!videoError ? (
          <video
            ref={videoRef}
            src="/videos/hero-glass.mp4"
            playsInline
            muted
            preload="auto"
            onLoadedMetadata={handleVideoLoaded}
            onError={handleVideoError}
            className="w-full h-full object-cover object-center filter brightness-95 contrast-105"
          />
        ) : (
          /* High-aesthetic procedural fallback if video file isn't decoded */
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#07080b] via-[#0d131f] to-[#07080b]">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 mx-auto rounded-2xl border border-cyan-500/40 bg-cyan-500/10 flex items-center justify-center animate-pulse">
                <Cpu className="w-10 h-10 text-cyan-400" />
              </div>
              <p className="text-sm font-mono text-cyan-300">Google Flow Sequence Ready</p>
            </div>
          </div>
        )}

        {/* Ambient Vignette & Electric Glow Overlays */}
        <div className="absolute inset-0 bg-radial from-transparent via-[#07080b]/40 to-[#07080b]/90 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#07080b] to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#07080b]/80 to-transparent pointer-events-none" />
      </div>

      {/* 2. INITIAL HERO IDENTITY OVERLAY (Fades gracefully as scroll starts) */}
      <div 
        className="absolute inset-0 z-10 flex flex-col items-center justify-between px-6 py-16 pointer-events-none transition-opacity duration-300"
        style={{ opacity: Math.max(0, 1 - scrollProgress * 3) }}
      >
        {/* Top Tag */}
        <div className="pt-10 flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/70 border border-cyan-500/30 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-xs font-mono tracking-widest text-cyan-300 uppercase">
            AI/ML Developer &bull; Creative Technologist
          </span>
        </div>

        {/* Center Headline */}
        <div className="text-center max-w-4xl space-y-5">
          <div className="inline-block relative">
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-white drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)]">
              DHIVESH <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">M</span>
            </h1>
            <div className="absolute -inset-1 blur-xl bg-cyan-500/15 -z-10" />
          </div>

          <p className="text-lg sm:text-2xl text-slate-200 font-light max-w-2xl mx-auto leading-relaxed drop-shadow-md">
            "Turning Ideas Into <span className="text-cyan-300 font-medium">Intelligent Real-World</span> Experiences."
          </p>

          <div className="flex items-center justify-center gap-3 pt-2 text-xs sm:text-sm font-mono text-slate-400">
            <span>Pollachi, Tamil Nadu</span>
            <span className="text-cyan-500">&bull;</span>
            <span>Rathinam College (AIML '28)</span>
          </div>
        </div>

        {/* Scroll Prompt Indicator */}
        <button
          onClick={scrollToNext}
          className="pointer-events-auto flex flex-col items-center gap-2 text-slate-400 hover:text-cyan-300 transition-colors group cursor-pointer"
        >
          <span className="text-xs font-mono uppercase tracking-widest group-hover:text-cyan-300">
            Scroll to Shatter Glass &amp; Explore Skills
          </span>
          <div className="w-6 h-10 rounded-full border border-slate-600/80 flex items-start justify-center p-1 group-hover:border-cyan-400/80 transition-colors">
            <div className="w-1.5 h-2.5 bg-cyan-400 rounded-full animate-bounce" />
          </div>
          <ChevronDown className="w-4 h-4 animate-pulse text-cyan-400" />
        </button>
      </div>

      {/* 3. POST-SHATTER FLOATING GLASS FRAGMENTS WITH REAL HTML SKILL BADGES */}
      <div
        ref={shardsContainerRef}
        className="absolute inset-0 z-20 pointer-events-none transition-opacity duration-500"
        style={{
          opacity: shatterOpacity,
          visibility: shatterOpacity > 0.05 ? 'visible' : 'hidden'
        }}
      >
        {/* Center Shatter Banner */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none max-w-md px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-[11px] font-mono text-cyan-300 mb-3 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
            <span>CORE CAPABILITIES UNLOCKED</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
            SKILLS ON THE <span className="text-cyan-400">FRAGMENTS</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-mono mt-1 drop-shadow">
            Interactive shards drifting from the shattered glass
          </p>
        </div>

        {/* Floating Glass Fragment Badges */}
        {heroGlassFragments.map((frag, idx) => {
          // Dynamic parallax drift based on scrollProgress
          const driftY = (scrollProgress - 0.42) * (idx % 2 === 0 ? 80 : -70);
          const driftX = (scrollProgress - 0.42) * ((idx % 3) - 1) * 50;

          return (
            <div
              key={frag.id}
              onMouseEnter={playHoverSound}
              className="absolute pointer-events-auto group cursor-pointer transition-transform duration-300"
              style={{
                top: frag.top,
                left: frag.left,
                transform: `translate(${driftX}px, ${driftY}px) rotate(${frag.rotate})`,
              }}
            >
              {/* Glass Shard Container */}
              <div className="relative px-5 py-3 rounded-2xl glass-shard group-hover:scale-110 group-hover:border-cyan-300 group-hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] transition-all duration-300">
                {/* Polygonal faceted highlight */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 via-transparent to-cyan-500/10 pointer-events-none" />
                
                {/* Fragment Content */}
                <div className="relative z-10 flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 group-hover:scale-125 transition-transform" />
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-cyan-300/80 group-hover:text-cyan-200">
                      {frag.category}
                    </div>
                    <div className="text-sm sm:text-base font-bold text-white tracking-wide group-hover:text-cyan-300">
                      {frag.label}
                    </div>
                  </div>
                </div>

                {/* Corner Shard Sparkle */}
                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-cyan-300 rounded-full blur-[1px] opacity-75 group-hover:opacity-100 group-hover:scale-150 transition-all" />
              </div>
            </div>
          );
        })}

        {/* Bottom Transition Guide */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center pointer-events-auto">
          <button
            onClick={scrollToNext}
            className="px-5 py-2 rounded-full bg-slate-900/80 border border-cyan-500/40 hover:border-cyan-400 text-xs font-mono text-cyan-300 hover:text-white backdrop-blur-md shadow-lg shadow-cyan-500/20 flex items-center gap-2 group transition-all"
          >
            <span>Enter Portfolio Experience</span>
            <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* 4. REAL-TIME SCROLL SYNCHRONIZATION PROGRESS BAR */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-800/60 z-30">
        <div
          className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 shadow-[0_0_12px_rgba(0,240,255,0.8)] transition-all duration-75"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>
    </div>
  );
}
