'use client';

import { useEffect, Suspense } from 'react';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import LoadingScreen from '@/components/ui/LoadingScreen';
import dynamic from 'next/dynamic';
import Hero from '@/components/sections/Hero';

// Lazy load heavy sections
const About = dynamic(() => import('@/components/sections/About'), { ssr: true });
const Experience = dynamic(() => import('@/components/sections/Experience'), { ssr: true });
const Skills = dynamic(() => import('@/components/sections/Skills'), { ssr: true });
const Projects = dynamic(() => import('@/components/sections/Projects'), { ssr: true });
const OpenSource = dynamic(() => import('@/components/sections/OpenSource'), { ssr: true });
const Contact = dynamic(() => import('@/components/sections/Contact'), { ssr: true });

export default function Home() {
  // Initialize smooth scroll
  useSmoothScroll();

  // Hide default cursor
  useEffect(() => {
    document.body.style.cursor = 'none';
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <main className="min-h-screen bg-primary-black text-white selection:bg-primary-cyan selection:text-primary-black">
      <LoadingScreen />
      <Hero />
      <Suspense fallback={<div className="h-screen bg-primary-black" />}>
        <About />
        <Experience />
        <Skills />
        <Projects />
        <OpenSource />
        <Contact />
      </Suspense>
    </main>
  );
}
