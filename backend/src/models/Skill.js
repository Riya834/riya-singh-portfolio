const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: ['Programming', 'Data Analysis', 'Databases', 'Core Concepts', 'Frameworks', 'Tools'],
  },
  name: { type: String, required: true },
  icon: { type: String, default: 'Code' },
  description: { type: String, default: '' },
  proficiency: { type: String, default: 'Advanced' },
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Skill', skillSchema);
