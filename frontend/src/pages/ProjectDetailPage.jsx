import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { portfolioAPI } from '../services/api';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import CustomCursor from '../components/common/CustomCursor';
import { ArrowLeft, ExternalLink, Github, CheckCircle2, Calendar, Layers } from 'lucide-react';

export const ProjectDetailPage = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await portfolioAPI.getProjectBySlug(slug);
        if (res.success) setProject(res.data);
      } catch (err) {
        console.error('Fetch project error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-bg flex items-center justify-center font-mono text-xs text-brand-electric">
        Loading Project Breakdown...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-brand-bg flex flex-col items-center justify-center gap-4 text-center p-4">
        <h2 className="font-display font-bold text-2xl text-white">Project Not Found</h2>
        <Link to="/" className="px-5 py-2.5 rounded-xl bg-brand-electric text-white text-xs font-mono">
          Return to Portfolio
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-bg text-brand-paper relative">
      <CustomCursor />
      <Navbar />

      <main className="pt-32 pb-24 px-4 sm:px-8 max-w-5xl mx-auto">
        <Link
          to="/#projects"
          className="inline-flex items-center gap-2 font-mono text-xs text-brand-muted hover:text-white mb-8"
        >
          <ArrowLeft className="w-4 h-4 text-brand-electric" />
          <span>Back to Selected Work</span>
        </Link>

        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-brand-border/80 shadow-2xl space-y-8">
          <div>
            <span className="font-mono text-xs text-brand-electric uppercase tracking-widest block mb-2">
              PROJECT BREAKDOWN
            </span>
            <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white">
              {project.title}
            </h1>
            {project.subtitle && (
              <p className="font-mono text-sm text-brand-muted mt-2">{project.subtitle}</p>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {project.technologies && project.technologies.map((tech, idx) => (
              <span key={idx} className="px-3.5 py-1.5 rounded-xl bg-brand-card border border-brand-border text-xs font-mono text-brand-electric">
                {tech}
              </span>
            ))}
          </div>

          <div className="text-base text-brand-muted leading-relaxed space-y-4 pt-4 border-t border-brand-border/60">
            <p className="text-brand-paper text-lg font-medium">{project.description}</p>
            <p>{project.longDescription}</p>
          </div>

          {project.highlights && project.highlights.length > 0 && (
            <div className="pt-6 border-t border-brand-border/60 space-y-3">
              <h3 className="font-display font-bold text-sm text-white uppercase tracking-wider">Key Project Highlights</h3>
              <div className="space-y-2">
                {project.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-brand-paper">
                    <CheckCircle2 className="w-4 h-4 text-brand-electric shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-4 pt-6 border-t border-brand-border/60">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-brand-electric text-white text-xs font-mono font-bold flex items-center gap-2 shadow-electric"
              >
                <span>Live Application</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-brand-card border border-brand-border text-white text-xs font-mono font-bold flex items-center gap-2"
              >
                <Github className="w-4 h-4 text-brand-electric" />
                <span>Source Code</span>
              </a>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectDetailPage;
