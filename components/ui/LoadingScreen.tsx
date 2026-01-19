'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ... imports

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // ... existing logic ...
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + 2; // Faster load for demo
      });
    }, 50);

    const timeout = setTimeout(() => {
      setProgress(100);
      setTimeout(() => setIsLoading(false), 500);
    }, 2500);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none">
          {/* Top Curtain */}
          <motion.div
            className="absolute top-0 left-0 w-full h-[50vh] bg-primary-black z-20"
            exit={{ y: '-100%' }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          />
          
          {/* Bottom Curtain */}
          <motion.div
            className="absolute bottom-0 left-0 w-full h-[50vh] bg-primary-black z-20"
            exit={{ y: '100%' }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* Content Container - Fades out before curtains open */}
          <motion.div
            className="relative z-30 flex flex-col items-center justify-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Animated Logo */}
            <motion.div
              className="relative mb-12"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="text-8xl font-black gradient-text font-display"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                MH
              </motion.div>
            </motion.div>

            {/* Progress Bar */}
            <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary-electricBlue to-primary-vividPurple"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: "linear" }}
              />
            </div>

            {/* Progress Text */}
            <motion.p
              className="mt-4 text-sm text-white/50 font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {progress}%
            </motion.p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
