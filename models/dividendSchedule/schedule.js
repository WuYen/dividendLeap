const mongoose = require("mongoose");

// Schema
const Schema = mongoose.Schema;

// Model
const model = mongoose.model(
  "Schedule",
  new Schema({
    data: Array,
    updateDate: String,
  })
);

module.exports = model;
