'use client';

import { useEffect } from 'react';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { motion } from 'framer-motion'; // Added motion import

export default function ScrollProgress() {
  const progress = useScrollProgress();

  // Calculate scaleX based on progress, similar to the original transform
  // This assumes 'scaleX' in style={{ scaleX }} is meant to be a direct value
  // or a MotionValue if framer-motion is fully integrated.
  // Given the original `transform: \`scaleX(${progress / 100})\``,
  // we'll apply the same logic for `scaleX`.
  const scaleXValue = progress / 100;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-cyan via-white to-primary-cyan z-[9999] origin-left shadow-[0_0_10px_rgba(0,217,255,0.8)]"
      style={{
        scaleX: scaleXValue, // Use the calculated scaleXValue
        transformOrigin: 'left', // Keep transformOrigin for consistency with original behavior
      }}
    />
  );
}
