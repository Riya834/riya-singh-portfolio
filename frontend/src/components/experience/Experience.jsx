import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const Experience = () => {
  const { experience: apiExperience } = usePortfolio();

  const defaultExperience = [
    {
      company: 'Godigitify',
      position: 'Full Stack Developer | UI/UX Developer',
      location: 'Chandigarh, India',
      startDate: 'May 2024',
      endDate: 'Aug 2025',
      description: [
        'Developed data-driven applications using React.js, Node.js, Express.js, and MongoDB.',
        'Managed and organized application data through backend databases and APIs.',
        'Integrated REST APIs and improved system performance and reliability.'
      ],
      technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'UI/UX Design']
    },
    {
      company: 'Zepp Media',
      position: 'Frontend Developer',
      location: '',
      startDate: 'Nov 2023',
      endDate: 'Mar 2024',
      description: [
        'Worked with APIs and structured datasets for dynamic web applications.',
        'Improved frontend performance and optimized data rendering.',
        'Collaborated with backend teams for smooth data integration.'
      ],
      technologies: ['React.js', 'JavaScript', 'REST APIs', 'Data Rendering', 'CSS3']
    }
  ];

  const experienceList = apiExperience && apiExperience.length > 0 ? apiExperience : defaultExperience;

  return (
    <section id="experience" className="relative py-24 px-4 sm:px-8 bg-brand-bg/95 border-t border-brand-border/60">
      {/* Background Blueprint Grid */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="flex flex-col gap-2 mb-16">
          <div className="flex items-center gap-2">
            <span className="w-8 h-[2px] bg-brand-electric" />
            <span className="font-mono text-xs uppercase tracking-widest text-brand-electric font-semibold">
              // PROFESSIONAL CAREER
            </span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white uppercase tracking-tight">
            WORK EXPERIENCE
          </h2>
        </div>

        {/* Timeline Layout */}
        <div className="relative border-l-2 border-brand-border/80 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
          {experienceList.map((exp, index) => (
            <motion.div
              key={exp._id || idxKey(exp)}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              className="relative group"
            >
              {/* Timeline Node Pulsating Dot */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-brand-bg border-2 border-brand-electric group-hover:bg-brand-electric group-hover:scale-125 transition-all duration-300 shadow-electric" />

              {/* Card Container */}
              <div className="glass-panel glass-panel-hover rounded-3xl p-6 sm:p-8 border border-brand-border/80 relative">
                
                {/* Header Info */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 pb-4 border-b border-brand-border/60">
                  <div>
                    <span className="font-mono text-xs text-brand-electric uppercase tracking-widest font-semibold block mb-1">
                      {exp.company}
                    </span>
                    <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white">
                      {exp.position}
                    </h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-brand-muted">
                    <div className="flex items-center gap-1.5 bg-brand-card px-3 py-1.5 rounded-lg border border-brand-border">
                      <Calendar className="w-3.5 h-3.5 text-brand-electric" />
                      <span>{exp.startDate} – {exp.endDate}</span>
                    </div>
                    {exp.location && (
                      <div className="flex items-center gap-1.5 bg-brand-card px-3 py-1.5 rounded-lg border border-brand-border">
                        <MapPin className="w-3.5 h-3.5 text-brand-electric" />
                        <span>{exp.location}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Achievements & Bullet Points */}
                <ul className="space-y-3 mb-6">
                  {exp.description && exp.description.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-3 text-sm text-brand-muted leading-relaxed">
                      <ArrowRight className="w-4 h-4 text-brand-electric shrink-0 mt-1" />
                      <span className="text-brand-paper/90">{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Badges */}
                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-brand-border/40">
                    {exp.technologies.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-3 py-1 rounded-lg bg-brand-card border border-brand-border text-xs font-mono text-brand-electric"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

function idxKey(exp) {
  return `${exp.company}-${exp.position}`;
}

export default Experience;
