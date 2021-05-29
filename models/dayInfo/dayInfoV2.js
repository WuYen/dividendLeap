const mongoose = require("mongoose");

// Schema
const Schema = mongoose.Schema;

// Model
const model = mongoose.model(
  "DayInfo",
  new Schema({
    stockNo: String,
    fullData: String, //完整日期20200101
    year: String, //年度2020
    month: String, //月份01
    price: Number, //股價
    updateDate: String,
  })
);

module.exports = model;
