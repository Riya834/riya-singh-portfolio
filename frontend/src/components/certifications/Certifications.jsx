import React from 'react';
import { motion } from 'framer-motion';
import { Award, Trophy, CheckCircle2, Sparkles, ExternalLink } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const Certifications = () => {
  const { certifications: apiCertifications } = usePortfolio();

  const defaultCertifications = [
    {
      title: 'Microsoft Azure Community Day Ideathon',
      organization: 'Microsoft Azure Community',
      year: '2024',
      description: 'Recognized for innovative Cloud-based project idea and system architecture design during Azure Community Day.'
    },
    {
      title: '3rd Position – Project Display',
      organization: 'CGC Jhanjheri',
      year: '2023',
      description: 'Secured 3rd position in inter-college Project Display competition showcasing full-stack application development.'
    },
    {
      title: 'Internship at ISB',
      organization: 'Indian School of Business (ISB)',
      year: '2022',
      description: 'Completed academic internship program focusing on technology management and digital innovation.'
    }
  ];

  const certList = apiCertifications && apiCertifications.length > 0 ? apiCertifications : defaultCertifications;

  return (
    <section id="certifications" className="relative py-24 px-4 sm:px-8 bg-brand-bg/95 border-t border-brand-border/60">
      {/* Blueprint Grid */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col gap-2 mb-16">
          <div className="flex items-center gap-2">
            <span className="w-8 h-[2px] bg-brand-electric" />
            <span className="font-mono text-xs uppercase tracking-widest text-brand-electric font-semibold">
              // RECOGNITION & HONORS
            </span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white uppercase tracking-tight">
            CERTIFICATIONS & ACHIEVEMENTS
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {certList.map((item, index) => (
            <motion.div
              key={item._id || item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="glass-panel glass-panel-hover rounded-3xl p-6 sm:p-8 border border-brand-border/80 flex flex-col justify-between relative overflow-hidden group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-electric/10 border border-brand-electric/30 flex items-center justify-center text-brand-electric group-hover:bg-brand-electric group-hover:text-white transition-colors shadow-electric">
                    <Trophy className="w-6 h-6" />
                  </div>
                  <span className="font-mono text-xs text-brand-electric font-bold">
                    {item.year}
                  </span>
                </div>

                <span className="font-mono text-xs text-brand-muted uppercase tracking-widest block mb-1">
                  {item.organization}
                </span>

                <h3 className="font-display font-bold text-lg text-white mb-3 group-hover:text-brand-electric transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs text-brand-muted leading-relaxed">
                  {item.description}
                </p>
              </div>

              {item.credentialUrl && (
                <div className="pt-4 border-t border-brand-border/60">
                  <a
                    href={item.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-brand-electric hover:underline"
                  >
                    <span>Verify Credential</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Certifications;
