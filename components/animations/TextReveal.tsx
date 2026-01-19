'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const TextReveal = ({ children, className = "", delay = 0 }: TextRevealProps) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    gsap.fromTo(
      el,
      {
        y: 100,
        opacity: 0,
        rotateX: -45,
        clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
      },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        duration: 1.2,
        delay: delay,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, [delay]);

  return (
    <div ref={elementRef} className={`perspective-1000 ${className}`}>
      {children}
    </div>
  );
};

export default TextReveal;
