import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Shield } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Work', href: '#projects' },
    { name: 'UI/UX Designs', href: '#designs' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Education', href: '#education' },
    { name: 'Leadership', href: '#leadership' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 py-4 transition-all duration-300">
      <div
        className={`max-w-7xl mx-auto rounded-2xl transition-all duration-300 px-6 py-3.5 flex items-center justify-between ${
          scrolled
            ? 'glass-panel shadow-electric border-brand-border/60 bg-brand-bg/85'
            : 'bg-transparent border border-transparent'
        }`}
      >
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-brand-electric/10 border border-brand-electric/40 flex items-center justify-center font-display font-bold text-white group-hover:bg-brand-electric group-hover:shadow-electric transition-all duration-300">
            RS
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-base tracking-tight text-white group-hover:text-brand-electric transition-colors">
              RIYA SINGH
            </span>
            <span className="text-[10px] tracking-widest uppercase font-mono text-brand-muted">
              FULL-STACK × UI/UX
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-brand-card/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-brand-border/40">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-3.5 py-1.5 text-xs font-medium text-brand-muted hover:text-white hover:bg-white/5 rounded-full transition-all duration-200"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right CTA Button & Admin Link */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated && (
            <Link
              to="/admin"
              className="px-3 py-1.5 rounded-lg border border-brand-electric/40 bg-brand-electric/10 text-brand-electric hover:bg-brand-electric text-xs font-mono flex items-center gap-1.5 transition-all"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>CMS</span>
            </Link>
          )}

          <a
            href="#contact"
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-electric hover:bg-brand-electricHover text-white font-medium text-xs tracking-wide transition-all shadow-electric hover:shadow-electric-lg overflow-hidden"
          >
            <span>Let's Talk</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Mobile Hamburger Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl border border-brand-border bg-brand-card text-white hover:text-brand-electric transition-colors"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden mt-3 max-w-7xl mx-auto glass-panel rounded-2xl p-6 border border-brand-border flex flex-col gap-4 shadow-2xl"
          >
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 text-sm font-medium text-brand-paper hover:bg-brand-electric/10 hover:text-brand-electric rounded-xl transition-all"
                >
                  {link.name}
                </a>
              ))}
            </nav>
            <div className="pt-3 border-t border-brand-border flex flex-col gap-3">
              {isAuthenticated && (
                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-brand-electric/40 bg-brand-electric/10 text-brand-electric text-sm font-mono flex items-center justify-center gap-2"
                >
                  <Shield className="w-4 h-4" />
                  <span>Admin Dashboard</span>
                </Link>
              )}
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-xl bg-brand-electric text-white font-medium text-sm flex items-center justify-center gap-2 shadow-electric"
              >
                <span>Let's Talk</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
