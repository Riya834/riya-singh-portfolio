const mongoose = require('mongoose');

const leadershipSchema = new mongoose.Schema({
  role: { type: String, required: true },
  organization: { type: String, required: true },
  year: { type: String, default: '' },
  description: { type: String, default: '' },
  highlights: [{ type: String }],
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Leadership', leadershipSchema);
