const detectBot = (requestData) => {
  let botScore = 0;
  let reasons = [];

  // Too many requests
  if (requestData.requestCount > 100) {
    botScore += 40;
    reasons.push("Too many requests");
  }

  // Very fast clicks or typing
  if (requestData.clickSpeed > 200) {
    botScore += 30;
    reasons.push("Unnaturally fast interaction");
  }

  // No mouse movement
  if (!requestData.mouseMovement) {
    botScore += 20;
    reasons.push("No mouse movement");
  }

  // Suspicious user agent
  if (
    requestData.userAgent &&
    requestData.userAgent.toLowerCase().includes("bot")
  ) {
    botScore += 50;
    reasons.push("Bot user-agent detected");
  }

  // Repeated login attempts
  if (requestData.failedAttempts > 10) {
    botScore += 40;
    reasons.push("Multiple failed login attempts");
  }

  return {
    isBot: botScore >= 60,
    botScore,
    reasons,
  };
};

module.exports = detectBot;