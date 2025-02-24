// const log = require("npmlog");
// const fs = require("fs");
// const path = require("path");

// // defining the path to the error log file
// const logFilePath = path.join(__dirname, "../../logs/error.log");

// // configuring npmlog to write logs to the error log file
// log.stream = fs.createWriteStream(logFilePath, { flags: "a" });

// module.exports = log;

const logsDir = path.join(__dirname, '../../logs');
const logFilePath = path.join(logsDir, 'error.log');

if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

if (!fs.existsSync(logFilePath)) {
  fs.writeFileSync(logFilePath, '');
}

log.stream = fs.createWriteStream(logFilePath, { flags: 'a' });

module.exports = log;
