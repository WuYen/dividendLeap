const dotenv = require("dotenv");
dotenv.config(); // get config vars

const NODE_ENV = process.env.NODE_ENV;
const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT;
const DIVIDENDINFO_URL = process.env.DIVIDENDINFO_URL;
const TOKEN_SECRET = process.env.TOKEN_SECRET || "secret";
const MAIL_ACCOUNT = process.env.MAIL_ACCOUNT;
const MAIL_PASSWORD = process.env.MAIL_PASSWORD;
const FINMIND_TOKEN = process.env.FINMIND_TOKEN;
const FUGLE_TOKEN = process.env.FUGLE_TOKEN;
const FUGLE_URI = process.env.FUGLE_URI;

module.exports = {
  NODE_ENV,
  MONGODB_URI,
  PORT,
  DIVIDENDINFO_URL,
  TOKEN_SECRET,
  MAIL_ACCOUNT,
  MAIL_PASSWORD,
  FINMIND_TOKEN,
  FUGLE_TOKEN,
  FUGLE_URI,
};
