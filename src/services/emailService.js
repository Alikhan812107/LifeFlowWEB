const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: process.env.SMTP_PORT || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }

  async sendWelcomeEmail(email, username) {
    try {
      await this.transporter.sendMail({
        from: process.env.SMTP_FROM || 'noreply@lifeflow.com',
        to: email,
        subject: 'Welcome to LifeFlow!',
        html: `
          <h1>Welcome to LifeFlow, ${username}!</h1>
          <p>Thank you for registering. Start managing your tasks, notes, and health data.</p>
          <p>Best regards,<br>LifeFlow Team</p>
        `
      });
      console.log(`Welcome email sent to ${email}`);
    } catch (err) {
      console.error('Email send error:', err.message);
    }
  }

  async sendPasswordResetEmail(email, resetToken) {
    try {
      await this.transporter.sendMail({
        from: process.env.SMTP_FROM || 'noreply@lifeflow.com',
        to: email,
        subject: 'Password Reset Request',
        html: `
          <h1>Password Reset</h1>
          <p>You requested a password reset. Use this token: <strong>${resetToken}</strong></p>
          <p>If you didn't request this, please ignore this email.</p>
        `
      });
      console.log(`Password reset email sent to ${email}`);
    } catch (err) {
      console.error('Email send error:', err.message);
    }
  }

  async sendTaskNotification(email, taskTitle) {
    try {
      await this.transporter.sendMail({
        from: process.env.SMTP_FROM || 'noreply@lifeflow.com',
        to: email,
        subject: 'Task Created',
        html: `
          <h1>New Task Created</h1>
          <p>Your task "<strong>${taskTitle}</strong>" has been created successfully.</p>
        `
      });
      console.log(`Task notification sent to ${email}`);
    } catch (err) {
      console.error('Email send error:', err.message);
    }
  }
}

module.exports = EmailService;
