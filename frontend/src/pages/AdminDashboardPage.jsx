import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { usePortfolio } from '../context/PortfolioContext';
import { portfolioAPI } from '../services/api';
import AdminSidebar from '../components/admin/AdminSidebar';
import EntityModal from '../components/admin/EntityModal';
import { Plus, Edit2, Trash2, Mail, CheckCircle2, Shield, Eye, RefreshCw } from 'lucide-react';

export const AdminDashboardPage = () => {
  const { admin } = useAuth();
  const { profile, skills, experience, projects, education, certifications, leadership, settings, refreshData } = usePortfolio();
  
  const [activeTab, setActiveTab] = useState('overview');
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(false);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalFields, setModalFields] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [entityType, setEntityType] = useState('');

  // Profile Form State
  const [profileForm, setProfileForm] = useState({});
  const [profileSaving, setProfileSaving] = useState(false);

  // Settings Form State
  const [settingsForm, setSettingsForm] = useState({});

  useEffect(() => {
    if (profile) setProfileForm(profile);
    if (settings) setSettingsForm(settings);
  }, [profile, settings]);

  useEffect(() => {
    if (activeTab === 'messages' || activeTab === 'overview') {
      fetchMessages();
    }
  }, [activeTab]);

  const fetchMessages = async () => {
    setLoadingMessages(true);
    try {
      const res = await portfolioAPI.getMessages();
      if (res.success) setMessages(res.data);
    } catch (err) {
      console.error('Fetch messages error:', err);
    } finally {
      setLoadingMessages(false);
    }
  };

  // Profile Save
  const handleProfileSave = async (e) => {
    e.preventDefault();
    setProfileSaving(true);
    try {
      await portfolioAPI.updateProfile(profileForm);
      await refreshData();
      alert('Profile updated successfully!');
    } catch (err) {
      alert('Error updating profile: ' + err.message);
    } finally {
      setProfileSaving(false);
    }
  };

  // Settings Save
  const handleSettingsSave = async (e) => {
    e.preventDefault();
    try {
      await portfolioAPI.updateSettings(settingsForm);
      await refreshData();
      alert('Site settings updated!');
    } catch (err) {
      alert('Error saving settings: ' + err.message);
    }
  };

  // Open Entity Modal helper
  const openModal = (type, item = null) => {
    setEntityType(type);
    setEditingItem(item);

    if (type === 'skill') {
      setModalTitle(item ? 'Edit Skill' : 'Add New Skill');
      setModalFields([
        { name: 'name', label: 'Skill Name' },
        { name: 'category', label: 'Category', type: 'select', options: ['Programming', 'Data Analysis', 'Databases', 'Core Concepts', 'Frameworks', 'Tools'] },
        { name: 'icon', label: 'Lucide Icon Name', default: 'Code' },
        { name: 'description', label: 'Description', type: 'textarea' },
      ]);
    } else if (type === 'experience') {
      setModalTitle(item ? 'Edit Experience' : 'Add Work Experience');
      setModalFields([
        { name: 'company', label: 'Company Name' },
        { name: 'position', label: 'Position / Role' },
        { name: 'location', label: 'Location' },
        { name: 'startDate', label: 'Start Date (e.g. May 2024)' },
        { name: 'endDate', label: 'End Date (e.g. Aug 2025)' },
        { name: 'description', label: 'Bullet Points', type: 'array' },
        { name: 'technologies', label: 'Technologies (Comma or Array)', type: 'array' }
      ]);
    } else if (type === 'project') {
      setModalTitle(item ? 'Edit Project' : 'Add New Project');
      setModalFields([
        { name: 'title', label: 'Project Title' },
        { name: 'subtitle', label: 'Subtitle / Tagline' },
        { name: 'description', label: 'Short Description', type: 'textarea' },
        { name: 'longDescription', label: 'Long Description', type: 'textarea' },
        { name: 'liveUrl', label: 'Live Application URL' },
        { name: 'githubUrl', label: 'GitHub Repository URL' },
        { name: 'startDate', label: 'Start Date' },
        { name: 'endDate', label: 'End Date' },
        { name: 'highlights', label: 'Highlights', type: 'array' },
        { name: 'technologies', label: 'Technologies', type: 'array' }
      ]);
    } else if (type === 'education') {
      setModalTitle(item ? 'Edit Education' : 'Add Education Record');
      setModalFields([
        { name: 'institution', label: 'Institution Name' },
        { name: 'degree', label: 'Degree / Certificate' },
        { name: 'year', label: 'Year (e.g. 2026)' },
        { name: 'score', label: 'Grade / Score (e.g. CGPA: 8.8/10)' },
        { name: 'location', label: 'Location' },
        { name: 'description', label: 'Description', type: 'textarea' }
      ]);
    } else if (type === 'certification') {
      setModalTitle(item ? 'Edit Certification' : 'Add Certification');
      setModalFields([
        { name: 'title', label: 'Title / Honor' },
        { name: 'organization', label: 'Organization' },
        { name: 'year', label: 'Year' },
        { name: 'description', label: 'Description', type: 'textarea' },
        { name: 'credentialUrl', label: 'Credential URL' }
      ]);
    } else if (type === 'leadership') {
      setModalTitle(item ? 'Edit Leadership Item' : 'Add Leadership Item');
      setModalFields([
        { name: 'role', label: 'Role Title' },
        { name: 'organization', label: 'Organization' },
        { name: 'year', label: 'Year Range' },
        { name: 'description', label: 'Description', type: 'textarea' },
        { name: 'highlights', label: 'Highlights', type: 'array' }
      ]);
    }

    setModalOpen(true);
  };

  // Entity Modal Save
  const handleEntitySave = async (formData) => {
    try {
      if (entityType === 'skill') {
        if (editingItem) await portfolioAPI.updateSkill(editingItem._id, formData);
        else await portfolioAPI.createSkill(formData);
      } else if (entityType === 'experience') {
        if (editingItem) await portfolioAPI.updateExperience(editingItem._id, formData);
        else await portfolioAPI.createExperience(formData);
      } else if (entityType === 'project') {
        if (editingItem) await portfolioAPI.updateProject(editingItem._id, formData);
        else await portfolioAPI.createProject(formData);
      } else if (entityType === 'education') {
        if (editingItem) await portfolioAPI.updateEducation(editingItem._id, formData);
        else await portfolioAPI.createEducation(formData);
      } else if (entityType === 'certification') {
        if (editingItem) await portfolioAPI.updateCertification(editingItem._id, formData);
        else await portfolioAPI.createCertification(formData);
      } else if (entityType === 'leadership') {
        if (editingItem) await portfolioAPI.updateLeadership(editingItem._id, formData);
        else await portfolioAPI.createLeadership(formData);
      }

      setModalOpen(false);
      await refreshData();
    } catch (err) {
      alert('Operation failed: ' + err.message);
    }
  };

  // Delete Entity
  const handleDelete = async (type, id) => {
    if (!window.confirm('Are you sure you want to delete this record?')) return;
    try {
      if (type === 'skill') await portfolioAPI.deleteSkill(id);
      if (type === 'experience') await portfolioAPI.deleteExperience(id);
      if (type === 'project') await portfolioAPI.deleteProject(id);
      if (type === 'education') await portfolioAPI.deleteEducation(id);
      if (type === 'certification') await portfolioAPI.deleteCertification(id);
      if (type === 'leadership') await portfolioAPI.deleteLeadership(id);
      if (type === 'message') await portfolioAPI.deleteMessage(id);

      if (type === 'message') fetchMessages();
      else await refreshData();
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg text-brand-paper flex">
      {/* Sidebar */}
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-y-auto max-w-6xl">
        
        {/* Top Bar */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-brand-border/60">
          <div>
            <h1 className="font-display font-extrabold text-2xl text-white uppercase tracking-tight">
              {activeTab} Management
            </h1>
            <p className="font-mono text-xs text-brand-muted">
              Signed in as <span className="text-white">{admin?.email}</span>
            </p>
          </div>

          <button
            onClick={() => refreshData()}
            className="p-2.5 rounded-xl bg-brand-card border border-brand-border text-brand-muted hover:text-white hover:border-brand-electric transition-colors"
            title="Refresh Portfolio Data"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="glass-panel p-6 rounded-2xl border border-brand-border">
                <span className="font-mono text-xs text-brand-electric">PROJECTS</span>
                <h3 className="font-display font-extrabold text-3xl text-white mt-1">{projects.length}</h3>
              </div>
              <div className="glass-panel p-6 rounded-2xl border border-brand-border">
                <span className="font-mono text-xs text-brand-electric">SKILLS</span>
                <h3 className="font-display font-extrabold text-3xl text-white mt-1">{skills.length}</h3>
              </div>
              <div className="glass-panel p-6 rounded-2xl border border-brand-border">
                <span className="font-mono text-xs text-brand-electric">EXPERIENCE</span>
                <h3 className="font-display font-extrabold text-3xl text-white mt-1">{experience.length}</h3>
              </div>
              <div className="glass-panel p-6 rounded-2xl border border-brand-border">
                <span className="font-mono text-xs text-brand-electric">MESSAGES</span>
                <h3 className="font-display font-extrabold text-3xl text-white mt-1">{messages.length}</h3>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-3xl border border-brand-border">
              <h3 className="font-display font-bold text-lg text-white mb-4">Recent Contact Messages</h3>
              {messages.length === 0 ? (
                <p className="text-sm text-brand-muted font-mono">No contact submissions yet.</p>
              ) : (
                <div className="space-y-3">
                  {messages.slice(0, 5).map((msg) => (
                    <div key={msg._id} className="p-4 rounded-xl bg-brand-bg border border-brand-border/60 flex items-center justify-between text-xs">
                      <div>
                        <p className="font-bold text-white">{msg.name} ({msg.email})</p>
                        <p className="text-brand-muted mt-0.5">{msg.subject}</p>
                      </div>
                      <span className="font-mono text-[10px] text-brand-electric">
                        {new Date(msg.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: PROFILE MANAGEMENT */}
        {activeTab === 'profile' && (
          <form onSubmit={handleProfileSave} className="glass-panel p-8 rounded-3xl border border-brand-border space-y-6">
            <h3 className="font-display font-bold text-lg text-white border-b border-brand-border/60 pb-3">Edit Profile & Hero</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-brand-muted uppercase mb-1">Full Name</label>
                <input
                  type="text"
                  value={profileForm.name || ''}
                  onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-2.5 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-brand-muted uppercase mb-1">Title / Headline</label>
                <input
                  type="text"
                  value={profileForm.title || ''}
                  onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
                  className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-2.5 text-sm text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-brand-muted uppercase mb-1">Tagline Summary</label>
              <textarea
                rows={2}
                value={profileForm.tagline || ''}
                onChange={(e) => setProfileForm({ ...profileForm, tagline: e.target.value })}
                className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-2.5 text-sm text-white resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-brand-muted uppercase mb-1">Detailed Bio</label>
              <textarea
                rows={4}
                value={profileForm.bio || ''}
                onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-2.5 text-sm text-white resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-mono text-brand-muted uppercase mb-1">Email</label>
                <input
                  type="email"
                  value={profileForm.email || ''}
                  onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                  className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-2.5 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-brand-muted uppercase mb-1">Phone</label>
                <input
                  type="text"
                  value={profileForm.phone || ''}
                  onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                  className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-2.5 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-brand-muted uppercase mb-1">Location</label>
                <input
                  type="text"
                  value={profileForm.location || ''}
                  onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                  className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-2.5 text-sm text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-brand-muted uppercase mb-1">GitHub Profile URL</label>
                <input
                  type="text"
                  value={profileForm.socialLinks?.github || ''}
                  onChange={(e) => setProfileForm({
                    ...profileForm,
                    socialLinks: { ...profileForm.socialLinks, github: e.target.value }
                  })}
                  placeholder="https://github.com/your-username"
                  className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-2.5 text-sm text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-brand-muted uppercase mb-1">LinkedIn Profile URL</label>
                <input
                  type="text"
                  value={profileForm.socialLinks?.linkedin || ''}
                  onChange={(e) => setProfileForm({
                    ...profileForm,
                    socialLinks: { ...profileForm.socialLinks, linkedin: e.target.value }
                  })}
                  placeholder="https://linkedin.com/in/your-username"
                  className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-2.5 text-sm text-white font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={profileSaving}
              className="px-6 py-3 rounded-xl bg-brand-electric text-white text-xs font-mono font-bold shadow-electric"
            >
              {profileSaving ? 'Saving Profile...' : 'Save Profile Changes'}
            </button>
          </form>
        )}

        {/* TAB 3: SKILLS STACK */}
        {activeTab === 'skills' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-xs font-mono text-brand-muted">Total Skills: {skills.length}</p>
              <button
                onClick={() => openModal('skill')}
                className="px-4 py-2 rounded-xl bg-brand-electric text-white text-xs font-mono font-bold flex items-center gap-2 shadow-electric"
              >
                <Plus className="w-4 h-4" /> Add Skill
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {skills.map((sk) => (
                <div key={sk._id} className="p-4 rounded-xl bg-brand-card border border-brand-border flex items-center justify-between">
                  <div>
                    <span className="font-mono text-[10px] text-brand-electric uppercase">{sk.category}</span>
                    <h4 className="font-bold text-white text-sm">{sk.name}</h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => openModal('skill', sk)} className="p-2 text-brand-muted hover:text-white"><Edit2 className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete('skill', sk._id)} className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: WORK EXPERIENCE */}
        {activeTab === 'experience' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-xs font-mono text-brand-muted">Total Roles: {experience.length}</p>
              <button
                onClick={() => openModal('experience')}
                className="px-4 py-2 rounded-xl bg-brand-electric text-white text-xs font-mono font-bold flex items-center gap-2 shadow-electric"
              >
                <Plus className="w-4 h-4" /> Add Experience
              </button>
            </div>

            <div className="space-y-3">
              {experience.map((exp) => (
                <div key={exp._id} className="p-5 rounded-xl bg-brand-card border border-brand-border flex items-center justify-between">
                  <div>
                    <span className="font-mono text-xs text-brand-electric">{exp.company}</span>
                    <h4 className="font-bold text-white text-base">{exp.position}</h4>
                    <p className="text-xs text-brand-muted">{exp.startDate} – {exp.endDate}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => openModal('experience', exp)} className="p-2 text-brand-muted hover:text-white"><Edit2 className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete('experience', exp._id)} className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: PROJECTS */}
        {activeTab === 'projects' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-xs font-mono text-brand-muted">Total Projects: {projects.length}</p>
              <button
                onClick={() => openModal('project')}
                className="px-4 py-2 rounded-xl bg-brand-electric text-white text-xs font-mono font-bold flex items-center gap-2 shadow-electric"
              >
                <Plus className="w-4 h-4" /> Add Project
              </button>
            </div>

            <div className="space-y-3">
              {projects.map((proj) => (
                <div key={proj._id} className="p-5 rounded-xl bg-brand-card border border-brand-border flex items-center justify-between">
                  <div>
                    <span className="font-mono text-xs text-brand-electric">{proj.subtitle || 'Project'}</span>
                    <h4 className="font-bold text-white text-base">{proj.title}</h4>
                    <p className="text-xs text-brand-muted max-w-lg truncate">{proj.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => openModal('project', proj)} className="p-2 text-brand-muted hover:text-white"><Edit2 className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete('project', proj._id)} className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: EDUCATION */}
        {activeTab === 'education' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-xs font-mono text-brand-muted">Total Entries: {education.length}</p>
              <button
                onClick={() => openModal('education')}
                className="px-4 py-2 rounded-xl bg-brand-electric text-white text-xs font-mono font-bold flex items-center gap-2 shadow-electric"
              >
                <Plus className="w-4 h-4" /> Add Education
              </button>
            </div>

            <div className="space-y-3">
              {education.map((ed) => (
                <div key={ed._id} className="p-5 rounded-xl bg-brand-card border border-brand-border flex items-center justify-between">
                  <div>
                    <span className="font-mono text-xs text-brand-electric">{ed.institution}</span>
                    <h4 className="font-bold text-white text-base">{ed.degree} ({ed.score})</h4>
                    <p className="text-xs text-brand-muted">{ed.year}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => openModal('education', ed)} className="p-2 text-brand-muted hover:text-white"><Edit2 className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete('education', ed._id)} className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: CERTIFICATIONS */}
        {activeTab === 'certifications' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-xs font-mono text-brand-muted">Total Certifications: {certifications.length}</p>
              <button
                onClick={() => openModal('certification')}
                className="px-4 py-2 rounded-xl bg-brand-electric text-white text-xs font-mono font-bold flex items-center gap-2 shadow-electric"
              >
                <Plus className="w-4 h-4" /> Add Certification
              </button>
            </div>

            <div className="space-y-3">
              {certifications.map((c) => (
                <div key={c._id} className="p-5 rounded-xl bg-brand-card border border-brand-border flex items-center justify-between">
                  <div>
                    <span className="font-mono text-xs text-brand-electric">{c.organization}</span>
                    <h4 className="font-bold text-white text-base">{c.title} ({c.year})</h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => openModal('certification', c)} className="p-2 text-brand-muted hover:text-white"><Edit2 className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete('certification', c._id)} className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 8: LEADERSHIP */}
        {activeTab === 'leadership' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-xs font-mono text-brand-muted">Total Entries: {leadership.length}</p>
              <button
                onClick={() => openModal('leadership')}
                className="px-4 py-2 rounded-xl bg-brand-electric text-white text-xs font-mono font-bold flex items-center gap-2 shadow-electric"
              >
                <Plus className="w-4 h-4" /> Add Leadership
              </button>
            </div>

            <div className="space-y-3">
              {leadership.map((lead) => (
                <div key={lead._id} className="p-5 rounded-xl bg-brand-card border border-brand-border flex items-center justify-between">
                  <div>
                    <span className="font-mono text-xs text-brand-electric">{lead.organization}</span>
                    <h4 className="font-bold text-white text-base">{lead.role}</h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => openModal('leadership', lead)} className="p-2 text-brand-muted hover:text-white"><Edit2 className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete('leadership', lead._id)} className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 9: MESSAGES */}
        {activeTab === 'messages' && (
          <div className="space-y-4">
            <h3 className="font-display font-bold text-lg text-white mb-2">Submitted Contact Form Messages</h3>
            {loadingMessages ? (
              <p className="text-xs font-mono text-brand-muted">Loading messages...</p>
            ) : messages.length === 0 ? (
              <p className="text-xs font-mono text-brand-muted">No messages received yet.</p>
            ) : (
              <div className="space-y-3">
                {messages.map((msg) => (
                  <div key={msg._id} className="p-5 rounded-xl bg-brand-card border border-brand-border flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-white text-sm">{msg.name} ({msg.email})</h4>
                      <span className="font-mono text-[10px] text-brand-muted">{new Date(msg.createdAt).toLocaleString()}</span>
                    </div>
                    <p className="font-mono text-xs text-brand-electric">{msg.subject}</p>
                    <p className="text-xs text-brand-paper/90 bg-brand-bg p-3 rounded-lg border border-brand-border/40">{msg.message}</p>
                    <div className="flex justify-end pt-2">
                      <button onClick={() => handleDelete('message', msg._id)} className="text-xs font-mono text-red-400 hover:underline flex items-center gap-1">
                        <Trash2 className="w-3.5 h-3.5" /> Delete Message
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 10: SETTINGS */}
        {activeTab === 'settings' && (
          <form onSubmit={handleSettingsSave} className="glass-panel p-8 rounded-3xl border border-brand-border space-y-6">
            <h3 className="font-display font-bold text-lg text-white border-b border-brand-border/60 pb-3">Site Metadata & Settings</h3>
            
            <div>
              <label className="block text-xs font-mono text-brand-muted uppercase mb-1">Site Title</label>
              <input
                type="text"
                value={settingsForm.siteTitle || ''}
                onChange={(e) => setSettingsForm({ ...settingsForm, siteTitle: e.target.value })}
                className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-2.5 text-sm text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-brand-muted uppercase mb-1">Meta Description</label>
              <textarea
                rows={3}
                value={settingsForm.metaDescription || ''}
                onChange={(e) => setSettingsForm({ ...settingsForm, metaDescription: e.target.value })}
                className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-2.5 text-sm text-white resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-brand-muted uppercase mb-1">Accent Hex Color</label>
              <input
                type="text"
                value={settingsForm.accentColor || '#0052FF'}
                onChange={(e) => setSettingsForm({ ...settingsForm, accentColor: e.target.value })}
                className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-2.5 text-sm text-white font-mono"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-brand-electric text-white text-xs font-mono font-bold shadow-electric"
            >
              Save Site Settings
            </button>
          </form>
        )}

      </main>

      {/* CRUD Modal */}
      <EntityModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalTitle}
        fields={modalFields}
        initialData={editingItem}
        onSave={handleEntitySave}
      />
    </div>
  );
};

export default AdminDashboardPage;
