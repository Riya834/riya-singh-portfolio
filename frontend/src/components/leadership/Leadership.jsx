import React from 'react';
import { motion } from 'framer-motion';
import { Users, Award, BookOpen, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const Leadership = () => {
  const { leadership: apiLeadership } = usePortfolio();

  const defaultLeadership = [
    {
      role: 'Communication and Marketing Head',
      organization: 'TEDxSVIET',
      year: '2023 – Present',
      description: 'Managed promotions, engagement strategies, and sponsor coordination for university-wide TEDx event.',
      highlights: [
        'Managed promotions and digital campaign strategy',
        'Coordinated speaker outreach and sponsor partnerships',
        'Led cross-functional marketing team of 15+ student volunteers'
      ]
    },
    {
      role: 'Workshops and Seminars Lead',
      organization: 'Techlearns Academy',
      year: '2023 – 2024',
      description: 'Conducted 30+ workshops reaching 500+ students in rural areas, introducing coding fundamentals and digital literacy.',
      highlights: [
        'Conducted 30+ hands-on technical workshops',
        'Impacted 500+ students across rural institutions',
        'Curated learning materials for beginner programming'
      ]
    },
    {
      role: 'Core Member',
      organization: 'BharatTech Xperience Hackathon',
      year: '2024',
      description: 'Assisted in national hackathon event coordination and technical documentation.',
      highlights: [
        'Assisted in event coordination for 200+ hackathon participants',
        'Authored technical guidelines and documentation',
        'Managed judge scoring rubrics and submission verification'
      ]
    }
  ];

  const leadershipList = apiLeadership && apiLeadership.length > 0 ? apiLeadership : defaultLeadership;

  return (
    <section id="leadership" className="relative py-24 px-4 sm:px-8 bg-brand-bg/95 border-t border-brand-border/60">
      {/* Blueprint Grid */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col gap-2 mb-16">
          <div className="flex items-center gap-2">
            <span className="w-8 h-[2px] bg-brand-electric" />
            <span className="font-mono text-xs uppercase tracking-widest text-brand-electric font-semibold">
              // COMMUNITY & IMPACT
            </span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white uppercase tracking-tight">
            BEYOND CODE
          </h2>
        </div>

        {/* Editorial Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {leadershipList.map((item, index) => (
            <motion.div
              key={item._id || item.organization}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="glass-panel glass-panel-hover rounded-3xl p-6 sm:p-8 border border-brand-border/80 flex flex-col justify-between relative overflow-hidden group"
            >
              {/* Card Number */}
              <div className="absolute top-4 right-6 font-mono text-5xl font-extrabold text-white/[0.04] pointer-events-none select-none">
                0{index + 1}
              </div>

              <div>
                <div className="w-12 h-12 rounded-2xl bg-brand-electric/10 border border-brand-electric/30 flex items-center justify-center text-brand-electric mb-6 group-hover:bg-brand-electric group-hover:text-white transition-colors">
                  {index === 0 ? <Users className="w-6 h-6" /> : index === 1 ? <BookOpen className="w-6 h-6" /> : <Award className="w-6 h-6" />}
                </div>

                <span className="font-mono text-xs text-brand-electric uppercase tracking-widest block mb-1">
                  {item.organization}
                </span>

                <h3 className="font-display font-bold text-xl text-white mb-3">
                  {item.role}
                </h3>

                <p className="text-xs text-brand-muted leading-relaxed mb-4">
                  {item.description}
                </p>

                {item.highlights && item.highlights.length > 0 && (
                  <div className="space-y-2 pt-3 border-t border-brand-border/60">
                    {item.highlights.map((h, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2 text-xs text-brand-paper/90">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-electric shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-6 font-mono text-[10px] text-brand-muted uppercase tracking-widest border-t border-brand-border/40 flex items-center justify-between">
                <span>LEADERSHIP</span>
                <span>{item.year || '2023 - 2025'}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Leadership;
