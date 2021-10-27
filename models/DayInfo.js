const mongoose = require("mongoose");

// Schema
const Schema = mongoose.Schema;

// Model
const model = mongoose.model(
  "DayInfo", // history price by day
  new Schema({
    stockNo: String,
    date: String, //完整日期 20200101
    year: String, //年度 2020
    month: String, //月份 01
    price: Number, //股價
    count: Number, //成交筆數
    updateDate: String,
    sourceType: String, //資料源:cnyes、twse
  })
);

module.exports = model;
