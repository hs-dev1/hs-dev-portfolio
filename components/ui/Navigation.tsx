'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Logo from '@/components/ui/Logo';

const navItems = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const scrollPosition = window.scrollY + window.innerHeight / 3;

      const current = navItems.find((item) => {
        const section = document.getElementById(item.href.replace('#', ''));
        if (section) {
            const { offsetTop, offsetHeight } = section;
            return scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight;
        }
        return false;
      });

      if (current) {
        setActiveSection(current.href.replace('#', ''));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(href.replace('#', ''));
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? 'glass-strong border-b border-white/10' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#hero');
            }}
            className="no-underline"
            style={{ textDecoration: 'none' }}
          >
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className={`relative text-sm font-medium transition-colors no-underline ${
                  activeSection === item.href.replace('#', '')
                    ? 'text-primary-cyan'
                    : 'text-white/70 hover:text-white'
                }`}
                style={{ textDecoration: 'none' }}
              >
                {item.name}
                {activeSection === item.href.replace('#', '') && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-cyan"
                    layoutId="activeSection"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <motion.span
                className="w-full h-0.5 bg-white block"
                animate={{ rotate: isMobileMenuOpen ? 45 : 0, y: isMobileMenuOpen ? 8 : 0 }}
              />
              <motion.span
                className="w-full h-0.5 bg-white block"
                animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
              />
              <motion.span
                className="w-full h-0.5 bg-white block"
                animate={{ rotate: isMobileMenuOpen ? -45 : 0, y: isMobileMenuOpen ? -10 : 0 }}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden glass-strong border-t border-white/10"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 py-4 space-y-4">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={`block text-lg font-medium transition-colors no-underline ${
                    activeSection === item.href.replace('#', '')
                      ? 'text-primary-cyan'
                      : 'text-white/70'
                  }`}
                  style={{ textDecoration: 'none' }}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
