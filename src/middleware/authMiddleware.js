const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = req.cookies?.token;

  let tokenToVerify = null;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    tokenToVerify = authHeader.split(" ")[1];
  } else if (token) {
    tokenToVerify = token;
  }

  if (!tokenToVerify) {
    if (req.path.startsWith('/api/')) {
      return res.status(401).json({ 
        status: 'error',
        statusCode: 401,
        message: 'Unauthorized - No token provided' 
      });
    }
    return res.redirect('/login.html');
  }

  try {
    const jwtSecret = process.env.JWT_SECRET || 'fallback-secret-key-for-development';
    const decoded = jwt.verify(tokenToVerify, jwtSecret);
    req.user = decoded;
    next();
  } catch (err) {
    if (req.path.startsWith('/api/')) {
      return res.status(401).json({ 
        status: 'error',
        statusCode: 401,
        message: 'Unauthorized - Invalid token' 
      });
    }
    return res.redirect('/login.html');
  }
};
