'use client';

import { motion, useSpring, useTransform, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface CounterProps {
  value: number;
  suffix?: string;
}

export default function Counter({ value, suffix = '' }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  
  const springValue = useSpring(0, {
    damping: 30,
    stiffness: 100,
    duration: 2
  });
  
  const displayValue = useTransform(springValue, (current) => Math.round(current));

  useEffect(() => {
    if (inView) {
      springValue.set(value);
    }
  }, [inView, value, springValue]);

  useEffect(() => {
    return displayValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = latest + suffix;
      }
    });
  }, [displayValue, suffix]);

  return <span ref={ref} className="stat-number">0{suffix}</span>;
}
