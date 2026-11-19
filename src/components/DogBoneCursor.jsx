import React, { useEffect, useRef, useState } from 'react';
import { playJumpSound } from '../utils/audio';

export default function DogBoneCursor({ isReducedMotion = false }) {
  const [enabled, setEnabled] = useState(true);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [dogState, setDogState] = useState('idle'); // 'idle' | 'walk' | 'run' | 'jump'
  const [facingRight, setFacingRight] = useState(true);
  const [jumpCount, setJumpCount] = useState(0);

  // References for animation loop
  const cursorRef = useRef(null);
  const dogRef = useRef(null);
  const particlesRef = useRef([]);

  // Coordinates
  const targetPos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: 100, y: 100 });
  const prevTargetPos = useRef({ x: -100, y: -100 });
  const velocity = useRef(0);
  const idleTimer = useRef(null);
  const isJumping = useRef(false);
  const jumpHeight = useRef(0);
  const jumpVel = useRef(0);

  // Detect touch device
  useEffect(() => {
    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    setIsTouchDevice(isTouch);
  }, []);

  // Mouse movement & click listeners
  useEffect(() => {
    if (isTouchDevice || !enabled) return;

    const handleMouseMove = (e) => {
      targetPos.current = { x: e.clientX, y: e.clientY };

      // Update custom cursor immediately
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Calculate instantaneous mouse speed
      const dx = e.clientX - prevTargetPos.current.x;
      const dy = e.clientY - prevTargetPos.current.y;
      const dist = Math.hypot(dx, dy);
      velocity.current = dist;
      prevTargetPos.current = { x: e.clientX, y: e.clientY };

      clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => {
        velocity.current = 0;
      }, 150);
    };

    const handleMouseDown = () => {
      triggerJump();
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      clearTimeout(idleTimer.current);
    };
  }, [isTouchDevice, enabled]);

  const triggerJump = () => {
    if (isJumping.current) return;
    isJumping.current = true;
    jumpVel.current = -14;
    setDogState('jump');
    playJumpSound();
    setJumpCount((prev) => prev + 1);

    // Spawn sparkle particles
    const x = currentPos.current.x;
    const y = currentPos.current.y - 20;
    for (let i = 0; i < 5; i++) {
      particlesRef.current.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 6,
        vy: -Math.random() * 6 - 3,
        alpha: 1,
        life: 0,
        id: Math.random()
      });
    }
  };

  // Animation frame loop for dog physics & spring follow
  useEffect(() => {
    if (isTouchDevice || !enabled || isReducedMotion) return;

    let animId;
    let lastTime = performance.now();

    const updatePhysics = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      // Desired target is slightly behind/offset from the cursor bone
      const offsetX = facingRight ? -65 : 65;
      const offsetY = 35;
      const tx = Math.max(40, Math.min(window.innerWidth - 60, targetPos.current.x + offsetX));
      const ty = Math.max(40, Math.min(window.innerHeight - 60, targetPos.current.y + offsetY));

      // Spring / lerp towards target
      const lerpFactor = 0.08;
      const dx = tx - currentPos.current.x;
      const dy = ty - currentPos.current.y;
      const distToBone = Math.hypot(dx, dy);

      currentPos.current.x += dx * lerpFactor;
      currentPos.current.y += dy * lerpFactor;

      // Determine orientation (face the bone)
      if (targetPos.current.x > currentPos.current.x + 10) {
        setFacingRight(true);
      } else if (targetPos.current.x < currentPos.current.x - 10) {
        setFacingRight(false);
      }

      // Jump physics
      if (isJumping.current) {
        jumpHeight.current += jumpVel.current;
        jumpVel.current += 0.8; // gravity
        if (jumpHeight.current >= 0) {
          jumpHeight.current = 0;
          jumpVel.current = 0;
          isJumping.current = false;
        }
      }

      // Determine animation state
      if (!isJumping.current) {
        if (distToBone < 12 && velocity.current < 2) {
          setDogState('idle');
        } else if (distToBone > 120 || velocity.current > 18) {
          setDogState('run');
        } else {
          setDogState('walk');
        }
      }

      // Render dog element
      if (dogRef.current) {
        const jumpY = jumpHeight.current;
        const scaleX = facingRight ? 1 : -1;
        dogRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y + jumpY}px, 0) scaleX(${scaleX})`;
      }

      animId = requestAnimationFrame(updatePhysics);
    };

    animId = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(animId);
  }, [isTouchDevice, enabled, isReducedMotion, facingRight]);

  // Touch alternative: bottom-right interactive companion widget
  if (isTouchDevice) {
    return (
      <div 
        onClick={triggerJump}
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 px-3 py-2 rounded-full bg-slate-900/90 border border-cyan-500/40 backdrop-blur-md shadow-lg shadow-cyan-500/20 active:scale-95 transition-transform"
      >
        <div className="w-10 h-10 relative">
          <PuppySVG state={dogState} isJumping={isJumping.current} />
        </div>
        <span className="text-xs font-mono text-cyan-300">Tap Buddy! 🐾</span>
      </div>
    );
  }

  if (!enabled || isReducedMotion) return null;

  return (
    <>
      {/* 1. DOG BONE CURSOR (Replaces default desktop cursor) */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 will-change-transform"
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      >
        <div className="relative group">
          {/* Cyan Glow Pulse */}
          <div className="absolute inset-0 w-8 h-8 -left-1 -top-1 bg-cyan-400/30 rounded-full blur-md animate-pulse" />
          
          {/* Animated 3D Dog Bone SVG */}
          <svg
            className="w-8 h-8 drop-shadow-[0_0_8px_rgba(0,240,255,0.7)] transition-transform duration-100"
            viewBox="0 0 64 64"
            fill="none"
          >
            {/* Left Top Knob */}
            <circle cx="16" cy="24" r="8" fill="#F8FAFC" stroke="#00F0FF" strokeWidth="1.5" />
            {/* Left Bottom Knob */}
            <circle cx="16" cy="40" r="8" fill="#F8FAFC" stroke="#00F0FF" strokeWidth="1.5" />
            {/* Right Top Knob */}
            <circle cx="48" cy="24" r="8" fill="#F8FAFC" stroke="#00F0FF" strokeWidth="1.5" />
            {/* Right Bottom Knob */}
            <circle cx="48" cy="40" r="8" fill="#F8FAFC" stroke="#00F0FF" strokeWidth="1.5" />
            {/* Center Bridge */}
            <rect x="16" y="26" width="32" height="12" rx="4" fill="#F8FAFC" stroke="#00F0FF" strokeWidth="1.5" />
            {/* Shading Highlights */}
            <path d="M 20 29 Q 32 31 44 29" stroke="#E2E8F0" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="14" cy="22" r="2.5" fill="#FFFFFF" />
            <circle cx="46" cy="22" r="2.5" fill="#FFFFFF" />
          </svg>
        </div>
      </div>

      {/* 2. CUTE 3D PUPPY CHARACTER ("Pixel") */}
      <div
        ref={dogRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 will-change-transform select-none"
        style={{ transform: 'translate3d(100px, 100px, 0)' }}
      >
        <div className="relative w-20 h-20">
          {/* Ground Contact Shadow */}
          <div 
            className="absolute bottom-1 left-3 w-14 h-3 bg-cyan-500/15 rounded-full blur-[3px] transition-all duration-150"
            style={{
              transform: isJumping.current ? 'scale(0.6)' : 'scale(1)',
              opacity: isJumping.current ? 0.3 : 0.8
            }}
          />

          {/* Puppy SVG Model */}
          <PuppySVG state={dogState} isJumping={isJumping.current} />

          {/* Thought / Interaction Bubble on Idle */}
          {dogState === 'idle' && (
            <div className="absolute -top-4 right-1 px-1.5 py-0.5 rounded-full bg-slate-900/90 border border-cyan-400/40 text-[9px] font-mono text-cyan-300 shadow-sm animate-bounce">
              🦴?
            </div>
          )}

          {/* Joy indicator on Jump */}
          {dogState === 'jump' && (
            <div className="absolute -top-6 left-4 text-xs font-bold text-cyan-300 drop-shadow-[0_0_6px_rgba(0,240,255,0.8)] animate-ping">
              ✨ Arf!
            </div>
          )}
        </div>
      </div>

      {/* 3. Companion Control Pill (Discreet toggle in bottom corner) */}
      <button
        onClick={() => setEnabled(!enabled)}
        aria-label="Toggle Companion Puppy"
        title="Toggle interactive puppy companion"
        className="fixed bottom-4 left-4 z-40 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/80 border border-slate-700/60 text-[11px] font-mono text-slate-400 hover:text-cyan-300 hover:border-cyan-500/40 backdrop-blur-sm transition-all"
      >
        <span>🐕</span>
        <span>Puppy Companion: {enabled ? 'ON' : 'OFF'}</span>
      </button>
    </>
  );
}

// Full vector puppy with articulated parts, animated ears, legs, eyes, and wagging tail
function PuppySVG({ state, isJumping }) {
  const isRunning = state === 'run';
  const isWalking = state === 'walk';
  const isIdle = state === 'idle';

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
      <defs>
        <radialGradient id="pupBodyGrad" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FDBA74" />
          <stop offset="70%" stopColor="#EA580C" />
          <stop offset="100%" stopColor="#C2410C" />
        </radialGradient>
        <radialGradient id="pupHeadGrad" cx="45%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#FED7AA" />
          <stop offset="75%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#C2410C" />
        </radialGradient>
        <linearGradient id="collarGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#00F0FF" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
      </defs>

      {/* WAGGING TAIL */}
      <g 
        className="origin-[25px_60px]"
        style={{
          animation: isRunning
            ? 'tailWagFast 0.15s ease-in-out infinite alternate'
            : isWalking
            ? 'tailWagMid 0.35s ease-in-out infinite alternate'
            : 'tailWagSlow 0.9s ease-in-out infinite alternate'
        }}
      >
        <path
          d="M 25 60 Q 12 50 10 38 Q 16 38 22 54 Z"
          fill="url(#pupBodyGrad)"
          stroke="#9A3412"
          strokeWidth="1"
        />
        <circle cx="11" cy="38" r="4" fill="#FEF08A" />
      </g>

      {/* BACK LEGS */}
      {/* Back Left Leg */}
      <g 
        className="origin-[35px_68px]"
        style={{
          animation: isRunning
            ? 'legRunBack 0.22s ease-in-out infinite alternate'
            : isWalking
            ? 'legWalkBack 0.45s ease-in-out infinite alternate'
            : 'none'
        }}
      >
        <ellipse cx="32" cy="74" rx="6" ry="10" fill="#EA580C" stroke="#9A3412" strokeWidth="0.8" />
        <ellipse cx="30" cy="82" rx="7" ry="4" fill="#FED7AA" />
      </g>

      {/* PUPPY BODY */}
      <g>
        {/* Main Torso */}
        <ellipse cx="48" cy="62" rx="20" ry="15" fill="url(#pupBodyGrad)" stroke="#9A3412" strokeWidth="1" />
        {/* Chest highlights / tummy patch */}
        <ellipse cx="56" cy="65" rx="11" ry="9" fill="#FFF7ED" opacity="0.85" />
      </g>

      {/* FRONT LEGS */}
      {/* Front Left Leg */}
      <g 
        className="origin-[58px_68px]"
        style={{
          animation: isRunning
            ? 'legRunFront 0.22s ease-in-out infinite alternate'
            : isWalking
            ? 'legWalkFront 0.45s ease-in-out infinite alternate'
            : 'none'
        }}
      >
        <rect x="54" y="65" width="8" height="18" rx="4" fill="url(#pupBodyGrad)" stroke="#9A3412" strokeWidth="0.8" />
        <ellipse cx="58" cy="83" rx="6" ry="3.5" fill="#FED7AA" />
      </g>

      {/* Front Right Leg (Offset) */}
      <g 
        className="origin-[64px_68px]"
        style={{
          animation: isRunning
            ? 'legRunBack 0.22s ease-in-out infinite alternate'
            : isWalking
            ? 'legWalkBack 0.45s ease-in-out infinite alternate'
            : 'none'
        }}
      >
        <rect x="62" y="66" width="7" height="17" rx="3.5" fill="#EA580C" stroke="#9A3412" strokeWidth="0.8" />
        <ellipse cx="65" cy="83" rx="5.5" ry="3.5" fill="#FED7AA" />
      </g>

      {/* GLOWING COLLAR & TAG */}
      <path d="M 52 48 Q 62 52 70 48" stroke="url(#collarGrad)" strokeWidth="4" strokeLinecap="round" />
      <circle cx="62" cy="53" r="3" fill="#00F0FF" className="animate-pulse" />
      <text x="60.5" y="55" fontSize="4" fontWeight="bold" fill="#07080B">D</text>

      {/* PUPPY HEAD GROUP */}
      <g 
        className="origin-[64px_42px]"
        style={{
          animation: isRunning
            ? 'headBobRun 0.22s ease-in-out infinite alternate'
            : isWalking
            ? 'headBobWalk 0.45s ease-in-out infinite alternate'
            : 'headBreathe 2.4s ease-in-out infinite alternate'
        }}
      >
        {/* FLOPPY LEFT EAR (Back) */}
        <g 
          className="origin-[58px_25px]"
          style={{
            animation: isRunning ? 'earFlapFast 0.18s infinite alternate' : 'earFlapSlow 1.2s infinite alternate'
          }}
        >
          <path d="M 58 25 C 46 20 44 42 54 44 Z" fill="#C2410C" stroke="#7C2D12" strokeWidth="1" />
        </g>

        {/* HEAD BASE */}
        <circle cx="68" cy="38" r="16" fill="url(#pupHeadGrad)" stroke="#9A3412" strokeWidth="1" />

        {/* MUZZLE & CHEEKS */}
        <ellipse cx="76" cy="42" rx="9" ry="7" fill="#FFF7ED" />
        {/* Little Cute Nose */}
        <path d="M 78 39 C 81 39 82 41 80 43 C 78 44 76 44 75 42 C 75 40 76 39 78 39 Z" fill="#1E293B" />
        {/* Mouth */}
        <path d="M 76 43 Q 78 46 81 44" stroke="#7C2D12" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        {/* Little Pink Tongue peek when running / happy */}
        {(isRunning || isJumping) && (
          <path d="M 78 44 Q 80 48 83 45 Z" fill="#FB7185" />
        )}

        {/* BIG EXPRESSIVE EYES */}
        {/* Eye Outline & Pupil */}
        <ellipse cx="70" cy="34" rx="4.5" ry="5.5" fill="#1E1B4B" />
        {/* Catchlights */}
        <circle cx="71.5" cy="32.5" r="1.8" fill="#FFFFFF" />
        <circle cx="68.5" cy="35" r="0.9" fill="#FFFFFF" />
        {/* Cute Eyebrow */}
        <path d="M 66 27 Q 71 25 74 27" stroke="#9A3412" strokeWidth="1.5" fill="none" strokeLinecap="round" />

        {/* FLOPPY RIGHT EAR (Front) */}
        <g 
          className="origin-[64px_24px]"
          style={{
            animation: isRunning
              ? 'earFlapFast 0.18s ease-in-out infinite alternate'
              : 'earFlapFront 1.4s ease-in-out infinite alternate'
          }}
        >
          <path d="M 64 24 C 52 24 50 48 62 48 C 68 48 68 32 64 24 Z" fill="url(#pupBodyGrad)" stroke="#9A3412" strokeWidth="1" />
          <path d="M 60 28 C 55 30 55 42 61 43" stroke="#FED7AA" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </g>
      </g>

      <style>{`
        @keyframes tailWagFast { 0% { transform: rotate(-25deg); } 100% { transform: rotate(35deg); } }
        @keyframes tailWagMid { 0% { transform: rotate(-12deg); } 100% { transform: rotate(20deg); } }
        @keyframes tailWagSlow { 0% { transform: rotate(-5deg); } 100% { transform: rotate(10deg); } }
        @keyframes legWalkFront { 0% { transform: rotate(-22deg); } 100% { transform: rotate(22deg); } }
        @keyframes legWalkBack { 0% { transform: rotate(22deg); } 100% { transform: rotate(-22deg); } }
        @keyframes legRunFront { 0% { transform: rotate(-40deg); } 100% { transform: rotate(40deg); } }
        @keyframes legRunBack { 0% { transform: rotate(40deg); } 100% { transform: rotate(-40deg); } }
        @keyframes headBobRun { 0% { transform: translateY(0); } 100% { transform: translateY(-4px); } }
        @keyframes headBobWalk { 0% { transform: translateY(0); } 100% { transform: translateY(-2px); } }
        @keyframes headBreathe { 0% { transform: scale(1); } 100% { transform: scale(1.02); } }
        @keyframes earFlapFast { 0% { transform: rotate(-15deg); } 100% { transform: rotate(25deg); } }
        @keyframes earFlapSlow { 0% { transform: rotate(-4deg); } 100% { transform: rotate(8deg); } }
        @keyframes earFlapFront { 0% { transform: rotate(-5deg); } 100% { transform: rotate(12deg); } }
      `}</style>
    </svg>
  );
}
