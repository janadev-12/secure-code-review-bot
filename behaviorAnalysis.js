const analyzeBehavior = (behaviorData) => {
  let riskLevel = "Low";
  let warnings = [];

  // Typing speed analysis
  if (behaviorData.typingSpeed < 20) {
    warnings.push("Unusually slow typing");
  }

  if (behaviorData.typingSpeed > 120) {
    warnings.push("Bot-like typing speed detected");
  }

  // Mouse movement analysis
  if (!behaviorData.mouseMovement) {
    warnings.push("No mouse movement detected");
  }

  // Rapid login attempts
  if (behaviorData.loginAttempts > 10) {
    warnings.push("Too many login attempts");
  }

  // Device switching detection
  if (behaviorData.deviceChanged) {
    warnings.push("Frequent device switching");
  }

  // Risk level calculation
  if (warnings.length >= 3) {
    riskLevel = "High";
  } else if (warnings.length >= 1) {
    riskLevel = "Medium";
  }

  return {
    riskLevel,
    warnings,
  };
};

module.exports = analyzeBehavior;