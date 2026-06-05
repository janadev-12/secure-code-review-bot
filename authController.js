const bcrypt = require("bcrypt");
const User = require("../models/User");

const checkPasswordStrength = require("../ai/passwordAi");
const detectAnomaly = require("../ai/anomalyDetection");
const detectBot = require("../ai/botDetection");
const analyzeBehavior = require("../ai/behaviorAnalysis");
const calculateRiskScore = require("../ai/riskScoring");


// ================= REGISTER =================

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // AI Password Analysis
    const passwordAnalysis = checkPasswordStrength(password);

    if (passwordAnalysis.strength === "Weak") {
      return res.status(400).json({
        message: "Weak Password",
        feedback: passwordAnalysis.feedback,
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User Registered Successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      passwordStrength: passwordAnalysis,
    });

  } catch (error) {
    res.status(500).json({
      message: "Registration Failed",
      error: error.message,
    });
  }
};


// ================= LOGIN =================

const loginUser = async (req, res) => {
  try {
    const {
      email,
      password,
      typingSpeed,
      mouseMovement,
      loginAttempts,
      deviceChanged,
      failedAttempts,
      newDevice,
      newLocation,
      suspiciousIP,
      requestCount,
      clickSpeed,
      userAgent,
    } = req.body;

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Password compare
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }

    // AI BOT Detection
    const botResult = detectBot({
      requestCount,
      clickSpeed,
      mouseMovement,
      userAgent,
      failedAttempts,
    });

    // AI Behavior Analysis
    const behaviorResult = analyzeBehavior({
      typingSpeed,
      mouseMovement,
      loginAttempts,
      deviceChanged,
    });

    // AI Anomaly Detection
    const anomalyResult = detectAnomaly({
      failedAttempts,
      newDevice,
      newLocation,
      suspiciousIP,
    });

    // AI Risk Score
    const riskResult = calculateRiskScore({
      failedAttempts,
      newDevice,
      newLocation,
      suspiciousIP,
      botDetected: botResult.isBot,
    });

    // Block dangerous login
    if (riskResult.blockAccess) {
      return res.status(403).json({
        message: "Access Blocked Due To High Risk",
        risk: riskResult,
      });
    }

    res.status(200).json({
      message: "Login Successful",

      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },

      aiSecurity: {
        botDetection: botResult,
        behaviorAnalysis: behaviorResult,
        anomalyDetection: anomalyResult,
        riskAnalysis: riskResult,
      },
    });

  } catch (error) {
    res.status(500).json({
      message: "Login Failed",
      error: error.message,
    });
  }
};


// ================= LOGOUT =================

const logoutUser = async (req, res) => {
  try {
    res.status(200).json({
      message: "Logout Successful",
    });
  } catch (error) {
    res.status(500).json({
      message: "Logout Failed",
      error: error.message,
    });
  }
};


module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};