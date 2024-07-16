const winston = require("winston");
const expressWinston = require("express-winston");

// logger de solicitud
module.exports = requestLogger = expressWinston.logger({
  transports: [new winston.transports.File({ filename: "request.log" })],
  format: winston.format.json(),
});

// logger de errores
module.exports = errorLogger = expressWinston.logger({
  transports: [new winston.transports.File({ filename: "error.log" })],
  format: winston.format.json(),
});