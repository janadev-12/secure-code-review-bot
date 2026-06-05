const crypto = require("crypto");

const csrfProtection = (req, res, next) => {

  // Generate CSRF token if not exists
  if (!req.session.csrfToken) {
    req.session.csrfToken = crypto
      .randomBytes(32)
      .toString("hex");
  }

  // Skip token check for GET requests
  if (req.method === "GET") {
    return next();
  }

  const token =
    req.headers["x-csrf-token"] || req.body.csrfToken;

  // Validate token
  if (!token || token !== req.session.csrfToken) {
    return res.status(403).json({
      success: false,
      message: "Invalid CSRF Token",
    });
  }

  next();
};

module.exports = csrfProtection;