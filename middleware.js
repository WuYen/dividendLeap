const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");

// app.use(cors());
// app.use(bodyParser.json()); // Data parsing
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(morgan("tiny")); // HTTP request logger

module.exports = [
  cors(),
  bodyParser.json(),
  bodyParser.urlencoded({ extended: true }),
  morgan("tiny"),
];
