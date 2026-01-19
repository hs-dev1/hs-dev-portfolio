'use client';

import { motion } from 'framer-motion';
import ScrollFade from '../animations/ScrollFade';
import { openSourcePackages } from '@/lib/data';

export default function OpenSource() {
  return (
    <section id="opensource" className="py-24 md:py-32 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Title */}
        <ScrollFade direction="up">
          <h2 className="text-h2 font-black mb-4 gradient-text">
            Open Source
          </h2>
          <p className="text-lg text-white/60 mb-16">
            Contributing to the Flutter community
          </p>
        </ScrollFade>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {openSourcePackages.map((pkg, index) => (
            <ScrollFade key={pkg.name} direction="up" delay={index * 0.2}>
              <motion.div
                className="glass-strong rounded-2xl p-8 hover-lift group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Package Icon */}
                <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <span className="text-3xl">📦</span>
                </div>

                {/* Package Name */}
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:gradient-text transition-all">
                  {pkg.name}
                </h3>

                {/* Description */}
                <p className="text-white/70 text-sm leading-relaxed mb-6">
                  {pkg.description}
                </p>

                {/* Stats */}
                {(pkg.downloads || pkg.likes) && (
                  <div className="flex gap-4 mb-6">
                    {pkg.downloads && (
                      <div className="flex items-center gap-2 text-sm text-white/60">
                        <span>⬇️</span>
                        <span>{pkg.downloads.toLocaleString()} downloads</span>
                      </div>
                    )}
                    {pkg.likes && (
                      <div className="flex items-center gap-2 text-sm text-white/60">
                        <span>👍</span>
                        <span>{pkg.likes} likes</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Links */}
                <div className="flex gap-3">
                  <a
                    href={pkg.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-primary-cyan/10 hover:bg-primary-cyan/20 border border-primary-cyan/30 rounded-lg text-sm font-medium text-primary-cyan transition-all flex items-center gap-2"
                  >
                    <span>📘</span> View on Pub.dev
                  </a>
                </div>

                {/* Hover Glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none glow-gradient" />
              </motion.div>
            </ScrollFade>
          ))}
        </div>
      </div>
    </section>
  );
}
