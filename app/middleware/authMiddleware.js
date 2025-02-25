const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'vypoConpT2Ck5m06R53p';

const authenticateUser = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res
      .status(401)
      .json({ message: 'Access denied. No token provided.' });
  }

  try {
    const verified = jwt.verify(
      token.replace('Bearer ', ''),
      JWT_SECRET
    );
    req.user = verified; // Attach user info to request object
    next(); // Proceed to the next middleware
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

module.exports = authenticateUser;
