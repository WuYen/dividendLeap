const mongoose = require("mongoose");

// Schema
const Schema = mongoose.Schema;

// Model
const model = mongoose.model(
  "userinfo",
  new Schema({
    account:   String,
    password:  String,
    name:      String,
    status:  {
      islogin:   Boolean,
      ispwreset: Boolean,
    },
    mystock: Array
  })
);

module.exports = model;
