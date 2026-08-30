"use client";

import { useState, useEffect } from 'react';

const desktopPaths = [
  // Desktop Center: 400, 300 (viewBox 800x600)
  { d: "M 400 260 C 350 150, 480 100, 420 40", cx: 420, cy: 40 }, // Top
  { d: "M 480 280 C 600 320, 650 150, 760 180", cx: 760, cy: 180 }, // Right
  { d: "M 460 330 C 580 360, 520 500, 680 550", cx: 680, cy: 550 }, // Bottom Right
  { d: "M 340 330 C 220 380, 280 500, 120 550", cx: 120, cy: 550 }, // Bottom Left
  { d: "M 320 280 C 200 320, 150 150, 40 220", cx: 40, cy: 220 }, // Left
];

const mobilePaths = [
  // Mobile Center: 300, 400 (viewBox 600x800)
  { d: "M 300 360 C 250 200, 380 150, 320 60", cx: 320, cy: 60 }, // Top
  { d: "M 380 380 C 480 420, 520 250, 560 280", cx: 560, cy: 280 }, // Right
  { d: "M 360 430 C 450 460, 420 650, 540 720", cx: 540, cy: 720 }, // Bottom Right
  { d: "M 240 430 C 150 480, 180 650, 60 720", cx: 60, cy: 720 }, // Bottom Left
  { d: "M 220 380 C 120 420, 80 250, 40 320", cx: 40, cy: 320 }, // Left
];

export default function SplashScreen() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Removed reduced motion check temporarily so you can force it to play

    // Start fade out at 3.2s
    const fadeTimer = setTimeout(() => setFadeOut(true), 3200);
    // Unmount at 3.8s
    const hideTimer = setTimeout(() => setVisible(false), 3800);
    
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  // Helper to render paths
  const renderPaths = (paths: typeof desktopPaths, isMobile: boolean) => {
    const prefix = isMobile ? 'mobile' : 'desktop';
    return (
      <g className={isMobile ? 'block md:hidden' : 'hidden md:block'}>
        {/* SVG Masks for drawing dashed lines */}
        <defs>
          {paths.map((p, i) => (
            <mask id={`mask-line-${prefix}-${i}`} key={`mask-${prefix}-${i}`}>
              <path 
                d={p.d}
                fill="none" 
                stroke="white" 
                strokeWidth="4" 
                style={{
                  strokeDasharray: 1000,
                  strokeDashoffset: 1000,
                  animation: `drawLine 1.2s ease-out ${0.6 + (i * 0.3)}s forwards`,
                  willChange: 'stroke-dashoffset'
                }}
              />
            </mask>
          ))}
        </defs>

        {/* Faint solid background line for depth */}
        <g stroke="#C2CAD0" strokeWidth="2" strokeDasharray="8 6" fill="none" opacity="0.3">
          {paths.map((p, i) => (
            <path key={`bg-path-${prefix}-${i}`} d={p.d} />
          ))}
        </g>
        
        {/* Animated map route lines */}
        {paths.map((p, i) => (
          <path 
            key={`fg-path-${prefix}-${i}`}
            d={p.d}
            fill="none" 
            stroke="#E7717D" 
            strokeWidth="2" 
            strokeDasharray="8 6"
            mask={`url(#mask-line-${prefix}-${i})`}
          />
        ))}

        {/* Animated endpoint markers */}
        {paths.map((p, i) => (
          <circle 
            key={`marker-${prefix}-${i}`}
            cx={p.cx} 
            cy={p.cy} 
            r="4" 
            fill="#E7717D" 
            style={{ 
              opacity: 0, 
              transformOrigin: `${p.cx}px ${p.cy}px`, 
              animation: `markerPop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${1.8 + (i * 0.3)}s forwards`, 
              willChange: 'opacity, transform' 
            }} 
          />
        ))}
      </g>
    );
  };

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-all duration-700 ease-in-out pointer-events-none ${fadeOut ? 'opacity-0 scale-[0.95]' : 'opacity-100 scale-100'}`}
      style={{ backgroundColor: '#FAF9F7' }}
    >
      {/* CSS Animations moved to globals.css to prevent hydration mismatch */}

      {/* Subtle radial glow */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          background: 'radial-gradient(circle at center, #E7717D 0%, transparent 60%)'
        }}
      />

      {/* Desktop SVG container */}
      <svg className="hidden md:block absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid meet">
        {renderPaths(desktopPaths, false)}
      </svg>
      
      {/* Mobile SVG container */}
      <svg className="block md:hidden absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 600 800" preserveAspectRatio="xMidYMid meet">
        {renderPaths(mobilePaths, true)}
      </svg>
      
      {/* Center Text */}
      <h1 className="relative z-10 font-heading text-5xl md:text-7xl font-extrabold tracking-tight animate-textPop" style={{ color: '#3D352E' }}>
        Uni<span style={{ color: '#E7717D' }}>Nest</span>
      </h1>
      
      {/* Subtitle */}
      <p className="absolute mt-28 text-sm tracking-[0.3em] uppercase animate-subtitleFade font-semibold" style={{ color: '#7E685A' }}>
        Find Your Nest
      </p>
    </div>
  );
}
