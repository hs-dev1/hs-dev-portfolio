'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ContactForm from '../ui/ContactForm';
import MagneticButton from '../animations/MagneticButton';
import TextReveal from '../animations/TextReveal';
import { socialLinks } from '@/lib/data';
import { Icons } from '../ui/Icons';

export default function Contact() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    setTime(new Date().toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit', timeZoneName:'short'}));
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit', timeZoneName:'short'}));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <section id="contact" className="relative min-h-screen bg-primary-black py-32 overflow-hidden flex flex-col justify-between">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-primary-electricBlue/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-primary-vividPurple/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 flex-grow flex flex-col justify-center">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column - Typography */}
          <div className="space-y-12">
            <TextReveal>
              <h2 className="text-display font-display font-black leading-[0.9] text-white tracking-tighter">
                LET&apos;S <br />
                <span className="text-gradient-brand">BUILD</span> <br />
                SOMETHING <br />
                <span className="text-stroke-cyan opacity-80">AMAZING</span>
              </h2>
            </TextReveal>
            
            <motion.p 
              className="text-xl text-white/60 max-w-md font-light"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              Have an idea? I am currently available for freelance projects and open to full-time opportunities.
            </motion.p>

            {/* Social Links */}
            <motion.div 
               className="flex gap-4 flex-wrap"
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               viewport={{ once: true }}
               transition={{ delay: 0.7 }}
            >
               {socialLinks.map((social) => (
                   <MagneticButton key={social.platform}>
                       <a 
                         href={social.url}
                         target="_blank"
                         rel="noopener noreferrer"
                         className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center bg-white/5 backdrop-blur-sm hover:bg-white hover:text-black transition-all duration-300 group"
                         aria-label={social.platform}
                       >
                           {/* SVG Icon */}
                           <span className="text-2xl group-hover:scale-125 transition-transform duration-300">
                               {social.platform === 'GitHub' && <Icons.GitHub className="w-6 h-6" />}
                               {social.platform === 'LinkedIn' && <Icons.LinkedIn className="w-6 h-6" />}
                               {social.platform === 'Email' && <Icons.Email className="w-6 h-6" />}
                               {social.platform === 'Medium' && <Icons.Medium className="w-6 h-6" />}
                           </span>
                       </a>
                   </MagneticButton>
               ))}
            </motion.div>
          </div>

          {/* Right Column - Form */}
          <motion.div
             initial={{ opacity: 0, x: 50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8, delay: 0.3 }}
             className="bg-white/5 backdrop-blur-xl p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl"
          >
              <h3 className="text-2xl font-bold text-white mb-8">Send me a message</h3>
              <ContactForm />
          </motion.div>

        </div>
      </div>

      {/* Footer */}
      <footer className="w-full text-center py-8 mt-12 relative z-10">
         <div className="h-px w-full max-w-7xl mx-auto bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />
         <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-6 text-sm text-white/40"
         >
            <p>&copy; {currentYear} Muhammad Hussnain. All rights reserved.</p>
            <div className="flex gap-8 mt-4 md:mt-0">
               <span>Local Time: {time}</span>
               <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-primary-electricBlue transition-colors">
                   Back to Top ↑
               </button>
            </div>
         </motion.div>
      </footer>
    </section>
  );
}
