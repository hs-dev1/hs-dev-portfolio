'use client';

import { ReactNode, useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { magneticConfig } from '@/lib/animations';
import { lerp, getDistance } from '@/lib/utils';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  maxDistance?: number;
  onClick?: () => void;
}

export default function MagneticButton({
  children,
  className = '',
  strength = magneticConfig.strength,
  maxDistance = magneticConfig.maxDistance,
  onClick,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    let animationFrameId: number;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const distance = getDistance(e.clientX, e.clientY, centerX, centerY);

      if (distance < maxDistance) {
        targetX = (e.clientX - centerX) * strength;
        targetY = (e.clientY - centerY) * strength;
      } else {
        targetX = 0;
        targetY = 0;
      }
    };

    const handleMouseLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    const animate = () => {
      currentX = lerp(currentX, targetX, magneticConfig.ease);
      currentY = lerp(currentY, targetY, magneticConfig.ease);

      setPosition({ x: currentX, y: currentY });

      animationFrameId = requestAnimationFrame(animate);
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [strength, maxDistance]);

  return (
    <div
      ref={buttonRef}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
      className={`magnetic relative cursor-pointer ${className}`}
    >
      <motion.div
        animate={{ x: position.x, y: position.y }}
        transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
