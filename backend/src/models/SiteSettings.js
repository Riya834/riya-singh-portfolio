const mongoose = require('mongoose');

const siteSettingsSchema = new mongoose.Schema({
  siteTitle: { type: String, default: 'Riya Singh | Full-Stack Developer & UI/UX Developer' },
  metaDescription: { type: String, default: 'Riya Singh is a Full-Stack Developer and UI/UX Developer building scalable web applications, data-driven products and intuitive digital experiences.' },
  accentColor: { type: String, default: '#0052FF' },
  heroSubtitle: { type: String, default: 'Computer Science engineer building scalable web applications, data-driven products and intuitive digital experiences.' },
  footerText: { type: String, default: 'Designed & engineered with curiosity.' }
}, { timestamps: true });

module.exports = mongoose.model('SiteSettings', siteSettingsSchema);
