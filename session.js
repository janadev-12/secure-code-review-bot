const session = require("express-session");

const sessionMiddleware = session({

  secret: process.env.SESSION_SECRET,

  resave: false,

  saveUninitialized: false,

  cookie: {
    secure: false, // true in production with HTTPS
    httpOnly: true,
    maxAge: 1000 * 60 * 60, // 1 hour
  },
});

module.exports = sessionMiddleware;