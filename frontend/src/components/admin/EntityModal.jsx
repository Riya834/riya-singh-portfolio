import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Plus, Trash2 } from 'lucide-react';

export const EntityModal = ({ isOpen, onClose, title, fields, initialData, onSave }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      const defaultObj = {};
      fields.forEach(f => {
        if (f.type === 'array') defaultObj[f.name] = [''];
        else defaultObj[f.name] = f.default || '';
      });
      setFormData(defaultObj);
    }
  }, [initialData, fields, isOpen]);

  if (!isOpen) return null;

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (name, index, value) => {
    const arr = [...(formData[name] || [])];
    arr[index] = value;
    setFormData(prev => ({ ...prev, [name]: arr }));
  };

  const addArrayItem = (name) => {
    const arr = [...(formData[name] || []), ''];
    setFormData(prev => ({ ...prev, [name]: arr }));
  };

  const removeArrayItem = (name, index) => {
    const arr = (formData[name] || []).filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, [name]: arr }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-brand-card border border-brand-border rounded-3xl p-6 sm:p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative text-white"
        >
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-brand-border/60">
            <h3 className="font-display font-bold text-lg text-white">{title}</h3>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-brand-bg text-brand-muted hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {fields.map((field) => {
              if (field.type === 'select') {
                return (
                  <div key={field.name}>
                    <label className="block text-xs font-mono text-brand-muted uppercase mb-1.5">{field.label}</label>
                    <select
                      value={formData[field.name] || ''}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-electric"
                    >
                      {field.options.map(opt => (
                        <option key={opt} value={opt} className="bg-brand-bg text-white">{opt}</option>
                      ))}
                    </select>
                  </div>
                );
              }

              if (field.type === 'textarea') {
                return (
                  <div key={field.name}>
                    <label className="block text-xs font-mono text-brand-muted uppercase mb-1.5">{field.label}</label>
                    <textarea
                      rows={3}
                      value={formData[field.name] || ''}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-electric resize-none"
                    />
                  </div>
                );
              }

              if (field.type === 'array') {
                const items = Array.isArray(formData[field.name]) ? formData[field.name] : [];
                return (
                  <div key={field.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-mono text-brand-muted uppercase">{field.label}</label>
                      <button
                        type="button"
                        onClick={() => addArrayItem(field.name)}
                        className="text-xs font-mono text-brand-electric flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Line
                      </button>
                    </div>
                    {items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => handleArrayChange(field.name, idx, e.target.value)}
                          className="flex-1 bg-brand-bg border border-brand-border rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-electric"
                        />
                        <button
                          type="button"
                          onClick={() => removeArrayItem(field.name, idx)}
                          className="p-2 text-red-400 hover:bg-red-500/10 rounded-xl"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                );
              }

              return (
                <div key={field.name}>
                  <label className="block text-xs font-mono text-brand-muted uppercase mb-1.5">{field.label}</label>
                  <input
                    type={field.type || 'text'}
                    value={formData[field.name] || ''}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-electric"
                  />
                </div>
              );
            })}

            <div className="pt-6 border-t border-brand-border/60 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl border border-brand-border text-xs font-mono text-brand-muted hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-brand-electric hover:bg-brand-electricHover text-white text-xs font-mono font-bold flex items-center gap-2 shadow-electric"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default EntityModal;
