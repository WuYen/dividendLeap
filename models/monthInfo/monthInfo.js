const mongoose = require("mongoose");

// Schema
const Schema = mongoose.Schema;

// Model
const model = mongoose.model(
  "MonthInfo",
  new Schema({
    stockNo: String,
    year: String,
    monthInfo: [{ key: String, value: Number }], //1~12每個月平均 key:month, value:avg price
    updateDate: String,
  })
);

module.exports = model;
