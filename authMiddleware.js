const authMiddleware = (req, res, next) => {
  try {

    // Check session
    if (!req.session || !req.session.user) {
      return res.status(401).json({
        message: "Unauthorized Access",
      });
    }

    // Attach user data
    req.user = req.session.user;

    next();

  } catch (error) {
    res.status(500).json({
      message: "Authentication Failed",
      error: error.message,
    });
  }
};

module.exports = authMiddleware;