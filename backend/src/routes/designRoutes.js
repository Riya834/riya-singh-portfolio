const express = require('express');
const router = express.Router();
const {
  getDesigns,
  createDesign,
  updateDesign,
  deleteDesign
} = require('../controllers/designController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(getDesigns)
  .post(protect, createDesign);

router.route('/:id')
  .put(protect, updateDesign)
  .delete(protect, deleteDesign);

module.exports = router;
