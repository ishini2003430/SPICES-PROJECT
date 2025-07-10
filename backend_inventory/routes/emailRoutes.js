const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Verify transporter configuration
transporter.verify(function(error, success) {
  if (error) {
    console.error('Email configuration error:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

// Route to send email notification
router.post('/send-email', async (req, res) => {
  try {
    const { to, subject, message } = req.body;

    if (!to || !subject || !message) {
      return res.status(400).json({ error: 'Missing required email fields' });
    }

    // Email options
    const mailOptions = {
      from: `"Spices Management System" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: subject,
      text: message,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #E64A19; padding: 20px; border-radius: 5px 5px 0 0;">
            <h2 style="color: white; margin: 0;">Low Stock Alert</h2>
          </div>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 0 0 5px 5px;">
            ${message.replace(/\n/g, '<br>')}
          </div>
          <div style="margin-top: 20px; color: #666; font-size: 12px; text-align: center;">
            <p>This is an automated message from Spices Manufacturing Management System.</p>
            <p>Please do not reply to this email.</p>
          </div>
        </div>
      `
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    res.status(200).json({ 
      message: 'Email sent successfully',
      messageId: info.messageId
    });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      error: 'Failed to send email',
      details: error.message
    });
  }
});

module.exports = router; 