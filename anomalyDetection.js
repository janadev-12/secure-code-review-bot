const detectAnomaly = (loginData) => {
  let anomalies = [];

  // Unusual login time
  const hour = new Date().getHours();

  if (hour >= 1 && hour <= 5) {
    anomalies.push("Unusual login time");
  }

  // Multiple failed attempts
  if (loginData.failedAttempts > 5) {
    anomalies.push("Too many failed attempts");
  }

  // New device detection
  if (loginData.newDevice) {
    anomalies.push("New device detected");
  }

  // New location detection
  if (loginData.newLocation) {
    anomalies.push("New location detected");
  }

  // Suspicious IP
  if (loginData.suspiciousIP) {
    anomalies.push("Suspicious IP address");
  }

  return {
    isAnomaly: anomalies.length > 0,
    anomalies,
  };
};

module.exports = detectAnomaly;