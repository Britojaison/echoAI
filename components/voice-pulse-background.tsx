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
    const barCount = 60; // Number of bars
    const generatedBars: Bar[] = [];
    
    for (let i = 0; i < barCount; i++) {
      generatedBars.push({
        id: i,
        baseHeight: Math.random() * 60 + 20, // Random height between 20% and 80%
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
      <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/90 to-background/95" />
      
      {/* Voice pulse bars */}
      <div className="flex items-center justify-center gap-1 sm:gap-1.5 md:gap-2 px-4">
        {bars.map((bar) => {
          // Calculate dynamic height based on scroll speed
          const heightIncrease = 5 + (scrollSpeed * 25); // 5% to 30% increase
          const dynamicHeight = bar.baseHeight + (bar.baseHeight * heightIncrease / 100);
          
          return (
            <div
              key={bar.id}
              className="bg-gradient-to-t from-primary/20 via-primary/30 to-primary/20 rounded-full transition-all"
              style={{
                width: '4px',
                height: `${dynamicHeight}%`,
                transitionDuration: scrollSpeed > 0 ? '100ms' : '300ms',
                transitionTimingFunction: 'ease-out',
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

