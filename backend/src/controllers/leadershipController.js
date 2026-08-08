const Leadership = require('../models/Leadership');

const getLeadership = async (req, res, next) => {
  try {
    const leadership = await Leadership.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: leadership });
  } catch (error) {
    next(error);
  }
};

const createLeadership = async (req, res, next) => {
  try {
    const leadership = await Leadership.create(req.body);
    res.status(201).json({ success: true, data: leadership });
  } catch (error) {
    next(error);
  }
};

const updateLeadership = async (req, res, next) => {
  try {
    const leadership = await Leadership.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!leadership) return res.status(404).json({ success: false, message: 'Leadership item not found' });
    res.json({ success: true, data: leadership });
  } catch (error) {
    next(error);
  }
};

const deleteLeadership = async (req, res, next) => {
  try {
    const leadership = await Leadership.findByIdAndDelete(req.params.id);
    if (!leadership) return res.status(404).json({ success: false, message: 'Leadership item not found' });
    res.json({ success: true, message: 'Leadership item deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getLeadership,
  createLeadership,
  updateLeadership,
  deleteLeadership,
};
