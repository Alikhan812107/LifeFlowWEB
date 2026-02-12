const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class AuthController {
  constructor(userService, emailService) {
    this.userService = userService;
    this.emailService = emailService;

    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  async register(req, res) {
    try {
      const { username, email, password } = req.body;

      if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const existing = await this.userService.findByEmail(email);
      if (existing) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const created = await this.userService.createUser({
        username,
        email,
        password: hashedPassword,
        role: "user"
      });

      console.log('User created, sending welcome email to:', email);
      if (this.emailService) {
        try {
          await this.emailService.sendWelcomeEmail(email, username);
          console.log('Welcome email sent successfully');
        } catch (emailErr) {
          console.error('Failed to send welcome email:', emailErr);
        }
      } else {
        console.log('Email service not available');
      }

      return res.status(201).json({
        message: "User registered successfully",
        userId: created._id
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error" });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }

      const user = await this.userService.findByEmail(email);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const ok = await bcrypt.compare(password, user.password);
      if (!ok) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const jwtSecret = process.env.JWT_SECRET || 'fallback-secret-key-for-development';
      
      const token = jwt.sign(
        { id: user._id.toString(), role: user.role || "user" },
        jwtSecret,
        { expiresIn: "1d" }
      );

      res.cookie('token', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
      });

      return res.json({ token });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error" });
    }
  }

  async logout(req, res) {
    res.clearCookie('token');
    return res.json({ message: "Logged out successfully" });
  }
}

module.exports = AuthController;
