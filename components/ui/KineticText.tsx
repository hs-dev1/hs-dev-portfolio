'use client';

import { motion } from 'framer-motion';

interface KineticTextProps {
  text: string;
  className?: string;
}

const KineticText = ({ text, className = '' }: KineticTextProps) => {
  const characters = text.split('');

  return (
    <div className={`flex flex-wrap ${className}`}>
      {characters.map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          animate={{
            fontWeight: [400, 600, 400],
            scale: [1, 1.05, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.1,
          }}
          style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
};

export default KineticText;
