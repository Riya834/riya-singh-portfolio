import React from 'react';
import { LayoutDashboard, User, Code, Briefcase, FolderKanban, GraduationCap, Award, Users, Mail, Settings, LogOut, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const AdminSidebar = ({ activeTab, setActiveTab }) => {
  const { logout, admin } = useAuth();

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'profile', label: 'Profile & Bio', icon: User },
    { id: 'skills', label: 'Skills Stack', icon: Code },
    { id: 'experience', label: 'Work Experience', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: FolderKanban },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'certifications', label: 'Certifications', icon: Award },
    { id: 'leadership', label: 'Leadership', icon: Users },
    { id: 'messages', label: 'Contact Messages', icon: Mail },
    { id: 'settings', label: 'Site Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-brand-card border-r border-brand-border flex flex-col justify-between min-h-screen p-4 sticky top-0 h-screen">
      <div>
        {/* Header */}
        <div className="pb-6 mb-6 border-b border-brand-border/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-brand-electric/20 border border-brand-electric/50 flex items-center justify-center font-display font-bold text-brand-electric">
              CMS
            </div>
            <div>
              <h2 className="font-display font-bold text-sm text-white">RIYA CMS</h2>
              <p className="font-mono text-[10px] text-brand-electric">ADMIN DASHBOARD</p>
            </div>
          </div>
        </div>

        {/* Links */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-xs transition-all ${
                  isActive
                    ? 'bg-brand-electric text-white font-bold shadow-electric'
                    : 'text-brand-muted hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer / Actions */}
      <div className="pt-6 border-t border-brand-border/60 space-y-2">
        <Link
          to="/"
          className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-mono text-brand-muted hover:text-white hover:bg-white/5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-brand-electric" />
          <span>View Public Site</span>
        </Link>

        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-mono text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
