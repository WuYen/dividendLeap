const mongoose = require("mongoose");

// Schema
const Schema = mongoose.Schema;

// Model
const model = mongoose.model(
  "userinfo",
  new Schema({
    account: String,
    password: String,
    name: String,
    email: String,
    validateToken: String,
    auth: {
      role: Number,
      enableOTP: Boolean, // for client
      OTPToken: String,
    },
    //TODO: status not implenment
    status: {
      activity: Number,
      islogin: Boolean,
      ispwreset: Boolean,
    },
  })
);

module.exports = model;
