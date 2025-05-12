const express = require('express');
const router = express.Router();
const { sendWelcomeEmail, sendCustomEmail } = require('../controlles/email.control');

// POST route to send welcome email
router.post('/welcome', sendWelcomeEmail);

// POST route to send custom email
router.post('/send', sendCustomEmail);

module.exports = router; 