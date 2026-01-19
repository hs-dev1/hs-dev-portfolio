'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '@/lib/data';
import ProjectCard from '../ui/ProjectCard';
import ProjectModal from '../ui/ProjectModal';
import { AnimatePresence } from 'framer-motion';
import TextReveal from '../animations/TextReveal';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsHorizontal() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<any>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;

    if (!section || !container) return;

    // Desktop Horizontal Scroll
    const matchMedia = gsap.matchMedia();

    matchMedia.add("(min-width: 1024px)", () => {
      const scrollWidth = container.scrollWidth;
      const windowWidth = window.innerWidth;

      gsap.to(container, {
        x: () => -(scrollWidth - windowWidth + 100),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${scrollWidth}`,
          anticipatePin: 1,
        }
      });
    });

    return () => matchMedia.revert();
  }, []);

  return (
    <div className="relative">
      <section 
        ref={sectionRef} 
        id="projects" 
        className="relative min-h-screen bg-primary-black overflow-hidden flex flex-col justify-center py-24"
      >
        <div className="container mx-auto px-6 mb-12 relative z-10 lg:absolute lg:top-24 lg:left-0 lg:px-24">
           <TextReveal>
              <h2 className="text-display font-display font-black text-white">
                SELECTED <span className="text-gradient-brand">WORK</span>
              </h2>
           </TextReveal>
        </div>

        <div 
          ref={containerRef}
          className="flex flex-col lg:flex-row gap-8 px-6 lg:px-24 lg:w-max mt-24 lg:mt-0"
        >
          {projects.map((project, index) => (
            <div key={project.id} className="w-full lg:w-[45vw] flex-shrink-0">
               <ProjectCard
                 project={project}
                 index={index}
                 onClick={() => setSelectedProject(project)}
               />
            </div>
          ))}
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
