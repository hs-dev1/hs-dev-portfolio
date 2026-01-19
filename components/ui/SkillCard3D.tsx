'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

interface SkillCard3DProps {
  name: string;
  proficiency: number;
  yearsOfExperience?: number;
  index: number;
}

export default function SkillCard3D({
  name,
  proficiency,
  yearsOfExperience,
  index,
}: SkillCard3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['15deg', '-15deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-15deg', '15deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isVisible) return;
    const duration = 2000;
    const steps = 60;
    const increment = proficiency / steps;
    const stepDuration = duration / steps;
    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      setCount(Math.min(Math.round(currentStep * increment), proficiency));
      if (currentStep >= steps) clearInterval(timer);
    }, stepDuration);
    return () => clearInterval(timer);
  }, [isVisible, proficiency]);

  const radius = 60; // Increased radius for better visual fill
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (count / 100) * circumference;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      onViewportEnter={() => setIsVisible(true)}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="relative group w-full aspect-[4/5] perspective-1000"
    >
      <div 
        style={{ transform: 'translateZ(50px)' }}
        className="absolute inset-0 glass-strong rounded-[2.5rem] border border-white/5 p-8 flex flex-col items-center justify-between group-hover:border-white/20 transition-all duration-700 overflow-hidden"
      >
        {/* Subtle Background Glow */}
        <div className="absolute inset-0 bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        {/* Clean Neutral Glow */}
        <motion.div 
           className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-white/[0.03] blur-[120px] rounded-full opacity-50"
           animate={{
             x: [0, 50, 0],
             y: [0, 30, 0],
           }}
           transition={{ duration: 20, repeat: Infinity }}
        />

        {/* Header - Minimalist */}
        <div className="relative z-10 flex flex-col items-center w-full min-h-[60px] justify-center">
          <h4 className="text-xl font-clash font-bold text-white/90 group-hover:text-white transition-colors duration-300 text-center tracking-tight">
            {name}
          </h4>
          <div className="w-4 h-0.5 bg-white/20 rounded-full mt-3 group-hover:w-8 group-hover:bg-primary-cyan transition-all duration-500" />
        </div>

        {/* Circular Progress - Simplified to a mere visual indicator without text */}
        <div className="relative z-10 w-36 h-36 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90">
                <circle
                    cx="72"
                    cy="72"
                    r={radius}
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="transparent"
                    className="text-white/[0.03]"
                />
                <motion.circle
                    cx="72"
                    cy="72"
                    r={radius}
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="transparent"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: isVisible ? offset : circumference }}
                    transition={{ duration: 2.5, ease: "easeInOut" }}
                    className="text-white/20 group-hover:text-primary-cyan/60"
                    strokeLinecap="round"
                />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                {/* Minimalist dot or light instead of percentage */}
                <div className="w-1.5 h-1.5 bg-primary-cyan/40 rounded-full blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
        </div>

        {/* Footer - Spacer */}
        <div className="relative z-10 w-full min-h-[40px]" />
      </div>

      {/* Shadow */}
      <div className="absolute -inset-4 bg-primary-cyan/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
    </motion.div>
  );
}
