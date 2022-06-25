const winston = require("winston");

//  errorlogger
const errorLog = winston.createLogger({
  transports: [
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
    }),
  ],
});

// Datalogger
const dataLog = winston.createLogger({
  transports: [
    new winston.transports.File({
      filename: "logs/info.log",
      level: "data",
    }),
  ],
});

module.exports = { errorLog, dataLog };
