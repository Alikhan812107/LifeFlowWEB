const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class AuthController {
  constructor(userService) {
    this.userService = userService;

    // bind чтобы this работал в routes
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
  }

  async register(req, res) {
    try {
      const { username, email, password } = req.body;

      if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

      // проверка что email уникальный
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

      const token = jwt.sign(
        { id: user._id, role: user.role || "user" },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      

      return res.json({ token });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error" });
    }
  }
}

module.exports = AuthController;
