'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue } from 'framer-motion';
import { useCursor } from '@/hooks/useCursor';

export default function CustomCursor() {
  const { position, variant: contextVariant, isDisabled } = useCursor();
  const [trail, setTrail] = useState<{ x: number, y: number, id: number }[]>([]);
  const [hoverVariant, setHoverVariant] = useState<'default' | 'hover' | 'click'>('default');
  const [magneticTarget, setMagneticTarget] = useState<{ x: number, y: number } | null>(null);
  const lastTrailTime = useRef(0);

  // Smooth cursor position with springs
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

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

  // Magnetic effect - detect nearby interactive elements
  useEffect(() => {
    if (isDisabled) return;

    const updateMagneticTarget = () => {
      const interactiveElements = document.querySelectorAll('a, button, [role="button"]');
      let closestElement: { element: Element, distance: number } | null = null;
      const magneticRadius = 80; // Detection radius

      interactiveElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const elementCenterX = rect.left + rect.width / 2;
        const elementCenterY = rect.top + rect.height / 2;
        
        const distance = Math.hypot(
          position.x - elementCenterX,
          position.y - elementCenterY
        );

        if (distance < magneticRadius && (!closestElement || distance < closestElement.distance)) {
          closestElement = { element, distance };
        }
      });

      if (closestElement) {
        const rect = closestElement.element.getBoundingClientRect();
        const elementCenterX = rect.left + rect.width / 2;
        const elementCenterY = rect.top + rect.height / 2;
        
        // Calculate magnetic pull strength (stronger when closer)
        const pullStrength = 0.3 * (1 - closestElement.distance / magneticRadius);
        
        setMagneticTarget({
          x: position.x + (elementCenterX - position.x) * pullStrength,
          y: position.y + (elementCenterY - position.y) * pullStrength,
        });
      } else {
        setMagneticTarget(null);
      }
    };

    updateMagneticTarget();
  }, [position.x, position.y, isDisabled]);

  // Update cursor position with magnetic effect
  useEffect(() => {
    if (isDisabled) return;

    const targetX = magneticTarget ? magneticTarget.x : position.x;
    const targetY = magneticTarget ? magneticTarget.y : position.y;

    cursorX.set(targetX);
    cursorY.set(targetY);
  }, [position.x, position.y, magneticTarget, isDisabled, cursorX, cursorY]);

  // Optimized trail generation - throttled and reduced particles
  useEffect(() => {
    if (isDisabled || activeVariant === 'hover') return;
    
    const now = Date.now();
    // Throttle trail generation to every 50ms
    if (now - lastTrailTime.current < 50) return;
    
    const lastPoint = trail[0];
    const distance = lastPoint 
      ? Math.hypot(position.x - lastPoint.x, position.y - lastPoint.y)
      : 100;

    // Only add trail if moved sufficient distance (20px)
    if (distance > 20) {
      const newPoint = { x: position.x, y: position.y, id: now };
      setTrail((prev) => [newPoint, ...prev].slice(0, 8)); // Reduced from 15 to 8
      lastTrailTime.current = now;
    }
  }, [position.x, position.y, isDisabled, activeVariant, trail]);

  if (isDisabled) return null;

  return (
    <>
      {/* Optimized Particle Trail */}
      <AnimatePresence>
      {activeVariant !== 'hover' && trail.map((point, index) => (
        <motion.div
          key={point.id}
          className="fixed top-0 left-0 w-1.5 h-1.5 bg-primary-cyan rounded-full pointer-events-none z-[9997]"
          style={{
            left: point.x,
            top: point.y,
            transform: 'translate(-50%, -50%)',
          }}
          initial={{ scale: 1, opacity: 0.6 }}
          animate={{ scale: 0, opacity: 0 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ))}
      </AnimatePresence>

      {/* Cursor Dot with Magnetic Movement */}
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

      {/* Cursor Ring - Smooth with Magnetic Effect */}
      <motion.div
        className="fixed top-0 left-0 border border-white/50 rounded-full pointer-events-none z-[9998] mix-blend-normal backdrop-blur-[1px]"
        style={{
          left: smoothX,
          top: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: activeVariant === 'hover' ? 64 : magneticTarget ? 40 : 32,
          height: activeVariant === 'hover' ? 64 : magneticTarget ? 40 : 32,
          backgroundColor: activeVariant === 'hover' 
            ? 'rgba(6, 182, 212, 0.15)' 
            : magneticTarget 
            ? 'rgba(6, 182, 212, 0.08)'
            : 'rgba(255, 255, 255, 0)',
          borderColor: activeVariant === 'hover' 
            ? 'rgba(6, 182, 212, 0.6)' 
            : magneticTarget
            ? 'rgba(6, 182, 212, 0.4)'
            : 'rgba(255, 255, 255, 0.5)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      />
      
      {/* Glow Effect on Hover */}
      <motion.div 
         className="fixed top-0 left-0 w-96 h-96 bg-primary-cyan/20 blur-[100px] pointer-events-none z-[9990]"
         style={{
            left: smoothX,
            top: smoothY,
            translateX: '-50%',
            translateY: '-50%',
         }}
         animate={{
             opacity: activeVariant === 'hover' ? 0.5 : magneticTarget ? 0.2 : 0,
             scale: activeVariant === 'hover' ? 1.2 : magneticTarget ? 1 : 0.8,
         }}
         transition={{ duration: 0.4 }}
      />
    </>
  );
}
