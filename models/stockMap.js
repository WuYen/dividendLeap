const mongoose = require("mongoose");

// Schema
const Schema = mongoose.Schema;

// Model
const model = mongoose.model(
  "StockMap",
  new Schema({
    stockNo: String,
    stockName: String,
  })
);

module.exports = model;
