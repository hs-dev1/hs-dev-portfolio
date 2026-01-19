import { Variants } from 'framer-motion';

// Framer Motion Variants
export const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.6, 0.05, 0.01, 0.9],
        },
    },
};

export const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.6 },
    },
};

export const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.6,
            ease: [0.6, 0.05, 0.01, 0.9],
        },
    },
};

export const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3,
        },
    },
};

export const letterReveal: Variants = {
    hidden: { opacity: 0, y: 100 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 1.2,
            ease: [0.6, 0.05, 0.01, 0.9],
        },
    },
};

export const slideFromRight: Variants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.8,
            ease: [0.6, 0.05, 0.01, 0.9],
        },
    },
};

export const slideFromLeft: Variants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.8,
            ease: [0.6, 0.05, 0.01, 0.9],
        },
    },
};

// GSAP Animation Configs
export const gsapConfig = {
    ease: {
        power4Out: 'power4.out',
        power4In: 'power4.in',
        expo: 'expo.out',
        elastic: 'elastic.out(1, 0.3)',
    },
    duration: {
        fast: 0.3,
        normal: 0.6,
        slow: 1.2,
    },
};

// ScrollTrigger Defaults
export const scrollTriggerDefaults = {
    start: 'top 80%',
    end: 'bottom 20%',
    toggleActions: 'play none none reverse',
    markers: false, // Set to true for debugging
};

// Magnetic Effect Config
export const magneticConfig = {
    strength: 0.3,
    maxDistance: 100,
    ease: 0.15,
};

// Cursor Config
export const cursorConfig = {
    dotSize: 8,
    ringSize: 40,
    delay: 0.1,
    ease: 0.15,
};
