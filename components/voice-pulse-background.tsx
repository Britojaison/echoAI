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
        baseHeight: 100 + Math.random() * 200, // Random height between 100px and 300px
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
    <>
      {/* Voice pulse bars - fixed in viewport center, visible across entire page */}
      <div 
        className="fixed flex items-center justify-between px-8 pointer-events-none"
        style={{
          top: '50vh',
          left: '0',
          right: '0',
          transform: 'translateY(-50%)',
          zIndex: 5,
        }}
      >
        {bars.map((bar) => {
          // Calculate dynamic height based on scroll speed (5-30% increase)
          const heightIncrease = 1 + (0.05 + scrollSpeed * 0.25);
          const dynamicHeight = bar.baseHeight * heightIncrease;
          
          return (
            <div
              key={bar.id}
              style={{
                width: '8px',
                height: `${dynamicHeight}px`,
                background: 'linear-gradient(180deg, rgba(96, 165, 250, 0.4) 0%, rgba(96, 165, 250, 0.9) 50%, rgba(96, 165, 250, 0.4) 100%)',
                borderRadius: '999px',
                boxShadow: '0 0 20px rgba(96, 165, 250, 0.5), 0 0 40px rgba(96, 165, 250, 0.3)',
                transition: `all ${scrollSpeed > 0 ? '100ms' : '300ms'} ease-out`,
              }}
            />
          );
        })}
      </div>
    </>
  );
}
