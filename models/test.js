const mongoose = require("mongoose");

// Schema
const Schema = mongoose.Schema;

// Model
const model = mongoose.model(
  "Test",
  new Schema({
    updateDate: String,
  })
);

module.exports = model;
