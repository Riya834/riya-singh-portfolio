import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Award, Users, BookOpen, Terminal, Sparkles } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const About = () => {
  const { profile } = usePortfolio();

  const defaultStats = [
    { label: 'CGPA SCORE', value: '8.8 / 10', subtitle: 'Academic Distinction' },
    { label: 'WORKSHOPS LED', value: '30+', subtitle: 'Techlearns Academy' },
    { label: 'STUDENTS IMPACTED', value: '500+', subtitle: 'Community Outreach' },
    { label: 'FULL-STACK STACK', value: 'MERN', subtitle: 'React, Node, Mongo' }
  ];

  const stats = profile?.stats && profile.stats.length > 0 ? profile.stats : defaultStats;

  return (
    <section id="about" className="relative py-24 px-4 sm:px-8 bg-brand-bg/95 border-t border-brand-border/60">
      {/* Background blueprint grid */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col gap-2 mb-16">
          <div className="flex items-center gap-2">
            <span className="w-8 h-[2px] bg-brand-electric" />
            <span className="font-mono text-xs uppercase tracking-widest text-brand-electric font-semibold">
              // ABOUT RIYA SINGH
            </span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white uppercase tracking-tight max-w-2xl">
            {profile?.aboutTitle || 'ENGINEER. DESIGNER. PROBLEM SOLVER.'}
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Editorial Story & Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            <div className="glass-panel rounded-3xl p-8 border border-brand-border/80 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 text-brand-electric/10 font-mono text-7xl font-bold select-none pointer-events-none">
                01
              </div>

              <h3 className="font-display font-bold text-xl text-white mb-4">
                Computer Science & Full-Stack Engineering
              </h3>

              <p className="text-sm sm:text-base text-brand-muted leading-relaxed mb-6">
                {profile?.bio ||
                  'Final-year B.Tech Computer Science student with strong skills in software development, full-stack web development, and problem-solving. Proficient in Java, Python, SQL, JavaScript, React.js, Node.js, Express.js, and MongoDB, with hands-on experience building scalable and efficient web applications.'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-brand-border/60">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-electric shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-display font-semibold text-xs text-white uppercase">Full-Stack Development</h4>
                    <p className="text-xs text-brand-muted">MERN Stack, RESTful APIs & database optimization.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-electric shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-display font-semibold text-xs text-white uppercase">UI/UX Craftsmanship</h4>
                    <p className="text-xs text-brand-muted">Intuitive component design & responsive web layouts.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-electric shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-display font-semibold text-xs text-white uppercase">Data & Algorithms</h4>
                    <p className="text-xs text-brand-muted">Python, Pandas, Data Cleaning, and Core CS Fundamentals.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-electric shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-display font-semibold text-xs text-white uppercase">Technical Leadership</h4>
                    <p className="text-xs text-brand-muted">TEDx head & 30+ community workshops conductor.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Animated Key Statistics Area */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-panel glass-panel-hover rounded-2xl p-6 border border-brand-border/80 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[10px] text-brand-electric uppercase tracking-widest">
                    STAT // 0{idx + 1}
                  </span>
                  <Sparkles className="w-4 h-4 text-brand-electric/60" />
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight mb-1">
                    {stat.value}
                  </h3>
                  <p className="font-display font-bold text-xs text-brand-paper uppercase tracking-wider">
                    {stat.label}
                  </p>
                  <p className="text-[11px] text-brand-muted mt-1 font-mono">
                    {stat.subtitle || stat.description || ''}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
