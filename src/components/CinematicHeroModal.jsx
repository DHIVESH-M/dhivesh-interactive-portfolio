import React, { useState, useEffect, useRef } from 'react';
import { playHoverSound, playShatterSound } from '../utils/audio';

export default function CinematicHeroModal({ isOpen, onClose }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    // Auto play on open
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
      playShatterSound();
    }

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const togglePlay = () => {
    playHoverSound();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    playHoverSound();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const total = videoRef.current.duration || 1;
    setProgress((current / total) * 100);
  };

  const handleScrub = (e) => {
    if (!videoRef.current) return;
    const newProgress = parseFloat(e.target.value);
    const newTime = (newProgress / 100) * (videoRef.current.duration || 1);
    videoRef.current.currentTime = newTime;
    setProgress(newProgress);
  };

  return (
    <div className="fixed inset-0 z-[2000] bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center p-4 sm:p-8 animate-in fade-in duration-300">
      {/* Top Header Bar */}
      <div className="w-full max-w-5xl flex items-center justify-between pb-4 border-b border-white/10 text-white">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_#00f0ff]" />
          <div>
            <h3 className="text-base sm:text-lg font-bold font-mono tracking-tight text-white">
              CINEMATIC GLASS-SHATTER EXPERIENCE
            </h3>
            <span className="text-xs font-mono text-cyan-300">
              Approved Google Flow 3D Character Production
            </span>
          </div>
        </div>

        <button
          onClick={() => {
            playHoverSound();
            onClose();
          }}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
        >
          <i className="fa-solid fa-xmark text-lg" />
        </button>
      </div>

      {/* Center Video Frame */}
      <div className="relative w-full max-w-5xl aspect-video my-auto rounded-3xl overflow-hidden bg-black border border-white/20 shadow-2xl shadow-cyan-950/40">
        <video
          ref={videoRef}
          src="/videos/hero-glass.mp4"
          playsInline
          autoPlay
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
          className="w-full h-full object-contain"
        />

        {/* Ambient Glass Vignette */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-black/30" />
      </div>

      {/* Bottom Controls Bar */}
      <div className="w-full max-w-5xl p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl flex flex-col gap-3">
        {/* Scrub Bar */}
        <input
          type="range"
          min="0"
          max="100"
          step="0.1"
          value={progress}
          onChange={handleScrub}
          className="w-full h-1.5 rounded-full appearance-none bg-white/15 cursor-pointer accent-cyan-400"
        />

        <div className="flex items-center justify-between text-xs font-mono text-slate-300">
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer"
            >
              <i className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'}`} />
            </button>

            <button
              onClick={toggleMute}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer"
            >
              <i className={`fa-solid ${isMuted ? 'fa-volume-xmark' : 'fa-volume-high'}`} />
            </button>

            <span className="text-[11px] text-cyan-300 hidden sm:inline">
              Character shoots glass screen &bull; High-definition Google Flow render
            </span>
          </div>

          <button
            onClick={() => {
              playHoverSound();
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs cursor-pointer"
          >
            Return to Portfolio &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
