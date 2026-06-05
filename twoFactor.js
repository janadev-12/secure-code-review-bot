const crypto = require("crypto");


// ================= GENERATE OTP =================

const generateOTP = () => {

  const otp = crypto
    .randomInt(100000, 999999)
    .toString();

  return otp;
};


// ================= VERIFY OTP =================

const verifyOTP = (userOTP, storedOTP) => {

  return userOTP === storedOTP;
};


module.exports = {
  generateOTP,
  verifyOTP,
};