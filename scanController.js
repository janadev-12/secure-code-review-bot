const { analyzeCode, getLanguageLabel } = require("../scanner/codeScanner");
const { buildReport } = require("../scanner/reportBuilder");
const { validateCodeInput } = require("../utils/validators");
const { formatSuccessResponse } = require("../utils/responseFormatter");
const vulnerableSample = require("../sample/vulnerableSample");

const allowedLanguages = ["javascript", "python", "java", "php", "cpp"];

const getFileExtension = (language) => {
  if (language === "python") return "py";
  if (language === "java") return "java";
  if (language === "php") return "php";
  if (language === "cpp") return "cpp";
  return "js";
};

const scanCode = (req, res, next) => {
  try {
    const {
      code,
      language = "javascript",
      fileName
    } = req.body;

    const selectedLanguage = allowedLanguages.includes(language)
      ? language
      : "javascript";

    const validation = validateCodeInput(code);

    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        message: validation.message
      });
    }

    const finalFileName =
      fileName || `pasted-code.${getFileExtension(selectedLanguage)}`;

    const scanData = analyzeCode(code, selectedLanguage);

    const report = buildReport({
      fileName: finalFileName,
      language: getLanguageLabel(selectedLanguage),
      code,
      issues: scanData.issues,
      summary: scanData.summary
    });

    return res.status(200).json(
      formatSuccessResponse("Code scan completed successfully", report)
    );
  } catch (error) {
    next(error);
  }
};

const getSampleCode = (req, res) => {
  return res.status(200).json({
    success: true,
    code: vulnerableSample
  });
};

module.exports = {
  scanCode,
  getSampleCode
};