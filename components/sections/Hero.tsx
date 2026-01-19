'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import GradientMesh from '../ui/GradientMesh';
import MagneticButton from '../animations/MagneticButton';
import KineticText from '../ui/KineticText';

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  
  // Parallax transforms
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, 400]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 0.8]);

  const firstName = 'MUHAMMAD';
  const lastName = 'HUSSNAIN';

  const containerVariants = {
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const letterVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  };

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-primary-black select-none"
    >
      <GradientMesh />

      {/* Content */}
      <motion.div 
        className="relative z-10 w-full max-w-[1600px] mx-auto px-6 -mt-20"
        style={{ opacity, scale }}
      >
        <div className="flex flex-col items-center justify-center text-center">
          {/* Main Name Container */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center"
          >
            {/* First Name - Split Hover Reveal */}
            <motion.div 
              className="flex flex-wrap justify-center overflow-hidden py-2"
              style={{ y: y1 }}
            >
              {firstName.split('').map((char, i) => (
                <InteractiveLetter key={i} char={char} index={i} variants={letterVariants} />
              ))}
            </motion.div>

            {/* Last Name - Split Hover Reveal with Gradient */}
            <motion.div 
              className="flex flex-wrap justify-center overflow-hidden py-2"
              style={{ y: y2 }}
            >
              {lastName.split('').map((char, i) => (
                <InteractiveLetter key={i} char={char} index={i} variants={letterVariants} isGradient />
              ))}
            </motion.div>
          </motion.div>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-4 relative"
          >
            <div className="text-h3 font-display font-light tracking-wide text-white/70 uppercase">
              <KineticText text="Senior Software Engineer" />
            </div>
            <motion.div 
              className="absolute -bottom-4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-cyan/50 to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.5, duration: 1.5 }}
            />
          </motion.div>

          {/* Magnetic CTA with Ripple */}
          <motion.div
            className="mt-12"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.8, type: 'spring' }}
          >
            <MagneticButton strength={0.2} maxDistance={300}>
              <button 
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative px-10 py-5 bg-primary-white text-primary-black font-black text-lg rounded-full overflow-hidden transition-transform active:scale-95"
              >
                <span className="relative z-10">EXPLORE WORK</span>
                {/* Ripple Effect Background */}
                <div className="absolute inset-0 bg-primary-cyan translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-expo" />
              </button>
            </MagneticButton>
          </motion.div>
        </div>
      </motion.div>

      {/* Floating Meta Decorations */}
      {isMounted && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-64 h-64 bg-primary-cyan/5 rounded-full blur-3xl"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 10 + i * 5,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>
      )}

      {/* Extreme Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
      >
        <span className="text-spaced-detail font-mono">SCROLL TO EXPLORE</span>
        <div className="w-px h-20 bg-gradient-to-b from-primary-cyan to-transparent relative overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 w-full h-1/2 bg-white"
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}

function InteractiveLetter({ char, index, variants, isGradient = false }: { char: string, index: number, variants: any, isGradient?: boolean }) {
  const [isHovered, setIsHovered] = useState(false);

  return (char === ' ' ? <span className="w-8" /> :
    <motion.span
      variants={variants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative text-mega font-clash font-black cursor-default perspective-1000"
    >
      <motion.span
        animate={{ 
          y: isHovered ? '-100%' : '0%',
          rotateX: isHovered ? 90 : 0,
        }}
        transition={{ duration: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
        className={`inline-block ${isGradient ? 'text-gradient-brand' : 'text-primary-white'}`}
      >
        {char}
      </motion.span>
      <motion.span
        className="absolute top-0 left-0 inline-block text-primary-cyan outline-text"
        initial={{ y: '100%', rotateX: -90 }}
        animate={{ 
          y: isHovered ? '0%' : '100%',
          rotateX: isHovered ? 0 : -90,
        }}
        transition={{ duration: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
      >
        {char}
      </motion.span>
    </motion.span>
  );
}
