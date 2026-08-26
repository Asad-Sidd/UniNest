"use client";

import { useState, useEffect } from 'react';

const paths = [
  { d: "M 400 300 Q 320 200 150 120", cx: 150, cy: 120 },
  { d: "M 400 300 Q 520 180 650 100", cx: 650, cy: 100 },
  { d: "M 400 300 Q 300 400 120 480", cx: 120, cy: 480 },
  { d: "M 400 300 Q 550 380 680 450", cx: 680, cy: 450 },
  { d: "M 400 300 Q 560 250 720 300", cx: 720, cy: 300 },
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
        
        {/* SVG Masks for drawing dashed lines */}
        <defs>
          {paths.map((p, i) => (
            <mask id={`mask-line-${i}`} key={`mask-${i}`}>
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
            <path key={`bg-path-${i}`} d={p.d} />
          ))}
        </g>
        
        {/* Animated map route lines */}
        {paths.map((p, i) => (
          <path 
            key={`fg-path-${i}`}
            d={p.d}
            fill="none" 
            stroke="#e1b382" 
            strokeWidth="2" 
            strokeDasharray="8 6"
            mask={`url(#mask-line-${i})`}
          />
        ))}

        {/* Animated endpoint markers */}
        {paths.map((p, i) => (
          <circle 
            key={`marker-${i}`}
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

      </svg>
      
      {/* Center Text */}
      <h1 className="relative z-10 font-cinzel text-5xl md:text-7xl font-bold drop-shadow-[0_0_15px_rgba(225,179,130,0.4)] animate-textPop" style={{ color: '#e1b382' }}>
        UniNest
      </h1>
      
      {/* Subtitle */}
      <p className="absolute mt-28 text-sm tracking-[0.3em] uppercase animate-subtitleFade font-semibold" style={{ color: '#c89666' }}>
        Find Your Nest
      </p>
    </div>
  );
}
