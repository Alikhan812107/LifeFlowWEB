const nodemailer = require("nodemailer");

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    this.sender = {
      email: process.env.SENDER_EMAIL || "noreply@danmurdan.shop",
      name: process.env.SENDER_NAME || "LifeFlow",
    };
  }

  async sendMail(options) {
    try {
      await this.transporter.sendMail({
        from: `"${this.sender.name}" <${this.sender.email}>`,
        ...options,
      });
      console.log("Email sent");
    } catch (err) {
      console.error("Email send error:", err.message);
    }
  }

  async sendWelcomeEmail(email, username) {
    await this.sendMail({
      to: email,
      subject: "Welcome to LifeFlow!",
      text: `Welcome to LifeFlow, ${username}!`,
      html: `
        <h1>Welcome to LifeFlow, ${username}!</h1>
        <p>Thank you for registering.</p>
      `,
    });
  }

  async sendPasswordResetEmail(email, resetToken) {
    await this.sendMail({
      to: email,
      subject: "Password Reset",
      text: `Your token: ${resetToken}`,
      html: `
        <h1>Password Reset</h1>
        <p>Your token: <b>${resetToken}</b></p>
      `,
    });
  }

  async sendTaskNotification(email, taskTitle) {
    await this.sendMail({
      to: email,
      subject: "Task Created",
      text: `Task "${taskTitle}" created`,
      html: `
        <h1>Task Created</h1>
        <p>Task "<b>${taskTitle}</b>" created.</p>
      `,
    });
  }
}

module.exports = EmailService;
