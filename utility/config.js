const dotenv = require("dotenv");
dotenv.config(); // get config vars

const NODE_ENV = process.env.NODE_ENV;
const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT;
const DIVIDENDINFO_URL = process.env.DIVIDENDINFO_URL;
const TOKEN_SECRET = process.env.TOKEN_SECRET || "secret";

module.exports = {
  NODE_ENV,
  MONGODB_URI,
  PORT,
  DIVIDENDINFO_URL,
  TOKEN_SECRET,
};
