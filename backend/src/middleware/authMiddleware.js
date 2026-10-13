const jwt = require('jsonwebtoken');

const authenticateAdmin = (req, res, next) => {
  // Check token in signed/regular cookies or Authorization header
  let token = req.cookies?.ethixweb_admin_token;

  if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized access. Please log in to your admin account.'
    });
  }

  try {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error('[Auth Error] JWT_SECRET is not configured.');
      return res.status(500).json({
        success: false,
        message: 'Authentication service configuration error.'
      });
    }

    const decoded = jwt.verify(token, jwtSecret);
    req.admin = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role
    };
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Admin session has expired. Please log in again.'
      });
    }
    return res.status(401).json({
      success: false,
      message: 'Invalid authorization token. Please log in again.'
    });
  }
};

module.exports = {
  authenticateAdmin
};
