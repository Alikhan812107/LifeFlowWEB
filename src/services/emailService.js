const { MailtrapClient } = require('mailtrap');

class EmailService {
  constructor() {
    this.client = new MailtrapClient({
      token: process.env.MAILTRAP_TOKEN
    });
    this.sender = {
      email: process.env.MAILTRAP_SENDER_EMAIL || 'hello@demomailtrap.com',
      name: process.env.MAILTRAP_SENDER_NAME || 'LifeFlow'
    };
  }

  async sendWelcomeEmail(email, username) {
    try {
      await this.client.send({
        from: this.sender,
        to: [{ email }],
        subject: 'Welcome to LifeFlow!',
        text: `Welcome to LifeFlow, ${username}! Thank you for registering.`,
        html: `
          <h1>Welcome to LifeFlow, ${username}!</h1>
          <p>Thank you for registering. Start managing your tasks, notes, and health data.</p>
          <p>Best regards,<br>LifeFlow Team</p>
        `,
        category: 'Welcome'
      });
      console.log(`Welcome email sent to ${email}`);
    } catch (err) {
      console.error('Email send error:', err.message);
    }
  }

  async sendPasswordResetEmail(email, resetToken) {
    try {
      await this.client.send({
        from: this.sender,
        to: [{ email }],
        subject: 'Password Reset Request',
        text: `You requested a password reset. Use this token: ${resetToken}`,
        html: `
          <h1>Password Reset</h1>
          <p>You requested a password reset. Use this token: <strong>${resetToken}</strong></p>
          <p>If you didn't request this, please ignore this email.</p>
        `,
        category: 'Password Reset'
      });
      console.log(`Password reset email sent to ${email}`);
    } catch (err) {
      console.error('Email send error:', err.message);
    }
  }

  async sendTaskNotification(email, taskTitle) {
    try {
      await this.client.send({
        from: this.sender,
        to: [{ email }],
        subject: 'Task Created',
        text: `Your task "${taskTitle}" has been created successfully.`,
        html: `
          <h1>New Task Created</h1>
          <p>Your task "<strong>${taskTitle}</strong>" has been created successfully.</p>
        `,
        category: 'Task Notification'
      });
      console.log(`Task notification sent to ${email}`);
    } catch (err) {
      console.error('Email send error:', err.message);
    }
  }
}

module.exports = EmailService;
