const express = require('express');
const router = express.Router();
const { register, login, getMe } = require('../controlles/auth.control');
const { protect } = require('../middleware/auth.middleware');

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes - require authentication
router.get('/me', protect, getMe);

module.exports = router; 