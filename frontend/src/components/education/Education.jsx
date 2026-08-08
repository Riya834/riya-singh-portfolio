import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const Education = () => {
  const { education: apiEducation } = usePortfolio();

  const defaultEducation = [
    {
      institution: 'Swami Vivekanand Institute of Engineering & Technology',
      degree: 'B.Tech in Computer Science and Engineering',
      year: '2026',
      score: 'CGPA: 8.8 / 10',
      location: 'Punjab',
      description: 'Final-year Computer Science engineering student focusing on software development, full-stack web architecture, database design, and algorithmic problem solving.'
    },
    {
      institution: 'D.A.V Public School',
      degree: 'Class XII (Senior Secondary)',
      year: '2022',
      score: '93.2%',
      location: 'Jharkhand',
      description: 'Completed higher secondary education in Science stream with distinction in Mathematics and Computer Science.'
    },
    {
      institution: 'D.A.V Public School',
      degree: 'Class X (Secondary)',
      year: '2020',
      score: '95%',
      location: 'Jharkhand',
      description: 'Graduated with high distinction across all core academic subjects.'
    }
  ];

  const edList = apiEducation && apiEducation.length > 0 ? apiEducation : defaultEducation;

  return (
    <section id="education" className="relative py-24 px-4 sm:px-8 bg-brand-bg border-t border-brand-border/60">
      {/* Blueprint Grid */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col gap-2 mb-16">
          <div className="flex items-center gap-2">
            <span className="w-8 h-[2px] bg-brand-electric" />
            <span className="font-mono text-xs uppercase tracking-widest text-brand-electric font-semibold">
              // ACADEMIC BACKGROUND
            </span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white uppercase tracking-tight">
            EDUCATION & QUALIFICATIONS
          </h2>
        </div>

        {/* Education Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {edList.map((item, index) => (
            <motion.div
              key={item._id || item.degree}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="glass-panel glass-panel-hover rounded-3xl p-6 sm:p-8 border border-brand-border/80 flex flex-col justify-between relative overflow-hidden group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-electric/10 border border-brand-electric/30 flex items-center justify-center text-brand-electric">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-brand-electric/20 text-brand-electric font-mono text-xs font-bold border border-brand-electric/40">
                    {item.score}
                  </span>
                </div>

                <span className="font-mono text-xs text-brand-electric uppercase tracking-widest block mb-1">
                  {item.institution}
                </span>

                <h3 className="font-display font-bold text-lg text-white mb-3">
                  {item.degree}
                </h3>

                <p className="text-xs text-brand-muted leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-brand-border/60 flex items-center justify-between text-xs font-mono text-brand-muted">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-brand-electric" />
                  {item.year}
                </span>
                {item.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-brand-electric" />
                    {item.location}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Education;
