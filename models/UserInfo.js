const mongoose = require("mongoose");

// Schema
const Schema = mongoose.Schema;

// Model
const model = mongoose.model(
  "UserInfo",
  new Schema({
    account: String,
    password: String,
    name: String,
    email: String,
    auth: {
      role: Number,
      twofe: Object,
    },
    status: {
      activity: Number,
      islogin: Boolean,
      ispwreset: Boolean,
    },
  })
);

module.exports = model;
