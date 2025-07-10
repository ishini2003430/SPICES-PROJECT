const express = require('express');
const router = express.Router();
const { loginManager, getManagerProfile } = require('../Controller/authController');
const { protect } = require('../middleware/authMiddleware');

// Public routes
router.post('/login', loginManager);

// Protected routes
router.get('/profile', protect, getManagerProfile);

module.exports = router; 