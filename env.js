const dotenv = require("dotenv");

const loadEnv = () => {
  dotenv.config();

  if (!process.env.MONGO_URI) {
    throw new Error("❌ MONGO_URI is missing in .env file");
  }

  if (!process.env.SESSION_SECRET) {
    throw new Error("❌ SESSION_SECRET is missing in .env file");
  }

  console.log("✅ Environment Variables Loaded");
};

module.exports = loadEnv;