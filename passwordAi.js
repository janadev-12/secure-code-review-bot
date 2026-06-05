const checkPasswordStrength = (password) => {
  let score = 0;
  let feedback = [];

  // Minimum length
  if (password.length >= 8) {
    score += 20;
  } else {
    feedback.push("Password should be at least 8 characters");
  }

  // Uppercase check
  if (/[A-Z]/.test(password)) {
    score += 20;
  } else {
    feedback.push("Add at least one uppercase letter");
  }

  // Lowercase check
  if (/[a-z]/.test(password)) {
    score += 20;
  } else {
    feedback.push("Add at least one lowercase letter");
  }

  // Number check
  if (/[0-9]/.test(password)) {
    score += 20;
  } else {
    feedback.push("Add at least one number");
  }

  // Special character check
  if (/[^A-Za-z0-9]/.test(password)) {
    score += 20;
  } else {
    feedback.push("Add at least one special character");
  }

  // Password strength level
  let strength = "Weak";

  if (score >= 80) {
    strength = "Strong";
  } else if (score >= 50) {
    strength = "Medium";
  }

  return {
    strength,
    score,
    feedback,
  };
};

module.exports = checkPasswordStrength;