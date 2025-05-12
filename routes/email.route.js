const express = require('express');
const router = express.Router();
const { sendWelcomeEmail, sendCustomEmail } = require('../controlles/email.control');

/**
 * @swagger
 * tags:
 *   name: Emails
 *   description: Email sending services
 */

/**
 * @swagger
 * /api/email/welcome:
 *   post:
 *     summary: Send welcome email
 *     tags: [Emails]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Recipient email address
 *                 example: user@example.com
 *               name:
 *                 type: string
 *                 description: Recipient name
 *                 example: John Doe
 *     responses:
 *       200:
 *         description: Welcome email sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Welcome email sent successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.post('/welcome', sendWelcomeEmail);

/**
 * @swagger
 * /api/email/send:
 *   post:
 *     summary: Send custom email
 *     tags: [Emails]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - to
 *               - subject
 *               - text
 *             properties:
 *               to:
 *                 type: string
 *                 format: email
 *                 description: Recipient email address
 *                 example: user@example.com
 *               subject:
 *                 type: string
 *                 description: Email subject
 *                 example: Important Information
 *               text:
 *                 type: string
 *                 description: Plain text content
 *                 example: This is a test email
 *               html:
 *                 type: string
 *                 description: HTML content (optional)
 *                 example: <h1>Hello!</h1><p>This is a test email with HTML</p>
 *     responses:
 *       200:
 *         description: Email sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Email sent successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.post('/send', sendCustomEmail);

module.exports = router; 