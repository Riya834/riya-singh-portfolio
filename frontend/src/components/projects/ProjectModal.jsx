import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Calendar, CheckCircle2 } from 'lucide-react';

export const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="glass-panel w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-brand-border/80 shadow-2xl p-6 sm:p-8 relative bg-brand-bg"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-xl bg-brand-card border border-brand-border text-brand-muted hover:text-white hover:border-brand-electric transition-all"
            aria-label="Close Project Details Modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Content Header */}
          <div className="flex flex-col gap-3 mb-6 pr-12">
            <span className="font-mono text-xs text-brand-electric uppercase tracking-widest font-semibold">
              FEATURED PROJECT breakdown
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-white">
              {project.title}
            </h2>
            {project.subtitle && (
              <p className="font-mono text-xs text-brand-muted">{project.subtitle}</p>
            )}
          </div>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies && project.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-lg bg-brand-card border border-brand-border text-xs font-mono text-brand-electric"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Description & Details */}
          <div className="space-y-4 mb-6 text-sm text-brand-muted leading-relaxed">
            <p className="text-brand-paper text-base leading-relaxed">
              {project.longDescription || project.description}
            </p>

            {project.highlights && project.highlights.length > 0 && (
              <div className="pt-4 border-t border-brand-border/60">
                <h4 className="font-display font-bold text-xs uppercase text-white tracking-wider mb-3">
                  Key Technical Accomplishments:
                </h4>
                <div className="space-y-2">
                  {project.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-brand-electric shrink-0 mt-0.5" />
                      <span className="text-xs text-brand-paper">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-brand-border/60">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-brand-electric hover:bg-brand-electricHover text-white font-medium text-xs tracking-wide shadow-electric flex items-center gap-2 transition-all"
              >
                <span>View Live Application</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-brand-card border border-brand-border hover:border-brand-electric text-white font-medium text-xs tracking-wide flex items-center gap-2 transition-all"
              >
                <Github className="w-4 h-4 text-brand-electric" />
                <span>View Source Code</span>
              </a>
            )}
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectModal;
