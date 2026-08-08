import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Download, Github, Linkedin, Mail, Sparkles, Code, Server, Database, Globe } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { FloatingTechBadge, FloatingTerminalCard, FloatingAPICard } from './FloatingCards';

export const Hero = () => {
  const { profile } = usePortfolio();

  return (
    <section className="relative min-h-screen pt-28 pb-16 px-4 sm:px-8 flex items-center justify-center overflow-hidden bg-brand-bg">
      {/* Editorial Grid Background */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-electric/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Blueprint Technical Coordinate Annotations */}
      <div className="absolute top-32 left-8 font-mono text-[10px] text-brand-muted/60 hidden xl:block">
        POS: [00:48:12] // ARCHITECTURE: MERN
      </div>
      <div className="absolute top-32 right-8 font-mono text-[10px] text-brand-muted/60 hidden xl:block">
        STATUS: SYSTEM_ONLINE // SECURE_JWT
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* LEFT COLUMN: Large Typography & Copy */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col gap-6"
        >
          {/* Availability Status Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-card/90 border border-brand-border text-xs font-mono text-brand-paper w-max shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-semibold tracking-wider text-brand-muted">
              AVAILABLE FOR OPPORTUNITIES
            </span>
          </div>

          {/* Eyebrow Label */}
          <p className="font-mono text-xs uppercase tracking-widest text-brand-electric font-bold">
            {profile?.eyebrow || 'FULL-STACK DEVELOPER × UI/UX'}
          </p>

          {/* Large Headline */}
          <div className="relative">
            <h1 className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl leading-[1.02] tracking-tight text-white uppercase">
              BUILDING <br />
              DIGITAL <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-brand-paper to-brand-electric">
                EXPERIENCES.
              </span>
            </h1>
          </div>

          {/* Identity & Subtitle */}
          <div className="space-y-2 border-l-2 border-brand-electric/80 pl-4">
            <h2 className="font-display text-lg font-bold text-white tracking-wide">
              {profile?.name || 'Riya Singh'}
            </h2>
            <p className="text-xs font-mono text-brand-muted uppercase tracking-wider">
              {profile?.title || 'Full-Stack Developer | Software Developer | UI/UX Developer'}
            </p>
          </div>

          {/* Short Bio Description */}
          <p className="text-sm sm:text-base text-brand-muted leading-relaxed max-w-xl">
            {profile?.tagline || 'Computer Science engineer building scalable web applications, data-driven products and intuitive digital experiences.'}
          </p>

          {/* Interactive Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-3">
            <a
              href="#projects"
              className="px-6 py-3.5 rounded-xl bg-brand-electric hover:bg-brand-electricHover text-white font-medium text-xs tracking-wide shadow-electric hover:shadow-electric-lg flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
            >
              <span>View My Work</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <a
              href="#contact"
              className="px-6 py-3.5 rounded-xl bg-brand-card hover:bg-brand-cardHover border border-brand-border hover:border-brand-electric/50 text-white font-medium text-xs tracking-wide flex items-center gap-2 transition-all"
            >
              <span>Let's Connect</span>
            </a>

            <a
              href={profile?.resumeUrl || '/resume.pdf'}
              download="Riya_Singh_Resume.pdf"
              className="px-5 py-3.5 rounded-xl border border-brand-border/80 hover:border-white text-brand-muted hover:text-white text-xs font-mono flex items-center gap-2 transition-all"
            >
              <Download className="w-4 h-4 text-brand-electric" />
              <span>Resume (PDF)</span>
            </a>
          </div>

          {/* Quick Social Links */}
          <div className="flex items-center gap-4 pt-2 text-xs text-brand-muted font-mono">
            <span className="text-[10px] tracking-widest text-brand-muted uppercase">CONNECT:</span>
            <a
              href={profile?.socialLinks?.github || 'https://github.com/Riya834'}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-electric transition-colors flex items-center gap-1"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <span>/</span>
            <a
              href={profile?.socialLinks?.linkedin || 'https://www.linkedin.com/in/riya-singh-5b71b7248/?skipRedirect=true'}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-electric transition-colors flex items-center gap-1"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
            <span>/</span>
            <a
              href={`mailto:${profile?.email || 'riyarssingh22@gmail.com'}`}
              className="hover:text-brand-electric transition-colors flex items-center gap-1"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email</span>
            </a>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: Visual Composition & Portrait Cutout */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="lg:col-span-5 relative flex items-center justify-center min-h-[440px] sm:min-h-[520px]"
        >
          {/* Main Cutout Frame with Portrait Image */}
          <div className="relative w-72 sm:w-80 h-[380px] sm:h-[460px] rounded-3xl bg-brand-card border-2 border-brand-border/80 shadow-2xl overflow-hidden p-2 group">
            
            {/* Glowing Accent Ring */}
            <div className="absolute inset-0 bg-gradient-to-b from-brand-electric/20 via-transparent to-brand-electric/30 opacity-70 group-hover:opacity-100 transition-opacity" />

            {/* High-Visibility Script Accent Badge inside photo */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="absolute top-4 left-4 right-4 z-30 glass-panel rounded-xl px-4 py-2 border border-brand-electric/50 flex items-center justify-between shadow-electric bg-brand-bg/85 backdrop-blur-md"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-electric animate-pulse" />
                <span className="font-script text-xl sm:text-2xl text-white font-bold tracking-wide">
                  {profile?.scriptAccent || 'Creative Engineer'}
                </span>
              </div>
              <span className="font-mono text-[9px] text-brand-electric font-semibold uppercase tracking-widest px-2 py-0.5 rounded bg-brand-electric/20 border border-brand-electric/40">
                ROLE
              </span>
            </motion.div>

            {/* Profile Image */}
            <img
              src={profile?.profileImage || '/riya-profile.jpg'}
              alt={profile?.name || 'Riya Singh'}
              className="w-full h-full object-cover object-top rounded-2xl filter grayscale contrast-105 group-hover:grayscale-0 transition-all duration-700"
            />

            {/* Bottom Overlay Box under Creative Engineer inside photo */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="absolute bottom-4 left-4 right-4 z-30 glass-panel rounded-xl p-3.5 border border-brand-electric/50 shadow-electric bg-brand-bg/90 backdrop-blur-md flex items-center justify-between"
            >
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-2">
                  <p className="font-display font-extrabold text-xs text-white tracking-wider">RIYA SINGH</p>
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-electric" />
                  <span className="font-mono text-[9px] text-brand-electric font-semibold uppercase tracking-widest">
                    FULL-STACK
                  </span>
                </div>
                <p className="font-mono text-[10px] text-brand-muted font-medium">
                  B.TECH CSE '26 // SVIET PUNJAB
                </p>
              </div>
              <div className="flex items-center gap-1.5 bg-emerald-500/10 px-2 py-1 rounded-md border border-emerald-500/30">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-mono text-[9px] font-bold text-emerald-400 uppercase tracking-widest">ONLINE</span>
              </div>
            </motion.div>
          </div>

          {/* Floating UI Panels & Tech Badges with Clean Spacing */}
          <FloatingTechBadge
            icon={Code}
            label="React.js"
            status="FRONTEND"
            className="-top-8 -left-6 sm:-left-12 z-20"
            delay={0.3}
          />

          <FloatingTechBadge
            icon={Server}
            label="Node & Express"
            status="BACKEND API"
            className="top-1/2 -right-6 sm:-right-12 z-20"
            delay={0.5}
          />

          <FloatingTechBadge
            icon={Database}
            label="MongoDB"
            status="DATABASE"
            className="-bottom-8 left-6 z-20"
            delay={0.7}
          />

          <FloatingAPICard className="bottom-6 -right-4 sm:-right-10 hidden sm:flex z-20" />

          <FloatingTerminalCard className="top-14 -right-10 xl:-right-24 hidden xl:block z-10" delay={0.9} />

        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
