'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface SkillRingProps {
  name: string;
  proficiency: number;
  yearsOfExperience?: number;
  index: number;
}

export default function SkillRing({
  name,
  proficiency,
  yearsOfExperience,
  index,
}: SkillRingProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 1500;
    const steps = 60;
    const increment = proficiency / steps;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      setCount(Math.min(Math.round(currentStep * increment), proficiency));

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isVisible, proficiency]);

  return (
    <motion.div
      className="group cursor-pointer"
      initial={{ opacity: 0, scale: 0.8, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ 
        delay: index * 0.05, 
        duration: 0.6,
        type: 'spring',
        stiffness: 100,
      }}
      onViewportEnter={() => setIsVisible(true)}
      whileHover={{ 
        scale: 1.05,
        y: -8,
      }}
    >
      {/* Floating Animation */}
      <motion.div
        animate={{
          y: [0, -5, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: index * 0.2,
        }}
      >
        {/* Card */}
        <div className="relative glass-strong rounded-2xl p-6 overflow-hidden border border-white/10 hover:border-primary-cyan/50 transition-all duration-300">
          {/* Background Glow */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-primary-cyan/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            animate={{
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />

          {/* Content */}
          <div className="relative z-10">
            {/* Skill Name */}
            <h4 className="text-lg font-bold text-white mb-3 group-hover:text-primary-cyan transition-colors">
              {name}
            </h4>

            {/* Progress Bar */}
            <div className="relative h-2 bg-white/10 rounded-full overflow-hidden mb-3">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary-cyan to-white rounded-full"
                initial={{ width: 0 }}
                animate={{ width: isVisible ? `${proficiency}%` : 0 }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                style={{
                  boxShadow: '0 0 10px rgba(0, 217, 255, 0.5)',
                }}
              />
            </div>

            {/* Stats Row */}
            <div className="flex items-center justify-between">
              {/* Percentage */}
              <motion.span
                className="text-2xl font-black text-primary-cyan"
                animate={{
                  scale: isVisible ? [1, 1.2, 1] : 1,
                }}
                transition={{
                  duration: 0.5,
                  delay: 1.5,
                }}
              >
                {count}%
              </motion.span>

              {/* Years Experience */}
              {yearsOfExperience && (
                <motion.div
                  className="flex items-center gap-1 text-xs text-white/60"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 + 0.3 }}
                >
                  <span className="text-primary-cyan">⚡</span>
                  <span>{yearsOfExperience}+ years</span>
                </motion.div>
              )}
            </div>
          </div>

          {/* Hover Shine Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatDelay: 1,
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
