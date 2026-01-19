'use client';

import { motion } from 'framer-motion';

const Logo = () => {
  return (
    <motion.div
      className="relative flex items-center justify-center font-display font-bold text-2xl tracking-tighter"
      initial="initial"
      whileHover="hover"
    >
      <motion.div
        className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-primary-electricBlue to-primary-vividPurple"
        variants={{
          initial: { y: 0 },
          hover: { y: -2 }
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        MH
      </motion.div>
      <motion.div
        className="absolute inset-0 blur-lg bg-primary-electricBlue/30"
        variants={{
          initial: { opacity: 0, scale: 0.8 },
          hover: { opacity: 1, scale: 1.2 }
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default Logo;
