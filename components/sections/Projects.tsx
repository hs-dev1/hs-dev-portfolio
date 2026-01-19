'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import TextReveal from '../animations/TextReveal';
import ProjectCard from '../ui/ProjectCard';
import ProjectModal from '../ui/ProjectModal';
import { projects, Project } from '@/lib/data';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState<'All' | 'Mobile' | 'Web'>('All');

  const filteredProjects = projects.filter(project => {
      if (activeCategory === 'All') return true;
      return project.category === activeCategory;
  });

  const categories = ['All', 'Mobile', 'Web'];

  return (
    <section id="projects" className="py-32 relative bg-primary-black overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
           <div>
              <TextReveal>
                  <h2 className="text-display font-clash font-black text-white mb-6">
                      SELECTED <br />
                      <span className="text-gradient-brand">
                      WORK
                      </span>
                  </h2>
              </TextReveal>
              <p className="text-xl text-white/50 max-w-2xl font-light">
                  A showcase of mobile and web applications built for scale and performance.
              </p>
           </div>

           {/* Category Tabs */}
           <div className="flex bg-white/5 p-1 rounded-full backdrop-blur-md border border-white/10">
              {categories.map((cat) => (
                  <button
                      key={cat}
                      onClick={() => setActiveCategory(cat as any)}
                      className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                          activeCategory === cat 
                          ? 'bg-primary-electricBlue text-white shadow-[0_0_20px_rgba(46,92,255,0.4)]' 
                          : 'text-white/60 hover:text-white hover:bg-white/5'
                      }`}
                  >
                      {cat}
                  </button>
              ))}
           </div>
        </div>

        {/* Unified Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-[400px]">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
                <ProjectCard 
                    key={project.id}
                    project={project}
                    index={index}
                    onClick={() => setSelectedProject(project)}
                    className="col-span-1"
                />
            ))}
          </AnimatePresence>
        </div>

      </div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>

    </section>
  );
}
