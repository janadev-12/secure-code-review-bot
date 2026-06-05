const express = require("express");
const { body } = require("express-validator");

const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controllers/authController");

const validateMiddleware = require("../middleware/validateMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// ================= REGISTER =================

router.post(
  "/register",

  [
    body("username")
      .notEmpty()
      .withMessage("Username is required"),

    body("email")
      .isEmail()
      .withMessage("Valid email is required"),

    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters"),
  ],

  validateMiddleware,

  registerUser
);


// ================= LOGIN =================

router.post(
  "/login",

  [
    body("email")
      .isEmail()
      .withMessage("Valid email is required"),

    body("password")
      .notEmpty()
      .withMessage("Password is required"),
  ],

  validateMiddleware,

  loginUser
);


// ================= LOGOUT =================

router.post(
  "/logout",
  authMiddleware,
  logoutUser
);


// ================= DASHBOARD =================

router.get(
  "/dashboard",
  authMiddleware,
  (req, res) => {
    res.status(200).json({
      message: "Welcome To Secure Dashboard",
      user: req.user,
    });
  }
);


module.exports = router;