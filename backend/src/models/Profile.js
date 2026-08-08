const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: { type: String, required: true, default: 'Riya Singh' },
  title: { type: String, required: true, default: 'Full-Stack Developer | Software Developer | UI/UX Developer' },
  eyebrow: { type: String, default: 'FULL-STACK DEVELOPER × UI/UX' },
  headline: { type: String, default: 'BUILDING DIGITAL EXPERIENCES.' },
  scriptAccent: { type: String, default: 'Creative Engineer' },
  aboutTitle: { type: String, default: 'ENGINEER. DESIGNER. PROBLEM SOLVER.' },
  tagline: { type: String, default: 'Computer Science engineer building scalable web applications, data-driven products and intuitive digital experiences.' },
  bio: { type: String, required: true },
  email: { type: String, required: true, default: 'riyarssingh22@gmail.com' },
  phone: { type: String, default: '+91 8340154678' },
  location: { type: String, default: 'Punjab / Jharkhand, India' },
  resumeUrl: { type: String, default: '/resume.pdf' },
  profileImage: { type: String, default: '/riya-profile.jpg' },
  availableForWork: { type: Boolean, default: true },
  stats: [
    {
      label: { type: String },
      value: { type: String },
      subtitle: { type: String }
    }
  ],
  socialLinks: {
    github: { type: String, default: 'https://github.com' },
    linkedin: { type: String, default: 'https://linkedin.com' },
    email: { type: String, default: 'mailto:riyarssingh22@gmail.com' }
  }
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);
