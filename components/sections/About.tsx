import { useRef } from 'react';
import { motion } from 'framer-motion';
import ScrollFade from '../animations/ScrollFade';
import TextReveal from '../animations/TextReveal';
import Counter from '../ui/Counter';
import { personalInfo } from '@/lib/data';

export default function About() {
  const containerRef = useRef<HTMLElement>(null);

  return (
    <section id="about" ref={containerRef} className="py-32 relative bg-primary-black">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Title */}
        <ScrollFade direction="up">
          <h2 className="text-display font-clash font-black mb-12 tracking-tightest">
            About Me
          </h2>
        </ScrollFade>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          {/* Left: Content */}
          <ScrollFade direction="right">
          <div className="space-y-6">
            <TextReveal>
              <p className="text-body text-white/80 leading-relaxed">
                I&apos;m <span className="text-primary-cyan font-semibold">{personalInfo.fullName}</span>,
                a <span className="text-primary-cyan font-semibold">{personalInfo.title}</span> with {personalInfo.yearsOfExperience} years
                of expertise in full-stack development, specializing in cross-platform mobile applications, 
                modern web technologies, and scalable backend systems.
              </p>
            </TextReveal>

            <TextReveal>
              <p className="text-body text-white/80 leading-relaxed">
                I&apos;ve built complete product ecosystems including{' '}
                <span className="text-primary-cyan font-semibold">{personalInfo.appsBuilt} production applications</span>{' '}
                across mobile (iOS/Android), responsive web apps, PWAs, desktop applications,{' '}
                <span className="text-white font-semibold">RESTful APIs</span>, and administrative dashboards for international clients.
              </p>
            </TextReveal>

            <TextReveal>
              <p className="text-body text-white/80 leading-relaxed">
                As a technical leader, I&apos;ve mentored{' '}
                <span className="text-primary-cyan font-semibold">{personalInfo.developersMentored} developers</span>{' '}
                from intern to mid-level positions while establishing best practices, 
                conducting code reviews, and architecting innovative solutions across the entire technology stack.
              </p>
            </TextReveal>

            <TextReveal>
              <p className="text-body text-white/80 leading-relaxed">
                My expertise spans Flutter, React, Next.js, Node.js, and cloud platforms, 
                enabling me to deliver end-to-end solutions that users love and businesses rely on.
              </p>
            </TextReveal>
          </div>
          </ScrollFade>

          {/* Right: Stats with Count Up */}
          <ScrollFade direction="left" delay={0.2}>
            <div className="grid grid-cols-2 gap-6">
              <motion.div 
                className="glass rounded-2xl p-6 hover-lift"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="text-h1 font-clash font-black gradient-text">
                  <Counter value={100} suffix="%" />
                </div>
                <div className="text-spaced-detail mt-2">Full-Stack Ready</div>
              </motion.div>
              
              <motion.div 
                className="glass rounded-2xl p-6 hover-lift"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="text-h1 font-clash font-black gradient-text">
                   <Counter value={15} suffix="+" />
                </div>
                <div className="text-spaced-detail mt-2">Apps Built</div>
              </motion.div>
              
              <motion.div 
                className="glass rounded-2xl p-6 hover-lift"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="text-h1 font-clash font-black gradient-text">
                   <Counter value={8} suffix="+" />
                </div>
                <div className="text-spaced-detail mt-2">Developers Mentored</div>
              </motion.div>
              
              <motion.div 
                className="glass rounded-2xl p-6 hover-lift"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="text-h1 font-clash font-black gradient-text">
                   <Counter value={4} suffix="+" />
                </div>
                <div className="text-spaced-detail mt-2">Years Experience</div>
              </motion.div>
            </div>
          </ScrollFade>
        </div>
      </div>
    </section>
  );
}
