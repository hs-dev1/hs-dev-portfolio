'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollFadeProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale';
  delay?: number;
  className?: string;
}

export default function ScrollFade({
  children,
  direction = 'up',
  delay = 0,
  className = '',
}: ScrollFadeProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;

    let fromVars: gsap.TweenVars = { opacity: 0 };
    
    switch (direction) {
      case 'up':
        fromVars.y = 40;
        break;
      case 'down':
        fromVars.y = -40;
        break;
      case 'left':
        fromVars.x = 40;
        break;
      case 'right':
        fromVars.x = -40;
        break;
      case 'scale':
        fromVars.scale = 0.9;
        break;
    }

    gsap.fromTo(
      element,
      fromVars,
      {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        duration: 0.8,
        delay,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          once: true,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [direction, delay]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}
