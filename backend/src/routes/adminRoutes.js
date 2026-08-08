const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getMessages, updateMessageStatus, deleteMessage } = require('../controllers/contactController');

router.get('/messages', protect, getMessages);
router.put('/messages/:id', protect, updateMessageStatus);
router.delete('/messages/:id', protect, deleteMessage);

module.exports = router;
