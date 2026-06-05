const calculateRiskScore = (loginData) => {
  let riskScore = 0;
  let riskFactors = [];

  // Failed login attempts
  if (loginData.failedAttempts > 5) {
    riskScore += 40;
    riskFactors.push("Too many failed login attempts");
  }

  // New device login
  if (loginData.newDevice) {
    riskScore += 20;
    riskFactors.push("Login from new device");
  }

  // New location login
  if (loginData.newLocation) {
    riskScore += 25;
    riskFactors.push("Login from new location");
  }

  // Suspicious IP address
  if (loginData.suspiciousIP) {
    riskScore += 30;
    riskFactors.push("Suspicious IP address");
  }

  // Unusual login time
  const hour = new Date().getHours();

  if (hour >= 1 && hour <= 5) {
    riskScore += 15;
    riskFactors.push("Unusual login time");
  }

  // Bot detected
  if (loginData.botDetected) {
    riskScore += 50;
    riskFactors.push("Bot activity detected");
  }

  // Final risk level
  let riskLevel = "Low";

  if (riskScore >= 70) {
    riskLevel = "High";
  } else if (riskScore >= 40) {
    riskLevel = "Medium";
  }

  return {
    riskScore,
    riskLevel,
    riskFactors,
    blockAccess: riskScore >= 70,
  };
};

module.exports = calculateRiskScore;