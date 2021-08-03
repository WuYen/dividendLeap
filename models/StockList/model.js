const mongoose = require("mongoose");

// Schema
const Schema = mongoose.Schema;

// Model
const model = mongoose.model(
  "StockList",
  new Schema({
    stockNo: String,
    stockName: String,
    updateDate: String,
  })
);

module.exports = model;
