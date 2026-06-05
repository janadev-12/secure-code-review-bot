const fs = require("fs");
const path = require("path");


// Log file paths
const accessLogPath = path.join(
  __dirname,
  "../logs/access.log"
);

const errorLogPath = path.join(
  __dirname,
  "../logs/error.log"
);


// ================= ACCESS LOGGER =================

const logAccess = (message) => {

  const logMessage =
    `[${new Date().toISOString()}] ${message}\n`;

  fs.appendFileSync(accessLogPath, logMessage);
};


// ================= ERROR LOGGER =================

const logError = (message) => {

  const logMessage =
    `[${new Date().toISOString()}] ERROR: ${message}\n`;

  fs.appendFileSync(errorLogPath, logMessage);
};


module.exports = {
  logAccess,
  logError,
};