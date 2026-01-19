'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollFade from '../animations/ScrollFade';
import { experiences } from '@/lib/data';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Experience() {
  const timelineRef = useRef<SVGLineElement>(null);

  useEffect(() => {
    if (!timelineRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        timelineRef.current,
        { strokeDashoffset: 1000 },
        {
          strokeDashoffset: 0,
          scrollTrigger: {
            trigger: '.experience-section',
            start: 'top 60%',
            end: 'bottom 40%',
            scrub: 1,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className="experience-section py-24 md:py-32 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Title */}
        <ScrollFade direction="up">
          <h2 className="text-h2 font-clash font-black mb-4 gradient-text tracking-tightest">
            Experience
          </h2>
          <p className="text-lg text-white/60 mb-20">
            Building exceptional mobile experiences across industries
          </p>
        </ScrollFade>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line - Desktop */}
          <svg
            className="hidden md:block absolute left-1/2 top-0 -translate-x-1/2 h-full w-1"
            style={{ zIndex: 0 }}
          >
            <line
              ref={timelineRef}
              x1="2"
              y1="0"
              x2="2"
              y2="100%"
              stroke="url(#gradient)"
              strokeWidth="2"
              strokeDasharray="1000"
              strokeDashoffset="1000"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#00D9FF" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>
          </svg>

          {/* Vertical Line - Mobile */}
          <div className="md:hidden absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-cyan to-primary-purple" />

          {/* Experience Cards */}
          <div className="space-y-16 md:space-y-24">
            {experiences.map((exp, index) => (
              <ScrollFade
                key={index}
                direction={index % 2 === 0 ? 'right' : 'left'}
                delay={0.2}
              >
                <div
                  className={`relative md:grid md:grid-cols-2 md:gap-12 ${
                    index % 2 === 0 ? '' : 'md:grid-flow-dense'
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="hidden md:block absolute left-1/2 top-8 -translate-x-1/2 w-4 h-4 rounded-full bg-primary-cyan glow-cyan z-10" />
                  <div className="md:hidden absolute left-6 top-8 -translate-x-1/2 w-3 h-3 rounded-full bg-primary-cyan" />

                  {/* Card */}
                  <div
                    className={`ml-12 md:ml-0 ${
                      index % 2 === 0 ? 'md:col-start-2' : 'md:col-start-1'
                    }`}
                  >
                    <motion.div
                      className="glass-strong rounded-2xl p-6 md:p-8 hover-lift group"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Company & Title */}
                      <div className="mb-4">
                        <h3 className="text-2xl md:text-3xl font-clash font-black text-white mb-2">
                          {exp.company}
                        </h3>
                        <p className="text-lg text-primary-cyan font-medium">
                          {exp.title}
                        </p>
                      </div>

                      {/* Meta Info */}
                      <div className="flex flex-wrap gap-3 mb-6">
                        <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-white/70">
                          {exp.duration}
                        </span>
                        <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-white/70">
                          {exp.location}
                        </span>
                        <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-white/70">
                          {exp.type}
                        </span>
                      </div>

                      {/* Date Range */}
                      <p className="text-sm text-white/50 mb-6 font-mono">
                        {exp.startDate} - {exp.endDate}
                      </p>

                      {/* Achievements */}
                      <ul className="space-y-3 mb-6">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i} className="flex gap-3 text-white/80">
                            <span className="text-primary-cyan mt-1.5 flex-shrink-0">
                              ▹
                            </span>
                            <span className="text-sm leading-relaxed">
                              {achievement}
                            </span>
                          </li>
                        ))}
                      </ul>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2">
                        {exp.techStack.map((tech, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-gradient-to-r from-primary-cyan/10 to-primary-purple/10 border border-primary-cyan/20 rounded-full text-xs text-primary-cyan font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Hover Glow Effect */}
                      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none glow-gradient" />
                    </motion.div>
                  </div>
                </div>
              </ScrollFade>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
