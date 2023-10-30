const jwt = require('jsonwebtoken');

exports.authMiddleware = (req, res, next) => {
  const token = req.headers.auth;

  try {
    const data = jwt.verify(token, process.env.SECRET);

    req.user = data;
  } catch (error) {
    return res.status(403).json({ message: 'Invalid user token! Please re-login!' });
  }

  next();
};
