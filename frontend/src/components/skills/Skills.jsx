import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Database, BarChart2, Layers, Globe, Wrench, Terminal, Cpu, FileCode, Binary, Filter, PieChart, Server, Flame, HardDrive, Box, GitGraph, GitBranch, Github, Layout, Send } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

// Icon Map helper
const iconMap = {
  Code,
  Database,
  Cpu,
  FileCode,
  Terminal,
  BarChart2,
  Binary,
  Filter,
  PieChart,
  Server,
  Flame,
  HardDrive,
  Box,
  Layers,
  GitGraph,
  Globe,
  Zap: Globe,
  GitBranch,
  Github,
  Layout,
  Send
};

export const Skills = () => {
  const { skills: apiSkills } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState('ALL');

  // Fallback resume skills if API skills loading
  const defaultSkills = [
    // Programming
    { category: 'Programming', name: 'Python', icon: 'Code', description: 'Data structures, backend scripts, and data manipulation.' },
    { category: 'Programming', name: 'SQL', icon: 'Database', description: 'Relational data query design and optimization.' },
    { category: 'Programming', name: 'Java', icon: 'Cpu', description: 'Object-oriented programming and core algorithms.' },
    { category: 'Programming', name: 'JavaScript', icon: 'FileCode', description: 'ES6+, async/await, DOM manipulation, functional JS.' },
    { category: 'Programming', name: 'C++', icon: 'Terminal', description: 'System level programming and memory logic.' },

    // Data Analysis
    { category: 'Data Analysis', name: 'Pandas', icon: 'BarChart2', description: 'Data transformation, grouping, and aggregation.' },
    { category: 'Data Analysis', name: 'NumPy', icon: 'Binary', description: 'Numerical computations and matrix operations.' },
    { category: 'Data Analysis', name: 'Data Cleaning', icon: 'Filter', description: 'Preprocessing datasets, handling nulls & outliers.' },
    { category: 'Data Analysis', name: 'Data Visualization', icon: 'PieChart', description: 'Chart plotting and exploratory data analysis.' },

    // Databases
    { category: 'Databases', name: 'MySQL', icon: 'Database', description: 'Relational tables, joins, indexes, and transactions.' },
    { category: 'Databases', name: 'MongoDB', icon: 'Server', description: 'NoSQL document schemas, Mongoose aggregation pipelines.' },
    { category: 'Databases', name: 'Firebase', icon: 'Flame', description: 'Real-time database, auth, and cloud hosting.' },
    { category: 'Databases', name: 'NoSQL', icon: 'HardDrive', description: 'Key-value and document data architecture.' },

    // Core Concepts
    { category: 'Core Concepts', name: 'OOPs', icon: 'Box', description: 'Encapsulation, inheritance, polymorphism, abstraction.' },
    { category: 'Core Concepts', name: 'DBMS', icon: 'Layers', description: 'Database management systems, ACID properties, normalization.' },
    { category: 'Core Concepts', name: 'Data Structures', icon: 'GitGraph', description: 'Arrays, Trees, Graphs, Stacks, Queues, Sorting.' },
    { category: 'Core Concepts', name: 'Operating Systems', icon: 'Cpu', description: 'Process scheduling, concurrency, memory management.' },

    // Frameworks
    { category: 'Frameworks', name: 'React.js', icon: 'Globe', description: 'Component hooks, state management, SPA architecture, Framer Motion.' },
    { category: 'Frameworks', name: 'Node.js', icon: 'Server', description: 'Async server-side JavaScript runtime and event loop.' },
    { category: 'Frameworks', name: 'Express.js', icon: 'Globe', description: 'RESTful API routing, middleware, JWT authorization.' },

    // Tools
    { category: 'Tools', name: 'Git', icon: 'GitBranch', description: 'Version control system, branching, and rebasing.' },
    { category: 'Tools', name: 'GitHub', icon: 'Github', description: 'Repository management, pull requests, collaboration.' },
    { category: 'Tools', name: 'VS Code', icon: 'Layout', description: 'Integrated development workspace, extensions & debugging.' },
    { category: 'Tools', name: 'Postman', icon: 'Send', description: 'API testing, documentation, and endpoint verification.' }
  ];

  const skills = apiSkills && apiSkills.length > 0 ? apiSkills : defaultSkills;

  const categories = ['ALL', 'Programming', 'Data Analysis', 'Databases', 'Core Concepts', 'Frameworks', 'Tools'];

  const filteredSkills = activeCategory === 'ALL'
    ? skills
    : skills.filter(s => s.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <section id="skills" className="relative py-24 px-4 sm:px-8 bg-brand-bg border-t border-brand-border/60">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-8 h-[2px] bg-brand-electric" />
              <span className="font-mono text-xs uppercase tracking-widest text-brand-electric font-semibold">
                // TECHNICAL CAPABILITIES
              </span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white uppercase tracking-tight">
              SKILLS & TECH STACK
            </h2>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl font-mono text-xs uppercase transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-brand-electric text-white shadow-electric font-bold'
                    : 'bg-brand-card text-brand-muted border border-brand-border hover:text-white hover:border-brand-border/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <AnimatePresence>
            {filteredSkills.map((skill, index) => {
              const IconComponent = iconMap[skill.icon] || Code;
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                  key={skill._id || skill.name}
                  className="glass-panel glass-panel-hover rounded-2xl p-5 border border-brand-border/80 flex flex-col justify-between group cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-electric/10 border border-brand-electric/30 flex items-center justify-center text-brand-electric group-hover:bg-brand-electric group-hover:text-white transition-colors">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-[10px] uppercase text-brand-electric bg-brand-electric/10 px-2 py-0.5 rounded-md border border-brand-electric/20">
                      {skill.category}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display font-bold text-base text-white group-hover:text-brand-electric transition-colors mb-1">
                      {skill.name}
                    </h3>
                    <p className="text-xs text-brand-muted leading-relaxed">
                      {skill.description || 'Core technical competency.'}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};

export default Skills;
