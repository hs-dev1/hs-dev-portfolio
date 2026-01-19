'use client';

import { useState, useMemo, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SkillUniverse from '../ui/SkillUniverse';
import { skillsData, Skill } from '@/lib/data';

export default function Skills() {
  // Aggregate all skills into a single list for the 3D cloud
  const allSkills = useMemo(() => {
    return skillsData.flatMap(category => category.skills);
  }, []);

  const [activeSkill, setActiveSkill] = useState<Skill | null>(null);

  // Default to the first skill or "Flutter" if available, just to show something initially if we wanted,
  // but showing "System Ready" or similar when nothing hovered is cooler.
  
  return (
    <section id="skills" className="relative w-full min-h-screen bg-primary-black overflow-hidden py-32 flex items-center">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-cyan/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary-cyan/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 items-center">
        
        {/* LEFT COLUMN: HUD & Info */}
        <div className="lg:col-span-5 flex flex-col justify-center h-full order-2 lg:order-1 pointer-events-none">
            {/* Section Header */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-16 pointer-events-auto"
            >
                <h2 className="text-display font-clash font-black text-white mb-4 tracking-tighter">
                  TECH <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-cyan to-white">
                    ARSENAL
                  </span>
                </h2>
                <p className="text-white/60 text-lg max-w-md leading-relaxed">
                  Navigating the digital frontier with a comprehensive suite of advanced tools and languages.
                </p>
            </motion.div>

            {/* The HUD */}
            <div className="min-h-[300px] relative">
               <AnimatePresence mode="wait">
                 {activeSkill ? (
                    <SkillHUD key="skill-active" skill={activeSkill} />
                 ) : (
                    <SkillHUDIdle key="skill-idle" />
                 )}
               </AnimatePresence>
            </div>
        </div>

        {/* RIGHT COLUMN: 3D Universe */}
        <div className="lg:col-span-7 h-[500px] lg:h-[800px] w-full relative order-1 lg:order-2">
            {/* 3D Canvas wrapper */}
            <div className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing hover:scale-105 transition-transform duration-700 ease-out">
               <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-white/20">Loading Neural Network...</div>}>
                  <SkillUniverse skills={allSkills} onSkillHover={setActiveSkill} />
               </Suspense>
            </div>
            
            {/* Decorative frames/HUD elements around the canvas */}
            <div className="absolute inset-0 pointer-events-none border border-white/5 rounded-3xl" />
            <div className="absolute top-10 right-10 w-20 h-20 border-t-2 border-r-2 border-primary-cyan/30 rounded-tr-3xl" />
            <div className="absolute bottom-10 left-10 w-20 h-20 border-b-2 border-l-2 border-primary-cyan/10 rounded-bl-3xl" />
        </div>

      </div>
    </section>
  );
}

function SkillHUD({ skill }: { skill: Skill }) {
    return (
        <motion.div 
            initial={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
            transition={{ duration: 0.3 }}
            className="w-full glass-strong border border-white/10 rounded-2xl p-8 relative overflow-hidden group"
        >
             {/* Scanline effect */}
             <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-cyan/[0.03] to-transparent bg-[length:100%_4px] animate-scanline pointer-events-none" />

            <div className="flex items-start justify-between mb-8">
                <div>
                     <span className="text-xs font-mono text-primary-cyan mb-2 block tracking-widest uppercase">Target Locked</span>
                     <h3 className="text-5xl font-clash font-black text-white tracking-tight">{skill.name}</h3>
                </div>
                <div className="text-right">
                    <span className="text-xs font-mono text-white/40 block mb-1">PROFIENCY</span>
                    <span className="text-3xl font-bold text-primary-cyan">{skill.proficiency}%</span>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-white/10 rounded-full mb-8 overflow-hidden relative">
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.proficiency}%` }}
                    transition={{ duration: 1, ease: "circOut" }}
                    className="h-full bg-primary-cyan relative"
                >
                    <div className="absolute right-0 top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                </motion.div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                 <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                     <span className="text-xs font-mono text-white/40 uppercase block mb-2">Experience</span>
                     <span className="text-xl font-bold text-white">
                         {skill.yearsOfExperience ? `${skill.yearsOfExperience} Years` : 'N/A'}
                     </span>
                 </div>
                 <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                     <span className="text-xs font-mono text-white/40 uppercase block mb-2">Status</span>
                     <span className="text-xl font-bold text-primary-cyan flex items-center gap-2">
                        <span className="w-2 h-2 bg-primary-cyan rounded-full animate-pulse" />
                        Verified
                     </span>
                 </div>
            </div>
            
            {/* Decorative Corner */}
            <div className="absolute bottom-0 right-0 p-4 opacity-20">
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                    <path d="M60 60H0V50H50V0H60V60Z" fill="currentColor" className="text-white"/>
                </svg>
            </div>
        </motion.div>
    );
}

function SkillHUDIdle() {
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full glass border border-white/5 rounded-2xl p-8 flex flex-col items-center justify-center text-center opacity-50 min-h-[300px]"
        >
            <div className="w-16 h-16 rounded-full border-2 border-white/10 border-t-primary-cyan/50 animate-spin mb-6" />
            <h3 className="text-2xl font-clash font-bold text-white mb-2">System Ready</h3>
            <p className="text-white/40 font-mono text-sm">Hover over a node to analyze data</p>
        </motion.div>
    )
}
