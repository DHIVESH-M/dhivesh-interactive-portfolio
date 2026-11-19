import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { heroGlassFragments } from '../data/portfolioData';
import { playShatterSound, playHoverSound } from '../utils/audio';
import Hero3DCanvas from './3d/Hero3DCanvas';
import { 
  ChevronDown, 
  Zap 
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Prevent mobile address bar height collapse from recalculating pinned layout
ScrollTrigger.config({
  ignoreMobileResize: true
});

export default function HeroVideoSection() {
  const triggerRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const videoWrapperRef = useRef(null);
  const reticleRef = useRef(null);
  const hasShatteredRef = useRef(false);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [hasShattered, setHasShattered] = useState(false);
  const [cursorTarget, setCursorTarget] = useState({ active: false, x: 0, y: 0 });

  const isSeekingRef = useRef(false);
  const pendingTimeRef = useRef(null);
  const targetTimeRef = useRef(0);

  // Mouse tracking state for 2.5D face and head movement (Desktop only)
  const mousePosRef = useRef({ targetRotY: 0, targetRotX: 0, targetTransX: 0, targetTransY: 0, rawX: -100, rawY: -100 });
  const currentTrackRef = useRef({ rotY: 0, rotX: 0, transX: 0, transY: 0 });

  // Double-buffer paint video frame to canvas to eliminate black frame seeking flicker
  const drawFrameToCanvas = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || video.readyState < 2) return;

    if (canvas.width !== video.videoWidth && video.videoWidth > 0) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
    }

    const ctx = canvas.getContext('2d');
    if (ctx && canvas.width > 0 && canvas.height > 0) {
      try {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      } catch {
        // Video may be detached during hot-reload
      }
    }
  }, []);

  // Interactive face & head tracking animation loop (Desktop only)
  useEffect(() => {
    const isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches && window.innerWidth >= 1024;
    if (!isDesktop) {
      if (videoWrapperRef.current) {
        videoWrapperRef.current.style.transform = 'none';
      }
      return;
    }

    let animId;
    const handleMouseMove = (e) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
      const ny = (e.clientY / window.innerHeight - 0.5) * 2; // -1 to 1

      mousePosRef.current = {
        targetRotY: nx * 12,      // Head turns horizontally towards cursor
        targetRotX: -ny * 8,      // Head tilts vertically towards cursor
        targetTransX: nx * 18,    // 3D parallax displacement
        targetTransY: ny * 14,
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
        videoWrapperRef.current.style.transform = `scale(1.05) perspective(1200px) rotateY(${cur.rotY.toFixed(2)}deg) rotateX(${cur.rotX.toFixed(2)}deg) translate3d(${cur.transX.toFixed(1)}px, ${cur.transY.toFixed(1)}px, 0)`;
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
  const safeSeek = useCallback((time) => {
    const video = videoRef.current;
    if (!video || !video.duration || isNaN(video.duration)) return;
    const clamped = Math.max(0, Math.min(video.duration, time));

    targetTimeRef.current = clamped;

    if (isSeekingRef.current) {
      pendingTimeRef.current = clamped;
      return;
    }

    // Skip redundant microscopic seeks to protect mobile decoders from stalling
    if (Math.abs(video.currentTime - clamped) < 0.035) return;

    isSeekingRef.current = true;
    try {
      video.currentTime = clamped;
    } catch {
      isSeekingRef.current = false;
    }
  }, []);

  // Video metadata and frame-ready listener setup
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const onLoadedMetadata = () => {
      drawFrameToCanvas();
      safeSeek(0.01); // show opening frame immediately
    };

    const onSeeked = () => {
      isSeekingRef.current = false;
      drawFrameToCanvas();

      if (pendingTimeRef.current !== null) {
        const nextTime = pendingTimeRef.current;
        pendingTimeRef.current = null;
        if (Math.abs(video.currentTime - nextTime) >= 0.035) {
          safeSeek(nextTime);
        }
      }
    };

    const onTimeUpdate = () => {
      drawFrameToCanvas();
    };

    video.addEventListener('loadedmetadata', onLoadedMetadata);
    video.addEventListener('seeked', onSeeked);
    video.addEventListener('timeupdate', onTimeUpdate);
    video.addEventListener('loadeddata', drawFrameToCanvas);
    video.addEventListener('canplay', drawFrameToCanvas);

    // Continuous frame callback if supported by browser for ultra-responsive canvas mirroring
    let vfcId = null;
    if ('requestVideoFrameCallback' in HTMLVideoElement.prototype) {
      const vfcLoop = () => {
        drawFrameToCanvas();
        vfcId = video.requestVideoFrameCallback(vfcLoop);
      };
      vfcId = video.requestVideoFrameCallback(vfcLoop);
    }

    // If metadata already loaded
    if (video.readyState >= 1) {
      onLoadedMetadata();
    }

    return () => {
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
      video.removeEventListener('seeked', onSeeked);
      video.removeEventListener('timeupdate', onTimeUpdate);
      video.removeEventListener('loadeddata', drawFrameToCanvas);
      video.removeEventListener('canplay', drawFrameToCanvas);
      if (vfcId !== null && 'cancelVideoFrameCallback' in HTMLVideoElement.prototype) {
        video.cancelVideoFrameCallback(vfcId);
      }
    };
  }, [drawFrameToCanvas, safeSeek]);

  // GSAP ScrollTrigger for pinned video scrub
  useEffect(() => {
    const triggerEl = triggerRef.current;
    const video = videoRef.current;
    if (!triggerEl) return;

    const isMobile = window.innerWidth < 768;

    const st = ScrollTrigger.create({
      trigger: triggerEl,
      start: 'top top',
      end: isMobile ? '+=280%' : '+=400%',
      pin: true,
      scrub: isMobile ? 0.8 : 1.1,
      anticipatePin: 1,
      onUpdate: (self) => {
        const p = self.progress;
        setScrollProgress(p);

        // Sync video frames with scroll
        if (video && video.duration) {
          if (!video.paused) video.pause();
          const t = p * video.duration;
          targetTimeRef.current = t;
          safeSeek(t);
        }

        // Keep this ScrollTrigger alive while React updates the shatter overlay
        if (p >= 0.40 && !hasShatteredRef.current) {
          hasShatteredRef.current = true;
          setHasShattered(true);
          playShatterSound();
        } else if (p < 0.35 && hasShatteredRef.current) {
          hasShatteredRef.current = false;
          setHasShattered(false);
        }
      }
    });

    return () => {
      st.kill();
    };
  }, [safeSeek]);

  const scrollToShatter = () => {
    const trigger = triggerRef.current;
    if (!trigger) return;
    const start = trigger.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: start + window.innerHeight * 3 * 0.58, behavior: 'smooth' });
  };

  const scrollToAbout = () => {
    const about = document.getElementById('about');
    if (about) about.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const shatterOpacity = Math.min(1, Math.max(0, (scrollProgress - 0.38) * 3.5));

  return (
    <div ref={triggerRef} id="home" className="relative w-full h-screen min-h-[100dvh] bg-[#07080b] overflow-hidden select-none">
      {/* 1. BACKGROUND VIDEO LAYER WITH DOUBLE-BUFFERED CANVAS */}
      <div className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center">
        <div
          ref={videoWrapperRef}
          className="relative w-full h-full will-change-transform"
          style={{ transformOrigin: 'center center' }}
        >
          {/* Anti-Flicker Canvas Frame Buffer: Maintains the exact previous decoded frame during seeks */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none z-0"
          />

          {/* Master Video Element */}
          <video
            ref={videoRef}
            src="/videos/hero-glass.mp4"
            playsInline
            webkit-playsinline="true"
            x5-playsinline="true"
            muted
            autoPlay={false}
            preload="auto"
            disablePictureInPicture
            disableRemotePlayback
            className="relative z-1 w-full h-full object-cover object-center hero-video-element opacity-90"
            style={{ backgroundColor: 'transparent' }}
          />
        </div>

        {/* Ambient Darkening & Radial Vignette */}
        <div className="absolute inset-0 bg-radial from-transparent via-[#07080b]/35 to-[#07080b]/90 pointer-events-none z-2" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#07080b] to-transparent pointer-events-none z-2" />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#07080b]/80 to-transparent pointer-events-none z-2" />
      </div>

      {/* Subtle Neural Gaze Target Indicator (Desktop Only) */}
      <div
        ref={reticleRef}
        className="fixed top-0 left-0 pointer-events-none z-30 -translate-x-1/2 -translate-y-1/2 will-change-transform transition-opacity duration-300 hidden lg:flex"
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
        className="absolute inset-0 z-10 flex flex-col items-center justify-between px-4 sm:px-6 py-6 sm:py-14 pointer-events-none transition-opacity duration-300"
        style={{ opacity: Math.max(0, 1 - scrollProgress * 3) }}
      >
        {/* Top Identity Tag */}
        <div className="pt-4 sm:pt-8 flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-slate-900/85 border border-cyan-500/30 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-[11px] sm:text-xs font-mono tracking-wider sm:tracking-widest text-cyan-300 uppercase">
            AI/ML Developer &bull; Creative Technologist
          </span>
        </div>

        {/* Center Title & Tagline */}
        <div className="text-center max-w-4xl space-y-3 sm:space-y-4 px-2">
          <div className="inline-block relative">
            <h1 className="text-4xl sm:text-7xl md:text-8xl font-black font-heading tracking-tight text-white drop-shadow-[0_12px_40px_rgba(0,0,0,0.95)]">
              DHIVESH <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f5ff] via-[#38bdf8] to-[#a855f7]">M</span>
            </h1>
            <div className="absolute -inset-1 blur-2xl bg-cyan-500/25 -z-10" />
          </div>

          <p className="text-sm sm:text-xl md:text-2xl text-slate-200 font-light max-w-2xl mx-auto leading-relaxed drop-shadow-md">
            "Turning Ideas Into <span className="text-[#00f5ff] font-medium text-glow-cyan">Intelligent Real-World</span> Experiences."
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-1 text-[11px] sm:text-sm font-mono text-slate-300">
            <span>Pollachi, Tamil Nadu</span>
            <span className="text-[#00f5ff]">&bull;</span>
            <span>Rathinam University (AIML '28)</span>
          </div>
        </div>

        {/* Scroll Instruction */}
        <button
          onClick={scrollToShatter}
          className="pointer-events-auto flex flex-col items-center gap-1.5 sm:gap-2 text-slate-400 hover:text-[#00f5ff] transition-colors group cursor-pointer pb-2 sm:pb-0"
        >
          <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider sm:tracking-widest group-hover:text-[#00f5ff] text-center px-4">
            Scroll to Shatter Glass &amp; Reveal Skills
          </span>
          <div className="w-5 sm:w-6 h-8 sm:h-10 rounded-full border border-slate-600/80 flex items-start justify-center p-1 group-hover:border-cyan-400/80 transition-colors">
            <div className="w-1.5 h-2 sm:h-2.5 bg-[#00f5ff] rounded-full animate-bounce shadow-[0_0_8px_#00f5ff]" />
          </div>
          <ChevronDown className="w-4 h-4 animate-pulse text-[#00f5ff]" />
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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none w-full max-w-md px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/85 border border-cyan-400/40 text-[10px] sm:text-[11px] font-mono text-[#00f5ff] mb-2 sm:mb-3 backdrop-blur-md">
            <Zap className="w-3.5 h-3.5 text-[#00f5ff] animate-pulse" />
            <span>3D GLASS SHATTERED &bull; CAPABILITIES UNLOCKED</span>
          </div>
          <h2 className="text-2xl sm:text-5xl font-black font-heading text-white tracking-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
            SKILLS ON THE <span className="grad-text">FRAGMENTS</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-mono mt-1 drop-shadow">
            Interactive Three.js shards drifting through 3D space
          </p>

          {/* Dedicated Mobile Glass Skills Grid (Fits perfectly on phones without overflowing or covering text) */}
          <div className="mt-4 grid grid-cols-2 gap-2 md:hidden pointer-events-auto max-w-xs mx-auto">
            {heroGlassFragments.slice(0, 6).map((frag) => (
              <div
                key={frag.id}
                onClick={playHoverSound}
                className="px-2.5 py-1.5 rounded-xl glass-shard flex items-center gap-2 text-left"
              >
                <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0 shadow-[0_0_6px_#00f5ff]" />
                <div className="min-w-0">
                  <div className="text-[9px] font-mono text-cyan-300/80 truncate">{frag.category}</div>
                  <div className="text-xs font-bold text-white truncate">{frag.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Scattered Floating Glass Fragment Badges */}
        <div className="hidden md:block">
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
        </div>

        {/* Bottom Transition Pill */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 text-center pointer-events-auto w-[90%] sm:w-auto">
          <button
            onClick={scrollToAbout}
            className="w-full sm:w-auto px-5 sm:px-6 py-2.5 rounded-full bg-slate-900/90 border border-cyan-500/50 hover:border-cyan-400 text-xs font-mono text-cyan-300 hover:text-white backdrop-blur-md shadow-xl shadow-cyan-500/25 flex items-center justify-center gap-2 group transition-all cursor-pointer"
          >
            <span>Explore Technical Portfolio</span>
            <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </button>
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
