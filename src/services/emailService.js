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
      text: `Welcome to LifeFlow, ${username}!

We are very happy to see you in our community 🎉

LifeFlow helps you manage tasks, organize notes, and track your daily progress in a simple and efficient way.

Here is what you can do next:
- Create your first task
- Add a personal note
- Customize your profile
- Explore the system and build your own productivity flow

If you did not register in LifeFlow, please ignore this email.

Have a productive day,
LifeFlow Team`,
      html: `
<div style="font-family: Arial, sans-serif; line-height: 1.6;">
  <h1>Welcome to LifeFlow, ${username}! 🎉</h1>
  <p>We are very happy to see you in our community.</p>
  <p><b>LifeFlow</b> helps you manage tasks, organize notes, and track your daily progress in a simple and efficient way.</p>
  
  <h3>🚀 What you can do next:</h3>
  <ul>
    <li>Create your first task</li>
    <li>Add a personal note</li>
    <li>Customize your profile</li>
    <li>Explore the system and build your own productivity flow</li>
  </ul>
  
  <p>If you did not register in LifeFlow, please ignore this email.</p>
  <br/>
  <p>Have a productive day,<br/><b>LifeFlow Team</b></p>
</div>`,
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
