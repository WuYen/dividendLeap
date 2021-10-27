const mongoose = require("mongoose");

// Schema
const Schema = mongoose.Schema;

// Model
const model = mongoose.model(
  "StockList", // all stock no and name
  new Schema({
    stockNo: String,
    stockName: String,
    updateDate: String,
  })
);

module.exports = model;
