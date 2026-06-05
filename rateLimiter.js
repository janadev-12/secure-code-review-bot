const rateLimit = require("express-rate-limit");

const limiter = rateLimit({

  // Time window
  windowMs: 15 * 60 * 1000, // 15 minutes

  // Max requests allowed
  max: 100,

  // Message after limit exceeded
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },

  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = limiter;