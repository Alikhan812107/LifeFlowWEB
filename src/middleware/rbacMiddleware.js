const checkRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(403).json({ 
        status: 'error',
        statusCode: 403,
        message: 'Access denied - No role assigned' 
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        status: 'error',
        statusCode: 403,
        message: `Access denied - Required roles: ${allowedRoles.join(', ')}` 
      });
    }

    next();
  };
};

module.exports = checkRole;
