const { sendEmail } = require('../modules/email.module');

/**
 * Send welcome email to a new user
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
const sendWelcomeEmail = async (req, res) => {
  try {
    const { email, name } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email address is required' });
    }

    const subject = 'Welcome to our platform!';
    const text = `Hello ${name || 'there'},\n\nWelcome to our platform! We're excited to have you on board.`;
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Welcome to Our Platform!</h2>
        <p>Hello ${name || 'there'},</p>
        <p>We're excited to have you on board. Here are some things you can do:</p>
        <ul>
          <li>Complete your profile</li>
          <li>Explore our features</li>
          <li>Connect with others</li>
        </ul>
        <p>If you have any questions, feel free to reply to this email.</p>
        <p>Best regards,<br>The Team</p>
      </div>
    `;

    await sendEmail(email, subject, text, html);

    res.status(200).json({ success: true, message: 'Welcome email sent successfully' });
  } catch (error) {
    console.error('Error sending welcome email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send email',
      error: error.message
    });
  }
};

/**
 * Send a custom email
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
const sendCustomEmail = async (req, res) => {
  try {
    const { to, subject, text, html } = req.body;

    if (!to || !subject || !text) {
      return res.status(400).json({
        message: 'Email address, subject and content are required'
      });
    }

    await sendEmail(to, subject, text, html);

    res.status(200).json({
      success: true,
      message: 'Email sent successfully'
    });
  } catch (error) {
    console.error('Error sending custom email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send email',
      error: error.message
    });
  }
};

module.exports = {
  sendWelcomeEmail,
  sendCustomEmail
}; 