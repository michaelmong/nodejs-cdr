const { createLogger, format, transports } = require("winston");
const winstonDailyRotateFile = require("winston-daily-rotate-file");
const fs = require("fs");
const path = require("path");

const logDir = "log";

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const dailyRotateFileTransport = new transports.DailyRotateFile({
  filename: `${logDir}/%DATE%-results.log`,

  datePattern: "YYYY-MM-DD",
});

module.exports = logger = (logLevel, logMessage) => {
  switch (logLevel) {
    case "error":
      writeLog.error(logMessage);
      break;
    case "warn":
      writeLog.warn(logMessage);
      break;
    case "info":
      writeLog.info(logMessage);
      break;
    case "verbose":
      writeLog.verbose(logMessage);
      break;
    case "debug":
      writeLog.debug(logMessage);
      break;
    case "sally":
      writeLog.sally(logMessage);
      break;
  }
};

const writeLog = createLogger({
  level: "silly",

  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),

    format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
  ),

  transports: [dailyRotateFileTransport],
});
