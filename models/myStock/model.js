const mongoose = require("mongoose");

// Schema
const Schema = mongoose.Schema;

// Model
const model = mongoose.model(
  "MyStock", // user's stock watch list
  new Schema({
    account: String,
    list: [{ stockNo: String }],
    updateDate: String,
  })
);

module.exports = model;
