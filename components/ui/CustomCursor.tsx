'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCursor } from '@/hooks/useCursor';
import { cursorConfig } from '@/lib/animations';

export default function CustomCursor() {
  const { position, variant: contextVariant, isDisabled } = useCursor();
  const [delayedPosition, setDelayedPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState<{ x: number, y: number, id: number }[]>([]);
  const [hoverVariant, setHoverVariant] = useState<'default' | 'hover' | 'click'>('default');

  // Handle local hover state detection
  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], input, textarea')) {
        setHoverVariant('hover');
      } else {
        setHoverVariant('default');
      }
    };

    const handleMouseDown = () => setHoverVariant('click');
    const handleMouseUp = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.closest('a, button, [role="button"]')) {
            setHoverVariant('hover');
        } else {
            setHoverVariant('default');
        }
    };

    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // Determine active variant (context takes precedence if manually set)
  const activeVariant = contextVariant !== 'default' ? contextVariant : hoverVariant;

  useEffect(() => {
    if (isDisabled) return;
    
    // Only add a new point if the distance from the last point is sufficient
    const lastPoint = trail[0];
    const distance = lastPoint 
      ? Math.hypot(position.x - lastPoint.x, position.y - lastPoint.y)
      : 100;

    if (distance > 10) {
      const newPoint = { x: position.x, y: position.y, id: Date.now() };
      setTrail((prev) => [newPoint, ...prev].slice(0, 15));
    }
  }, [position.x, position.y, isDisabled, trail]);

  useEffect(() => {
    if (isDisabled) return;

    let animationFrameId: number;
    let currentX = delayedPosition.x;
    let currentY = delayedPosition.y;

    const animate = () => {
      const targetX = position.x;
      const targetY = position.y;

      currentX += (targetX - currentX) * cursorConfig.ease;
      currentY += (targetY - currentY) * cursorConfig.ease;

      setDelayedPosition({ x: currentX, y: currentY });
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [position.x, position.y, isDisabled, delayedPosition.x, delayedPosition.y]);

  if (isDisabled) return null;

  return (
    <>
      {/* Particle Trail */}
      <AnimatePresence>
      {activeVariant !== 'hover' && trail.map((point, index) => (
        <motion.div
          key={point.id}
          className="fixed top-0 left-0 w-1.5 h-1.5 bg-primary-electricBlue rounded-full pointer-events-none z-[9997]"
          style={{
            left: point.x,
            top: point.y,
            transform: 'translate(-50%, -50%)',
          }}
          initial={{ scale: 1, opacity: 0.4 }}
          animate={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      ))}
      </AnimatePresence>

      {/* Cursor Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          left: position.x,
          top: position.y,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: activeVariant === 'click' ? 0.5 : activeVariant === 'hover' ? 0 : 1,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      />

      {/* Cursor Ring - Glowy & Responsive */}
      <motion.div
        className="fixed top-0 left-0 border border-white/50 rounded-full pointer-events-none z-[9998] mix-blend-normal backdrop-blur-[1px]"
        style={{
          left: delayedPosition.x,
          top: delayedPosition.y,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: activeVariant === 'hover' ? 64 : 32,
          height: activeVariant === 'hover' ? 64 : 32,
          backgroundColor: activeVariant === 'hover' ? 'rgba(46, 92, 255, 0.1)' : 'rgba(255, 255, 255, 0)',
          borderColor: activeVariant === 'hover' ? 'rgba(46, 92, 255, 0.5)' : 'rgba(255, 255, 255, 0.5)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />
      
      {/* Glow Effect on Hover */}
      <motion.div 
         className="fixed top-0 left-0 w-96 h-96 bg-primary-electricBlue/20 blur-[100px] pointer-events-none z-[9990]"
         style={{
            left: delayedPosition.x,
            top: delayedPosition.y,
            translateX: '-50%',
            translateY: '-50%',
         }}
         animate={{
             opacity: activeVariant === 'hover' ? 0.6 : 0,
             scale: activeVariant === 'hover' ? 1.2 : 0.8,
         }}
         transition={{ duration: 0.5 }}
      />
    </>
  );
}
