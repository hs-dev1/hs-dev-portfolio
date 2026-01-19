'use client';

import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { Project } from '@/lib/data';

interface ProjectCardProps {
  project: Project;
  index: number;
  onClick: () => void;
  className?: string; // Add optional className
}

export default function ProjectCard({ project, index, onClick, className = '' }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  // 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative group perspective-1000 h-[400px] cursor-pointer w-full ${className}`}
      onClick={onClick}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="w-full h-full relative"
      >
        {/* Card Container */}
        <div className="absolute inset-0 bg-primary-black/40 border border-white/5 rounded-3xl overflow-hidden backdrop-blur-sm shadow-xl transition-all duration-300 group-hover:border-primary-cyan/50 group-hover:shadow-[0_0_50px_rgba(0,217,255,0.15)] bg-clip-padding">
          
          {/* Background Image / Gradient */}
          <div className="absolute inset-0 z-0">
             {project.image && !project.image.includes('linear-gradient') ? (
               <Image
                 src={project.image}
                 alt={project.title}
                 fill
                 sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                 className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                 priority={index < 2} // Load first 2 images eagerly
               />
             ) : (
                <div 
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
                  style={{ 
                      backgroundImage: project.image || 'linear-gradient(to bottom right, #111, #222)',
                  }}
               />
             )}
             <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
          </div>

          {/* Content */}
          <div className="absolute inset-0 z-10 p-8 flex flex-col justify-between" style={{ transform: "translateZ(20px)" }}>
            
            {/* Top Bar */}
            <div className="flex justify-between items-start">
               {project.featured && (
                  <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-black bg-primary-cyan rounded-full">
                    Featured
                  </span>
               )}
               {/* Arrow Icon */}
               <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 -translate-y-4 group-hover:translate-y-0 transition-all duration-300 ml-auto">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                      <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
               </div>
            </div>

            {/* Bottom Content */}
            <div>
               <h3 className="text-3xl font-clash font-bold text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                 {project.title}
               </h3>
               
               <p className="text-white/70 line-clamp-2 mb-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-75 text-sm md:text-base">
                 {project.description}
               </p>

               {/* Tech Stack */}
               <div className="flex flex-wrap gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-100 max-h-0 group-hover:max-h-20 overflow-hidden">
                 {project.techStack.slice(0, 3).map((tech, i) => (
                    <span key={i} className="text-xs font-mono text-primary-cyan/80 bg-primary-cyan/10 px-2 py-1 rounded">
                        {tech}
                    </span>
                 ))}
                 {project.techStack.length > 3 && (
                     <span className="text-xs font-mono text-white/50 px-2 py-1">+ {project.techStack.length - 3}</span>
                 )}
               </div>
            </div>

          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
