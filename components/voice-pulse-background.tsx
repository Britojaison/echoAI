'use client';

import React, { useEffect, useState, useRef } from 'react';

interface Bar {
  id: number;
  baseHeight: number;
}

export function VoicePulseBackground() {
  const [bars, setBars] = useState<Bar[]>([]);
  const [scrollSpeed, setScrollSpeed] = useState(0);
  const lastScrollY = useRef(0);
  const lastScrollTime = useRef(Date.now());

  // Generate random bars on mount
  useEffect(() => {
    const barCount = 50; // Number of bars
    const generatedBars: Bar[] = [];
    
    for (let i = 0; i < barCount; i++) {
      generatedBars.push({
        id: i,
        baseHeight: Math.random() * 50 + 30, // Random height between 30% and 80%
      });
    }
    
    setBars(generatedBars);
  }, []);

  // Track scroll speed
  useEffect(() => {
    let rafId: number;
    let timeoutId: NodeJS.Timeout;

    const handleScroll = () => {
      const currentTime = Date.now();
      const currentScrollY = window.scrollY;
      const timeDiff = currentTime - lastScrollTime.current;
      const scrollDiff = Math.abs(currentScrollY - lastScrollY.current);

      if (timeDiff > 0) {
        // Calculate speed (pixels per millisecond, then normalize)
        const speed = Math.min((scrollDiff / timeDiff) * 10, 1);
        setScrollSpeed(speed);
      }

      lastScrollY.current = currentScrollY;
      lastScrollTime.current = currentTime;

      // Clear previous timeout
      clearTimeout(timeoutId);

      // Reset scroll speed after 150ms of no scrolling
      timeoutId = setTimeout(() => {
        setScrollSpeed(0);
      }, 150);
    };

    const throttledScroll = () => {
      rafId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', throttledScroll);
      cancelAnimationFrame(rafId);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden">
      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/75 via-background/60 to-background/75" />
      
      {/* Voice pulse bars */}
      <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-5 px-4">
        {bars.map((bar) => {
          // Calculate dynamic height based on scroll speed
          const heightIncrease = 5 + (scrollSpeed * 25); // 5% to 30% increase
          const dynamicHeight = bar.baseHeight + (bar.baseHeight * heightIncrease / 100);
          
          return (
            <div
              key={bar.id}
              className="relative"
              style={{
                width: '8px',
                height: `${dynamicHeight}%`,
                maxHeight: '60vh',
                background: 'linear-gradient(to top, hsl(217 91% 60% / 0.5), hsl(217 91% 60% / 0.8), hsl(217 91% 60% / 0.5))',
                borderRadius: '999px',
                boxShadow: '0 0 20px hsl(217 91% 60% / 0.3), 0 0 40px hsl(217 91% 60% / 0.2)',
                transition: `all ${scrollSpeed > 0 ? '100ms' : '300ms'} ease-out`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

