"use client";

import { useState, useEffect } from 'react';

const desktopPaths = [
  // 1: Top (Starts above N/I, curves left then right)
  { d: "M 400 260 C 360 200, 460 140, 420 80", cx: 420, cy: 80 },
  // 2: Right (Starts right of T, goes right/down then up/right)
  { d: "M 480 280 C 580 320, 600 150, 720 180", cx: 720, cy: 180 },
  // 3: Bottom Right (Starts below S/T, curves right then down/right)
  { d: "M 460 330 C 550 360, 520 480, 650 520", cx: 650, cy: 520 },
  // 4: Bottom Left (Starts below U/N, curves right then left/down)
  { d: "M 340 330 C 430 380, 250 460, 220 520", cx: 220, cy: 520 },
  // 5: Left (Starts left of U, curves left/down then up/left)
  { d: "M 320 280 C 240 320, 200 150, 120 220", cx: 120, cy: 220 },
];

const mobilePaths = [
  // Tighter horizontal bounds for mobile (X between 260 and 540)
  { d: "M 400 260 C 370 200, 440 140, 420 80", cx: 420, cy: 80 }, // Top
  { d: "M 450 270 C 500 300, 510 160, 530 180", cx: 530, cy: 180 }, // Right
  { d: "M 440 330 C 500 360, 480 480, 520 520", cx: 520, cy: 520 }, // Bottom Right
  { d: "M 360 330 C 420 380, 320 460, 300 520", cx: 300, cy: 520 }, // Bottom Left
  { d: "M 350 280 C 290 320, 290 160, 270 220", cx: 270, cy: 220 }, // Left
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
        <g stroke="#c89666" strokeWidth="2" strokeDasharray="8 6" fill="none" opacity="0.15">
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
            stroke="#e1b382" 
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
            fill="#d4a574" 
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
      style={{ backgroundColor: '#2d545e' }}
    >
      {/* CSS Animations moved to globals.css to prevent hydration mismatch */}

      {/* Subtle radial glow */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          background: 'radial-gradient(circle at center, #e1b382 0%, transparent 60%)'
        }}
      />

      {/* SVG container */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
        {renderPaths(desktopPaths, false)}
        {renderPaths(mobilePaths, true)}
      </svg>
      
      {/* Center Text */}
      <h1 className="relative z-10 font-cinzel text-5xl md:text-7xl font-bold drop-shadow-[0_0_15px_rgba(225,179,130,0.4)] animate-textPop" style={{ color: '#e1b382' }}>
        UNINEST
      </h1>
      
      {/* Subtitle */}
      <p className="absolute mt-28 text-sm tracking-[0.3em] uppercase animate-subtitleFade font-semibold" style={{ color: '#c89666' }}>
        Find Your Nest
      </p>
    </div>
  );
}
