const express = require('express');
const auth = require('../middleware/auth');
const ChatMessage = require('../models/ChatMessage'); // We don't have this model, but let's assume we have one
const router = express.Router();

// Get messages for a car
router.get('/car/:carId', auth, async (req, res) => {
  try {
    const messages = await ChatMessage.find({ car: req.params.carId })
      .populate('user', 'name profile.avatar')
      .sort({ timestamp: 1 });
    
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;