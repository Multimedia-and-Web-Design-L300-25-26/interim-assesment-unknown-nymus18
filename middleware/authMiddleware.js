import jwt from 'jsonwebtoken';

/**
 * Authentication middleware.
 * Checks for token in Authorization header (Bearer <token>) or in cookies.
 * Attaches the decoded payload to req.user on success.
 */
const authMiddleware = async (req, res, next) => {
  try {
    let token;

    // Check Authorization header first
    const authHeader = req.header('Authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.replace('Bearer ', '').trim();
    }
    // Fall back to cookie
    else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, iat, exp }
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token has expired, please log in again' });
    }
    res.status(401).json({ message: 'Token is not valid' });
  }
};

export default authMiddleware;