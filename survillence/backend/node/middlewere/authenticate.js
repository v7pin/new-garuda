const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;// Assuming you have a JWT_SECRET defined in your config file

const verifyTokenMiddleware = (req, res, next) => {
  const token = req.cookies.token; // Assuming the token is stored in a cookie named "token"

  // Check if token is provided
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // If verification is successful, attach the decoded payload to the request object
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    return res.status(403).json({ message: 'Invalid token' });
  }
};

module.exports = verifyTokenMiddleware;
