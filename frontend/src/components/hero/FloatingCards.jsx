import React from 'react';
import { motion } from 'framer-motion';
import { Code, Server, Database, Globe, Terminal, Shield, Sparkles, Layers, Cpu } from 'lucide-react';

export const FloatingTechBadge = ({ icon: Icon, label, status, className, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`absolute z-20 glass-panel shadow-card-glow rounded-2xl p-3 border border-brand-border/80 flex items-center gap-3 animate-float ${className}`}
    >
      <div className="w-8 h-8 rounded-xl bg-brand-electric/20 border border-brand-electric/50 flex items-center justify-center text-brand-electric">
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex flex-col">
        <span className="font-display font-bold text-xs text-white tracking-wide">{label}</span>
        {status && <span className="font-mono text-[9px] text-brand-electric tracking-widest uppercase">{status}</span>}
      </div>
    </motion.div>
  );
};

export const FloatingTerminalCard = ({ className, delay = 0.5 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay }}
      className={`absolute z-20 glass-panel rounded-2xl border border-brand-border p-3.5 shadow-2xl font-mono text-[11px] w-64 ${className}`}
    >
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-brand-border/60">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
        </div>
        <span className="text-[9px] text-brand-muted uppercase">bash ~ riya</span>
      </div>
      <div className="space-y-1 text-xs">
        <p className="text-brand-muted"><span className="text-brand-electric">$</span> npx build-app --stack MERN</p>
        <p className="text-emerald-400">✓ React.js + Node + MongoDB</p>
        <p className="text-brand-muted"><span className="text-brand-electric">$</span> status --availability</p>
        <p className="text-blue-400 font-bold">READY FOR NEW PROJECTS</p>
      </div>
    </motion.div>
  );
};

export const FloatingAPICard = ({ className }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.4 }}
      className={`absolute z-20 glass-panel rounded-2xl px-3.5 py-2.5 border border-brand-electric/30 flex items-center gap-2.5 shadow-electric ${className}`}
    >
      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
      <span className="font-mono text-[10px] font-bold text-white tracking-widest">
        REST API: <span className="text-emerald-400">200 OK</span>
      </span>
    </motion.div>
  );
};
