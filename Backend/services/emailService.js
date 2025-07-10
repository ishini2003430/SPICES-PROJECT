// backend/services/emailService.js
const nodemailer = require('nodemailer');

// Configure email service (Gmail example)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendSalaryEmail = async (email, employeeName, salaryData) => {
  try {
    await transporter.sendMail({
      from: `HR Department <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Salary Report for ${employeeName}`,
      html: `
        <h2>Salary Report</h2>
        <p>Employee: <strong>${employeeName}</strong></p>
        <p>Month: <strong>${salaryData.month}</strong></p>
        <p>Basic Salary: <strong>Rs. ${salaryData.basicSalary.toFixed(2)}</strong></p>
        <p>Net Salary: <strong>Rs. ${salaryData.netSalary.toFixed(2)}</strong></p>
        <p>This is an automated email. Do not reply.</p>
      `
    });
    return { success: true };
  } catch (error) {
    console.error('Email error:', error);
    return { success: false, error: error.message };
  }
};

module.exports = { sendSalaryEmail };