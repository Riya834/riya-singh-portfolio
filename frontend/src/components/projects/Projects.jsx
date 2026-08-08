import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight, CheckCircle2, Layers } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import ProjectModal from './ProjectModal';

export const Projects = () => {
  const { projects: apiProjects } = usePortfolio();
  const [selectedProject, setSelectedProject] = useState(null);

  const defaultProjects = [
    {
      title: 'Task Manager Web Application',
      slug: 'task-manager-web-application',
      subtitle: 'Workflow & Productivity Tracking Platform',
      description: 'A comprehensive workflow and productivity tracking platform built with React.js, Node.js, Express.js, and MongoDB. Features task management, workflow tracking, project progress metrics, and team productivity tools.',
      longDescription: 'Developed a workflow and productivity tracking platform designed to streamline task delegation and team tracking. Managed task-related data using databases and APIs, ensuring real-time state updates, status filtering, and role-based views. Built tracking features to monitor project progress and team productivity with quantitative reporting.',
      technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST API', 'Tailwind CSS', 'Framer Motion'],
      liveUrl: 'https://planiques.theuniques.in',
      githubUrl: 'https://github.com',
      startDate: 'Feb 2025',
      endDate: 'May 2025',
      featured: true,
      highlights: [
        'Developed a workflow and productivity tracking platform',
        'Managed task-related data using databases and APIs',
        'Built tracking features to monitor project progress and team productivity'
      ]
    }
  ];

  const projects = apiProjects && apiProjects.length > 0 ? apiProjects : defaultProjects;

  return (
    <section id="projects" className="relative py-24 px-4 sm:px-8 bg-brand-bg border-t border-brand-border/60">
      {/* Blueprint Grid */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col gap-2 mb-16">
          <div className="flex items-center gap-2">
            <span className="w-8 h-[2px] bg-brand-electric" />
            <span className="font-mono text-xs uppercase tracking-widest text-brand-electric font-semibold">
              // FEATURED ENGINEERING
            </span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white uppercase tracking-tight">
            SELECTED PROJECTS
          </h2>
        </div>

        {/* Projects Stack */}
        <div className="space-y-12">
          {projects.map((project, index) => (
            <motion.div
              key={project._id || project.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="glass-panel glass-panel-hover rounded-3xl p-6 sm:p-10 border border-brand-border/80 relative overflow-hidden group"
            >
              {/* Background Numbering */}
              <div className="absolute top-4 right-8 font-mono text-7xl sm:text-9xl font-extrabold text-white/[0.03] pointer-events-none select-none">
                0{index + 1}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                
                {/* Project Metadata & Details */}
                <div className="lg:col-span-7 flex flex-col gap-5">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-brand-electric uppercase tracking-widest px-3 py-1 rounded-full bg-brand-electric/10 border border-brand-electric/30">
                      PROJECT // 0{index + 1}
                    </span>
                    {project.startDate && (
                      <span className="font-mono text-xs text-brand-muted">
                        {project.startDate} – {project.endDate}
                      </span>
                    )}
                  </div>

                  <h3 className="font-display font-extrabold text-2xl sm:text-4xl text-white group-hover:text-brand-electric transition-colors">
                    {project.title}
                  </h3>

                  {project.subtitle && (
                    <p className="font-mono text-xs text-brand-electric/90">{project.subtitle}</p>
                  )}

                  <p className="text-sm text-brand-muted leading-relaxed">
                    {project.description}
                  </p>

                  {/* Highlights list */}
                  {project.highlights && project.highlights.length > 0 && (
                    <div className="space-y-2 py-2">
                      {project.highlights.map((item, hIdx) => (
                        <div key={hIdx} className="flex items-start gap-2.5 text-xs text-brand-paper/90">
                          <CheckCircle2 className="w-4 h-4 text-brand-electric shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.technologies && project.technologies.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-3 py-1 rounded-lg bg-brand-card border border-brand-border text-xs font-mono text-brand-electric"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-4 pt-4">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 rounded-xl bg-brand-electric hover:bg-brand-electricHover text-white font-medium text-xs tracking-wide shadow-electric flex items-center gap-2 transition-all"
                      >
                        <span>View Live</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    )}

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 rounded-xl bg-brand-card border border-brand-border hover:border-brand-electric text-white font-medium text-xs tracking-wide flex items-center gap-2 transition-all"
                      >
                        <Github className="w-4 h-4 text-brand-electric" />
                        <span>View Code</span>
                      </a>
                    )}

                    <button
                      onClick={() => setSelectedProject(project)}
                      className="px-4 py-2.5 rounded-xl border border-brand-border text-brand-muted hover:text-white text-xs font-mono transition-colors"
                    >
                      Details →
                    </button>
                  </div>

                </div>

                {/* Right Visual Card Mockup */}
                <div className="lg:col-span-5 flex items-center justify-center">
                  <div className="w-full h-64 sm:h-72 rounded-2xl glass-panel border border-brand-border/80 p-4 relative overflow-hidden flex flex-col justify-between group-hover:border-brand-electric/40 transition-colors">
                    
                    {/* Top Bar Mockup */}
                    <div className="flex items-center justify-between pb-3 border-b border-brand-border/60">
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                        <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                        <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
                      </div>
                      <span className="font-mono text-[10px] text-brand-muted truncate max-w-[160px]">
                        {project.liveUrl ? project.liveUrl.replace('https://', '') : 'app.preview'}
                      </span>
                    </div>

                    {/* Preview Graphic Graphic */}
                    <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
                      <div className="w-12 h-12 rounded-2xl bg-brand-electric/20 border border-brand-electric/50 flex items-center justify-center text-brand-electric mb-3 shadow-electric">
                        <Layers className="w-6 h-6" />
                      </div>
                      <h4 className="font-display font-bold text-sm text-white">{project.title}</h4>
                      <p className="font-mono text-[10px] text-brand-electric uppercase mt-1">MERN Stack Productivity Engine</p>
                    </div>

                    {/* Bottom Status */}
                    <div className="pt-2 border-t border-brand-border/40 flex items-center justify-between text-[10px] font-mono text-brand-muted">
                      <span>STATUS: DEPLOYED</span>
                      <span className="text-emerald-400">ONLINE</span>
                    </div>

                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};

export default Projects;
