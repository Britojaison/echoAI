'use client';

import React, { useEffect, useState, useRef } from 'react';

interface Bar {
  id: number;
  baseHeight: number;
}

export function VoicePulseBackground() {
  const [bars, setBars] = useState<Bar[]>([]);
  const [scrollSpeed, setScrollSpeed] = useState(0);
  const [isOverFooter, setIsOverFooter] = useState(false);
  const lastScrollY = useRef(0);
  const lastScrollTime = useRef(Date.now());

  // Generate random bars on mount
  useEffect(() => {
    // Reduce bars on mobile for better performance
    const isMobile = window.innerWidth < 768;
    const barCount = isMobile ? 20 : 50; // Fewer bars on mobile
    const generatedBars: Bar[] = [];
    
    for (let i = 0; i < barCount; i++) {
      generatedBars.push({
        id: i,
        baseHeight: 100 + Math.random() * 200, // Random height between 100px and 300px
      });
    }
    
    setBars(generatedBars);
  }, []);

  // Track scroll speed and footer overlap
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

      // Check if voice pulse is overlapping with footer or customization section
      const footer = document.querySelector('footer');
      const customizationSection = document.querySelector('#customization');
      
      let isOverlapping = false;
      
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const voicePulseY = viewportHeight / 2; // Voice pulse is at 50vh
        
        // Check if voice pulse center is within footer bounds
        isOverlapping = voicePulseY >= footerRect.top && voicePulseY <= footerRect.bottom;
      }
      
      if (customizationSection && !isOverlapping) {
        const customizationRect = customizationSection.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const voicePulseY = viewportHeight / 2;
        
        // Check if voice pulse center is within customization section bounds
        isOverlapping = voicePulseY >= customizationRect.top && voicePulseY <= customizationRect.bottom;
      }
      
      setIsOverFooter(isOverlapping);

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
        className="fixed flex items-center justify-between px-4 sm:px-6 md:px-8 pointer-events-none"
        style={{
          top: '50vh',
          left: '0',
          right: '0',
          transform: 'translateY(-50%)',
          zIndex: 5,
          filter: isOverFooter ? 'blur(4px) brightness(0.3)' : 'blur(1px) brightness(0.6)',
          transition: 'filter 0.3s ease-out',
        }}
      >
        {bars.map((bar) => {
          // Calculate dynamic height based on scroll speed (5-30% increase)
          const heightIncrease = 1 + (0.05 + scrollSpeed * 0.25);
          const dynamicHeight = bar.baseHeight * heightIncrease;
          
          // Make bars very dull and muted
          const glowIntensity = isOverFooter ? 0.05 : 0.15;
          const shadowIntensity = isOverFooter ? 0.02 : 0.08;
          
          return (
            <div
              key={bar.id}
              style={{
                width: '4px',
                height: `${dynamicHeight}px`,
                background: 'linear-gradient(180deg, rgba(96, 165, 250, 0.2) 0%, rgba(96, 165, 250, 0.4) 50%, rgba(96, 165, 250, 0.2) 100%)',
                borderRadius: '999px',
                boxShadow: `0 0 10px rgba(96, 165, 250, ${glowIntensity}), 0 0 20px rgba(96, 165, 250, ${shadowIntensity})`,
                transition: `all ${scrollSpeed > 0 ? '100ms' : '300ms'} ease-out`,
              }}
            />
          );
        })}
      </div>
    </>
  );
}
