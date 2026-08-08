const SiteSettings = require('../models/SiteSettings');

const getSettings = async (req, res, next) => {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = await SiteSettings.create({
        siteTitle: 'Riya Singh | Full-Stack Developer & UI/UX Developer',
        metaDescription: 'Riya Singh is a Full-Stack Developer and UI/UX Developer building scalable web applications, data-driven products and intuitive digital experiences.',
        accentColor: '#0052FF',
        heroSubtitle: 'Computer Science engineer building scalable web applications, data-driven products and intuitive digital experiences.',
        footerText: 'Designed & engineered with curiosity.'
      });
    }
    res.json({ success: true, data: settings });
  } catch (error) {
    next(error);
  }
};

const updateSettings = async (req, res, next) => {
  try {
    let settings = await SiteSettings.findOne();
    if (settings) {
      settings = await SiteSettings.findByIdAndUpdate(settings._id, req.body, { new: true, runValidators: true });
    } else {
      settings = await SiteSettings.create(req.body);
    }
    res.json({ success: true, data: settings });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSettings,
  updateSettings,
};
