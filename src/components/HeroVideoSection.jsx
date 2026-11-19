import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { heroGlassFragments } from '../data/portfolioData';
import { playShatterSound, playHoverSound } from '../utils/audio';
import Hero3DCanvas from './3d/Hero3DCanvas';
import { 
  ChevronDown, 
  Play, 
  Pause, 
  RotateCcw, 
  Sliders, 
  Zap 
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function HeroVideoSection() {
  const triggerRef = useRef(null);
  const videoRef = useRef(null);
  const videoWrapperRef = useRef(null);
  const reticleRef = useRef(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasShattered, setHasShattered] = useState(false);
  const [cursorTarget, setCursorTarget] = useState({ active: false, x: 0, y: 0 });

  const isSeekingRef = useRef(false);
  const pendingTimeRef = useRef(null);
  const targetTimeRef = useRef(0);

  // Mouse tracking state for 2.5D face and head movement
  const mousePosRef = useRef({ targetRotY: 0, targetRotX: 0, targetTransX: 0, targetTransY: 0, rawX: -100, rawY: -100 });
  const currentTrackRef = useRef({ rotY: 0, rotX: 0, transX: 0, transY: 0 });

  // Interactive face & head tracking animation loop
  useEffect(() => {
    let animId;
    const handleMouseMove = (e) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
      const ny = (e.clientY / window.innerHeight - 0.5) * 2; // -1 to 1

      mousePosRef.current = {
        targetRotY: nx * 14,      // Head turns horizontally towards cursor
        targetRotX: -ny * 10,     // Head tilts vertically towards cursor
        targetTransX: nx * 24,    // 3D parallax displacement
        targetTransY: ny * 18,
        rawX: e.clientX,
        rawY: e.clientY
      };

      setCursorTarget({ active: true, x: e.clientX, y: e.clientY });
    };

    const handleMouseLeave = () => {
      mousePosRef.current = { targetRotY: 0, targetRotX: 0, targetTransX: 0, targetTransY: 0, rawX: -100, rawY: -100 };
      setCursorTarget({ active: false, x: 0, y: 0 });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    const trackLoop = () => {
      const target = mousePosRef.current;
      const cur = currentTrackRef.current;

      // Smooth lerp damping for natural head weight physics
      cur.rotY += (target.targetRotY - cur.rotY) * 0.08;
      cur.rotX += (target.targetRotX - cur.rotX) * 0.08;
      cur.transX += (target.targetTransX - cur.transX) * 0.08;
      cur.transY += (target.targetTransY - cur.transY) * 0.08;

      if (videoWrapperRef.current) {
        videoWrapperRef.current.style.transform = `scale(1.08) perspective(1200px) rotateY(${cur.rotY.toFixed(2)}deg) rotateX(${cur.rotX.toFixed(2)}deg) translate3d(${cur.transX.toFixed(1)}px, ${cur.transY.toFixed(1)}px, 0)`;
      }

      if (reticleRef.current && target.rawX > 0) {
        reticleRef.current.style.transform = `translate3d(${target.rawX}px, ${target.rawY}px, 0)`;
      }

      animId = requestAnimationFrame(trackLoop);
    };

    animId = requestAnimationFrame(trackLoop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Safe seek handler that queues seek requests without aborting browser media decoders
  const safeSeek = (time) => {
    const video = videoRef.current;
    if (!video || !video.duration || isNaN(video.duration)) return;
    const clamped = Math.max(0, Math.min(video.duration, time));

    if (isSeekingRef.current) {
      pendingTimeRef.current = clamped;
      return;
    }

    isSeekingRef.current = true;
    try {
      if ('fastSeek' in video) {
        video.fastSeek(clamped);
      } else {
        video.currentTime = clamped;
      }
    } catch {
      isSeekingRef.current = false;
    }
  };

  // Video metadata and seeked event listener setup
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const onLoadedMetadata = () => {
      safeSeek(0.01); // show opening frame immediately
    };

    const onSeeked = () => {
      isSeekingRef.current = false;
      if (pendingTimeRef.current !== null) {
        const nextTime = pendingTimeRef.current;
        pendingTimeRef.current = null;
        safeSeek(nextTime);
      }
    };

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    video.addEventListener('loadedmetadata', onLoadedMetadata);
    video.addEventListener('seeked', onSeeked);
    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);

    // If metadata already loaded
    if (video.readyState >= 1) {
      onLoadedMetadata();
    }

    return () => {
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
      video.removeEventListener('seeked', onSeeked);
      video.removeEventListener('play', onPlay);
      video.removeEventListener('pause', onPause);
    };
  }, []);

  // GSAP ScrollTrigger for pinned video scrub
  useEffect(() => {
    const triggerEl = triggerRef.current;
    const video = videoRef.current;
    if (!triggerEl) return;

    const st = ScrollTrigger.create({
      trigger: triggerEl,
      start: 'top top',
      end: '+=250%',
      pin: true,
      scrub: 0.5,
      anticipatePin: 1,
      onUpdate: (self) => {
        const p = self.progress;
        setScrollProgress(p);

        // If not manually playing, sync video frames with scroll
        if (video && video.duration && !video.paused) {
          // user is playing video manually
        } else if (video && video.duration) {
          const t = p * video.duration;
          targetTimeRef.current = t;
          safeSeek(t);
        }

        // Sound & Shatter Trigger
        if (p >= 0.40 && !hasShattered) {
          setHasShattered(true);
          playShatterSound();
        } else if (p < 0.35 && hasShattered) {
          setHasShattered(false);
        }
      }
    });

    return () => {
      st.kill();
    };
  }, [hasShattered]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    playHoverSound();
    if (video.paused) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  };

  const handleManualSlider = (e) => {
    const val = parseFloat(e.target.value);
    setScrollProgress(val);
    const video = videoRef.current;
    if (video && video.duration) {
      safeSeek(val * video.duration);
    }
  };

  const restartVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    playHoverSound();
    safeSeek(0.01);
    setScrollProgress(0);
    setHasShattered(false);
  };

  const scrollToNext = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const shatterOpacity = Math.min(1, Math.max(0, (scrollProgress - 0.38) * 3.5));

  return (
    <div ref={triggerRef} className="relative w-full h-screen bg-[#07080b] overflow-hidden select-none">
      {/* 1. BACKGROUND VIDEO LAYER WITH 3D FACE & HEAD TRACKING */}
      <div className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center">
        <div
          ref={videoWrapperRef}
          className="w-full h-full will-change-transform transition-[transform] duration-75 ease-out"
          style={{ transformOrigin: 'center center' }}
        >
          <video
            ref={videoRef}
            src="/videos/hero-glass.mp4"
            playsInline
            muted
            autoPlay={false}
            preload="auto"
            className="w-full h-full object-cover object-center filter brightness-95 contrast-105"
          />
        </div>

        {/* Ambient Darkening & Radial Vignette */}
        <div className="absolute inset-0 bg-radial from-transparent via-[#07080b]/35 to-[#07080b]/90 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#07080b] to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#07080b]/80 to-transparent pointer-events-none" />
      </div>

      {/* Subtle Neural Gaze Target Indicator */}
      <div
        ref={reticleRef}
        className="fixed top-0 left-0 pointer-events-none z-30 -translate-x-1/2 -translate-y-1/2 will-change-transform transition-opacity duration-300"
        style={{
          opacity: cursorTarget.active && scrollProgress < 0.4 ? 0.85 : 0,
          transform: 'translate3d(-100px, -100px, 0)'
        }}
      >
        <div className="relative w-12 h-12 flex items-center justify-center">
          {/* Outer Rotating Reticle */}
          <div className="absolute inset-0 rounded-full border border-cyan-400/40 border-dashed animate-spin" style={{ animationDuration: '6s' }} />
          {/* Inner Lock Ring */}
          <div className="w-5 h-5 rounded-full border border-cyan-400/80 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          </div>
          {/* Corner Lock Markers */}
          <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-cyan-400" />
          <div className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-cyan-400" />
          <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b border-l border-cyan-400" />
          <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-cyan-400" />
          {/* Text Tag */}
          <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[8px] font-mono text-cyan-300 uppercase tracking-widest whitespace-nowrap bg-[#07080b]/80 px-1 rounded">
            GAZE LOCK
          </span>
        </div>
      </div>

      {/* 2. THREE.JS 3D GLASS SHARDS & PARTICLE EXPLOSION */}
      <Hero3DCanvas scrollProgress={scrollProgress} hasShattered={hasShattered} />

      {/* 3. INITIAL HERO IDENTITY OVERLAY (Fades as user scrolls down) */}
      <div 
        className="absolute inset-0 z-10 flex flex-col items-center justify-between px-6 py-14 pointer-events-none transition-opacity duration-300"
        style={{ opacity: Math.max(0, 1 - scrollProgress * 3) }}
      >
        {/* Top Identity Tag */}
        <div className="pt-8 flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/30 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-xs font-mono tracking-widest text-cyan-300 uppercase">
            AI/ML Developer &bull; Creative Technologist
          </span>
        </div>

        {/* Center Title & Tagline */}
        <div className="text-center max-w-4xl space-y-4">
          <div className="inline-block relative">
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-white drop-shadow-[0_12px_40px_rgba(0,0,0,0.95)]">
              DHIVESH <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">M</span>
            </h1>
            <div className="absolute -inset-1 blur-2xl bg-cyan-500/20 -z-10" />
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

        {/* Scroll Instruction */}
        <button
          onClick={scrollToNext}
          className="pointer-events-auto flex flex-col items-center gap-2 text-slate-400 hover:text-cyan-300 transition-colors group cursor-pointer"
        >
          <span className="text-xs font-mono uppercase tracking-widest group-hover:text-cyan-300">
            Scroll to Shatter Glass &amp; Reveal 3D Skills
          </span>
          <div className="w-6 h-10 rounded-full border border-slate-600/80 flex items-start justify-center p-1 group-hover:border-cyan-400/80 transition-colors">
            <div className="w-1.5 h-2.5 bg-cyan-400 rounded-full animate-bounce" />
          </div>
          <ChevronDown className="w-4 h-4 animate-pulse text-cyan-400" />
        </button>
      </div>

      {/* 4. POST-SHATTER FLOATING GLASS SHARDS WITH REAL HTML SKILL BADGES */}
      <div
        className="absolute inset-0 z-20 pointer-events-none transition-opacity duration-500"
        style={{
          opacity: shatterOpacity,
          visibility: shatterOpacity > 0.05 ? 'visible' : 'hidden'
        }}
      >
        {/* Center Banner */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none max-w-md px-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/85 border border-cyan-400/40 text-[11px] font-mono text-cyan-300 mb-3 backdrop-blur-md">
            <Zap className="w-3.5 h-3.5 text-cyan-300 animate-pulse" />
            <span>3D GLASS SHATTERED &bull; CAPABILITIES UNLOCKED</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
            SKILLS ON THE <span className="text-cyan-400">FRAGMENTS</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-mono mt-1 drop-shadow">
            Interactive Three.js shards drifting through 3D space
          </p>
        </div>

        {/* Floating HTML Fragment Overlays */}
        {heroGlassFragments.map((frag, idx) => {
          const driftY = (scrollProgress - 0.40) * (idx % 2 === 0 ? 90 : -80);
          const driftX = (scrollProgress - 0.40) * ((idx % 3) - 1) * 60;

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
              <div className="relative px-5 py-3 rounded-2xl glass-shard group-hover:scale-110 group-hover:border-cyan-300 group-hover:shadow-[0_0_35px_rgba(0,240,255,0.7)] transition-all duration-300">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 via-transparent to-cyan-500/10 pointer-events-none" />
                
                <div className="relative z-10 flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 group-hover:scale-125 shadow-[0_0_8px_rgba(0,240,255,0.8)] transition-transform" />
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-cyan-300/80 group-hover:text-cyan-200">
                      {frag.category}
                    </div>
                    <div className="text-sm sm:text-base font-bold text-white tracking-wide group-hover:text-cyan-300">
                      {frag.label}
                    </div>
                  </div>
                </div>

                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-cyan-300 rounded-full blur-[1px] opacity-75 group-hover:opacity-100 group-hover:scale-150 transition-all" />
              </div>
            </div>
          );
        })}

        {/* Bottom Transition Pill */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center pointer-events-auto">
          <button
            onClick={scrollToNext}
            className="px-6 py-2.5 rounded-full bg-slate-900/90 border border-cyan-500/50 hover:border-cyan-400 text-xs font-mono text-cyan-300 hover:text-white backdrop-blur-md shadow-xl shadow-cyan-500/25 flex items-center gap-2 group transition-all"
          >
            <span>Explore Full Technical Portfolio</span>
            <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* 5. INTERACTIVE CINEMATIC VIDEO & SCRUB CONTROLLER */}
      <div className="absolute bottom-4 left-6 z-30 pointer-events-auto flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-slate-950/85 border border-cyan-500/30 backdrop-blur-xl shadow-lg shadow-black/60">
          <button
            onClick={togglePlay}
            title={isPlaying ? "Pause Video" : "Play Full Cinematic"}
            className="p-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 transition-colors"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={restartVideo}
            title="Restart Video Frame"
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Interactive Frame Scrub Slider */}
          <div className="flex items-center gap-2 px-1">
            <Sliders className="w-3 h-3 text-cyan-400" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.005"
              value={scrollProgress}
              onChange={handleManualSlider}
              className="w-24 sm:w-32 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              title="Drag to manually scrub video frames"
            />
            <span className="text-[10px] font-mono text-slate-400 w-8">
              {Math.round(scrollProgress * 100)}%
            </span>
          </div>
        </div>
      </div>

      {/* 6. BOTTOM SCROLL TRACK PROGRESS BAR */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-800/60 z-30 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 shadow-[0_0_15px_rgba(0,240,255,0.9)] transition-all duration-75"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>
    </div>
  );
}
