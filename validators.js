// ================= EMAIL VALIDATION =================

export const validateEmail = (email) => {

  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email);
};


// ================= PASSWORD VALIDATION =================

export const validatePassword = (password) => {

  // Minimum 8 chars,
  // uppercase,
  // lowercase,
  // number,
  // special char

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

  return passwordRegex.test(password);
};


// ================= USERNAME VALIDATION =================

export const validateUsername = (username) => {

  return username.length >= 3;
};