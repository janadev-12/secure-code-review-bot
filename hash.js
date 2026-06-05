const bcrypt = require("bcrypt");


// ================= HASH PASSWORD =================

const hashPassword = async (password) => {
  try {

    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(
      password,
      saltRounds
    );

    return hashedPassword;

  } catch (error) {
    throw new Error("Password Hashing Failed");
  }
};


// ================= COMPARE PASSWORD =================

const comparePassword = async (
  password,
  hashedPassword
) => {
  try {

    const isMatch = await bcrypt.compare(
      password,
      hashedPassword
    );

    return isMatch;

  } catch (error) {
    throw new Error("Password Comparison Failed");
  }
};


module.exports = {
  hashPassword,
  comparePassword,
};