const UiUxDesign = require('../models/UiUxDesign');

// @desc    Get all UI/UX designs
// @route   GET /api/designs
// @access  Public
exports.getDesigns = async (req, res) => {
  try {
    const designs = await UiUxDesign.find().sort({ order: 1, createdAt: -1 });
    res.status(200).json({
      success: true,
      count: designs.length,
      data: designs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error fetching UI/UX designs',
      error: error.message
    });
  }
};

// @desc    Create new UI/UX design
// @route   POST /api/designs
// @access  Private (Admin)
exports.createDesign = async (req, res) => {
  try {
    const design = await UiUxDesign.create(req.body);
    res.status(201).json({
      success: true,
      data: design
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating design entry',
      error: error.message
    });
  }
};

// @desc    Update UI/UX design
// @route   PUT /api/designs/:id
// @access  Private (Admin)
exports.updateDesign = async (req, res) => {
  try {
    const design = await UiUxDesign.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!design) {
      return res.status(404).json({ success: false, message: 'Design not found' });
    }
    res.status(200).json({ success: true, data: design });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete UI/UX design
// @route   DELETE /api/designs/:id
// @access  Private (Admin)
exports.deleteDesign = async (req, res) => {
  try {
    const design = await UiUxDesign.findByIdAndDelete(req.params.id);
    if (!design) {
      return res.status(404).json({ success: false, message: 'Design not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
