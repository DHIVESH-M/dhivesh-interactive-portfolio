import React, { useEffect, useRef } from 'react';

export default function CyberGlowCursor({ isReducedMotion = false }) {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mouseRef = useRef({ x: -100, y: -100, targetX: -100, targetY: -100, active: false });

  useEffect(() => {
    if (isReducedMotion) return;

    // Detect touch device
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    let animId;
    const updateCursor = () => {
      const m = mouseRef.current;
      m.x += (m.targetX - m.x) * 0.15;
      m.y += (m.targetY - m.y) * 0.15;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${m.x}px, ${m.y}px, 0)`;
        ringRef.current.style.opacity = m.active ? '1' : '0';
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${m.targetX}px, ${m.targetY}px, 0)`;
        dotRef.current.style.opacity = m.active ? '0.7' : '0';
      }

      animId = requestAnimationFrame(updateCursor);
    };

    animId = requestAnimationFrame(updateCursor);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, [isReducedMotion]);

  if (isReducedMotion) return null;

  return (
    <>
      {/* Outer ambient glow halo */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="fixed top-0 left-0 w-80 h-80 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[999] opacity-0 transition-opacity duration-300 will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(0, 245, 255, 0.08) 0%, rgba(168, 85, 247, 0.04) 40%, transparent 70%)'
        }}
      />
      {/* Subtle core accent dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none z-[1000] opacity-0 transition-opacity duration-200 will-change-transform bg-cyan-400/80 shadow-[0_0_12px_#00f5ff]"
      />
    </>
  );
}
