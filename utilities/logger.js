const winston = require("winston");
const config = require("./config");
require("winston-mongodb");

// creates a new Winston Logger
const options = {
  level: "info",
  transports: [new winston.transports.Console()],
  exitOnError: false,
};

if (config.NODE_ENV === "production") {
  options.transports.push(new winston.transports.MongoDB({ db: config.MONGODB_URI }));
}

const logger = new winston.createLogger(options);
logger.stream = {
  write: function (message, encoding) {
    logger.info(message);
  },
};
module.exports = logger;
