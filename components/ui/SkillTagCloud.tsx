'use client';

import { motion } from 'framer-motion';
import { Skill } from '@/lib/data';
import MagneticButton from '../animations/MagneticButton';

interface SkillTagCloudProps {
  skills: Skill[];
}

export default function SkillTagCloud({ skills }: SkillTagCloudProps) {
  return (
    <div className="flex flex-wrap gap-4 justify-center md:justify-start">
      {skills.map((skill, i) => (
        <MagneticButton key={skill.name} strength={0.05}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="px-5 py-2.5 rounded-full glass border border-white/5 hover:border-white/20 transition-all cursor-default group"
          >
            <span className="text-sm font-clash font-medium text-white/60 group-hover:text-white transition-colors tracking-tight">
              {skill.name}
            </span>
          </motion.div>
        </MagneticButton>
      ))}
    </div>
  );
}
