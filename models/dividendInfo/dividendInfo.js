const mongoose = require("mongoose");

// Schema
const Schema = mongoose.Schema;

// Model
const model = mongoose.model(
  "DividendInfo",
  new Schema({
    stockNo: String,
    stockName: String,
    data: Array,
    updateDate: String,
  })
);

module.exports = model;
