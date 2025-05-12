const nodemailer = require('nodemailer');
require('dotenv').config();

// Configure email transporter
let transporter = null;

// Create reusable transporter with Gmail
const initializeTransporter = () => {
  // Gmail credentials from environment variables
  const email = process.env.EMAIL_USER;
  const password = process.env.EMAIL_PASS;

  if (!email || !password) {
    console.warn('Email credentials are not set. Email functionality will not work.');
    return false;
  }

  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: email,
      pass: password,
    },
  });

  return true;
};

/**
 * Send an email using Nodemailer
 * @param {string} to - Recipient email address
 * @param {string} subject - Email subject
 * @param {string} text - Plain text content
 * @param {string} html - HTML content (optional)
 * @returns {Promise} - Nodemailer send response
 */
const sendEmail = async (to, subject, text, html) => {
  // Initialize transporter if not already initialized
  if (!transporter && !initializeTransporter()) {
    throw new Error('Email credentials are not set');
  }

  const msg = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
    html: html || text,
  };

  try {
    const response = await transporter.sendMail(msg);
    return response;
  } catch (error) {
    console.error('Email Error:', error);
    throw error;
  }
};

// Initialize transporter on module load
initializeTransporter();

module.exports = {
  sendEmail,
}; 