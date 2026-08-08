import React from 'react';
import { Github, Linkedin, Mail, ArrowUpRight, Heart, Code2 } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const Footer = () => {
  const { profile } = usePortfolio();

  return (
    <footer className="relative bg-brand-bg border-t border-brand-border pt-16 pb-12 px-6 sm:px-12 overflow-hidden">
      {/* Background blueprint lines */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-brand-border/60">
          
          {/* Brand Col */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-electric/10 border border-brand-electric/40 flex items-center justify-center font-display font-bold text-white text-lg shadow-electric">
                RS
              </div>
              <div>
                <h3 className="font-display font-bold text-xl tracking-tight text-white">RIYA SINGH</h3>
                <p className="text-xs font-mono text-brand-muted uppercase tracking-widest">Full-Stack Developer × UI/UX</p>
              </div>
            </div>
            <p className="text-sm text-brand-muted max-w-sm leading-relaxed">
              {profile?.tagline || 'Computer Science engineer building scalable web applications, data-driven products and intuitive digital experiences.'}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={profile?.socialLinks?.github || 'https://github.com/Riya834'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-brand-card border border-brand-border flex items-center justify-center text-brand-muted hover:text-white hover:border-brand-electric hover:bg-brand-electric/10 transition-all"
                aria-label="GitHub Profile"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={profile?.socialLinks?.linkedin || 'https://www.linkedin.com/in/riya-singh-5b71b7248/?skipRedirect=true'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-brand-card border border-brand-border flex items-center justify-center text-brand-muted hover:text-white hover:border-brand-electric hover:bg-brand-electric/10 transition-all"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${profile?.email || 'riyarssingh22@gmail.com'}`}
                className="w-10 h-10 rounded-xl bg-brand-card border border-brand-border flex items-center justify-center text-brand-muted hover:text-white hover:border-brand-electric hover:bg-brand-electric/10 transition-all"
                aria-label="Send Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links Col */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-brand-electric font-semibold">Navigation</h4>
            <div className="flex flex-col gap-2 font-medium text-sm text-brand-muted">
              <a href="#projects" className="hover:text-white transition-colors">Featured Work</a>
              <a href="#about" className="hover:text-white transition-colors">About Riya</a>
              <a href="#skills" className="hover:text-white transition-colors">Technical Stack</a>
              <a href="#experience" className="hover:text-white transition-colors">Work Experience</a>
              <a href="#leadership" className="hover:text-white transition-colors">Beyond Code</a>
              <a href="#education" className="hover:text-white transition-colors">Education & Credentials</a>
            </div>
          </div>

          {/* Contact Details Col */}
          <div className="md:col-span-4 flex flex-col gap-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-brand-electric font-semibold">Direct Contact</h4>
            <p className="text-sm text-brand-muted">
              Email: <a href="mailto:riyarssingh22@gmail.com" className="text-white hover:text-brand-electric underline underline-offset-4">riyarssingh22@gmail.com</a>
            </p>
            <p className="text-sm text-brand-muted">
              Phone: <a href="tel:+918340154678" className="text-white hover:text-brand-electric">+91 8340154678</a>
            </p>
            <p className="text-sm text-brand-muted">
              Location: Punjab / Jharkhand, India
            </p>
            <div className="pt-2">
              <a
                href={profile?.resumeUrl || '/resume.pdf'}
                download="Riya_Singh_Resume.pdf"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-card border border-brand-border text-xs font-mono font-medium text-white hover:border-brand-electric hover:bg-brand-electric/10 transition-all"
              >
                <span>Download Resume (PDF)</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-brand-muted">
          <p>© {new Date().getFullYear()} Riya Singh. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span>Designed & engineered with curiosity</span>
            <Code2 className="w-3.5 h-3.5 text-brand-electric" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
