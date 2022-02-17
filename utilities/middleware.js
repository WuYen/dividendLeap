const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const logger = require("./logger");

module.exports = [
  cors(),
  express.json(),
  express.urlencoded({ extended: false }),
  morgan("tiny", { stream: logger.stream }),
];
