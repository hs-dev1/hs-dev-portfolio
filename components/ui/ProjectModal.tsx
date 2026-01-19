'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '@/lib/data';
import { useEffect, useState } from 'react';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const gallery = project.gallery || (project.image ? [project.image] : []);
  
  // Reset index when project changes
  useEffect(() => setCurrentImageIndex(0), [project]);

  const nextImage = () => {
    if (gallery.length > 1) {
        setCurrentImageIndex((prev) => (prev + 1) % gallery.length);
    }
  };

  const prevImage = () => {
    if (gallery.length > 1) {
        setCurrentImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <motion.div 
        className="absolute inset-0 bg-primary-black/90 backdrop-blur-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Modal Container */}
      <motion.div
        className="relative w-full max-w-4xl max-h-[85vh] glass-strong rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl border border-white/10"
        initial={{ scale: 0.95, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 50 }}
        transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button Mobile */}
        <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-50 p-2 bg-black/50 rounded-full md:hidden text-white"
        >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>

        {/* Left Column: Gallery (45%) */}
        <div className="w-full md:w-[45%] h-[250px] md:h-auto relative bg-black/50 group">
           <AnimatePresence mode="wait">
             <motion.div
               key={currentImageIndex}
               initial={{ opacity: 0.5 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0.5 }}
               transition={{ duration: 0.3 }}
               className="absolute inset-0 bg-cover bg-center"
               style={{ 
                   backgroundImage: gallery[currentImageIndex]?.includes('gradient') 
                     ? gallery[currentImageIndex] 
                     : `url(${gallery[currentImageIndex]})` 
               }}
             />
           </AnimatePresence>

           {/* Carousel Controls */}
           {gallery.length > 1 && (
             <>
                <button 
                  onClick={(e) => { e.stopPropagation(); prevImage(); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-primary-black/50 hover:bg-primary-cyan text-white rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all"
                >
                  ←
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); nextImage(); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-primary-black/50 hover:bg-primary-cyan text-white rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all"
                >
                  →
                </button>
                {/* Dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {gallery.map((_, idx) => (
                        <div 
                            key={idx}
                            className={`w-1.5 h-1.5 rounded-full transition-all ${idx === currentImageIndex ? 'bg-primary-cyan w-4' : 'bg-white/50'}`}
                        />
                    ))}
                </div>
             </>
           )}
        </div>

        {/* Details Column (55%) - Flex Column for Layout */}
        <div className="w-full md:w-[55%] flex flex-col h-full bg-primary-black/80 border-l border-white/5 md:max-h-[85vh]">
             
             {/* Scrollable Content (Description) */}
             <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                 {/* Close Button Desktop */}
                 <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-all z-20"
                 >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                 </button>

                 <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                 >
                     {project.badge && (
                         <span className="inline-block px-2.5 py-1 mb-4 text-[10px] font-bold tracking-widest text-primary-cyan uppercase border border-primary-cyan/30 rounded-full bg-primary-cyan/5">
                             {project.badge}
                         </span>
                     )}
                     
                     <h2 className="text-3xl font-clash font-bold text-white mb-4 leading-tight pr-8">
                         {project.title}
                     </h2>

                     <p className="text-white/70 text-sm md:text-base leading-relaxed font-light whitespace-pre-line">
                         {project.longDescription || project.description}
                     </p>
                 </motion.div>
             </div>

             {/* Footer: Tech Stack + Actions (Fixed) */}
             <div className="p-5 bg-black/20 border-t border-white/5 flex-shrink-0 z-10 w-full backdrop-blur-sm">
                 {/* Tech Stack */}
                 <div className="mb-5">
                     <h4 className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-3">Technologies</h4>
                     <div className="flex flex-wrap gap-1.5">
                         {project.techStack.map((tech, i) => (
                             <span 
                                key={i} 
                                className="px-2 py-1 text-[11px] text-white/80 bg-white/5 border border-white/10 rounded-md hover:border-primary-cyan/50 hover:text-primary-cyan transition-colors"
                             >
                                 {tech}
                             </span>
                         ))}
                     </div>
                 </div>

                 {/* Actions */}
                 <div className="flex flex-col gap-2.5">
                     {project.links.web && (
                         <a href={project.links.web} target="_blank" rel="noopener noreferrer" 
                            className="flex items-center justify-center gap-2 w-full py-2.5 bg-primary-cyan text-primary-black font-bold text-sm rounded-lg hover:bg-white transition-all duration-300 shadow-[0_0_15px_rgba(0,217,255,0.15)] hover:shadow-[0_0_25px_rgba(255,255,255,0.25)] hover:-translate-y-0.5">
                             <span>Open Live Project</span>
                             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                         </a>
                     )}
                     
                     <div className="grid grid-cols-2 gap-2.5">
                         {project.links.ios && (
                             <a href={project.links.ios} target="_blank" rel="noopener noreferrer" 
                                className="flex items-center justify-center gap-2 py-2.5 bg-white/5 border border-white/10 hover:border-primary-cyan/50 text-white rounded-lg font-semibold text-[13px] transition-all hover:bg-white/10 hover:-translate-y-0.5">
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.79-1.31.02-2.3-1.23-3.17-2.33C4.24 17.05 2.94 14.35 4.19 11c.62-1.68 1.76-2.73 3.35-2.84 1.34-.11 2.58.91 3.39.91.81 0 2.37-1.12 3.93-.97.66.03 2.56.27 3.76 2.02-3.28 1.58-2.73 5.96.64 7.38zM13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg> 
                                App Store
                             </a>
                         )}
                         {project.links.android && (
                             <a href={project.links.android} target="_blank" rel="noopener noreferrer" 
                                className="flex items-center justify-center gap-2 py-2.5 bg-white/5 border border-white/10 hover:border-primary-cyan/50 text-white rounded-lg font-semibold text-[13px] transition-all hover:bg-white/10 hover:-translate-y-0.5">
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993s-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993s-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1527-.5676.416.416 0 00-.5676.1527L17.219 8.8075c-1.6231-.7431-3.4154-1.1587-5.2223-1.1587-1.8069 0-3.5992.4156-5.2223 1.1587L4.7937 5.4473a.4172.4172 0 00-.5676-.1527.4156.4156 0 00-.1527.5676l1.9973 3.4592C2.6889 11.1867.344 14.6589 0 18.7475h24c-.344-40886-2.6889-7.5608-6.1185-9.4261"/></svg>
                                Play Store
                             </a>
                         )}
                     </div>

                     {!project.links.web && !project.links.ios && !project.links.android && (
                         <div className="py-2.5 px-4 bg-white/5 border border-white/5 rounded-lg text-center">
                             <span className="text-white/40 text-[11px] font-mono uppercase tracking-widest">Live Demo Restricted</span>
                         </div>
                     )}
                 </div>
             </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
