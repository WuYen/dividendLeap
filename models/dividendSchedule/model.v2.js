const mongoose = require("mongoose");

// Schema
const Schema = mongoose.Schema;

// Model
const model = mongoose.model(
  "Schedule",
  new Schema({
    stockNo: String,
    stockName: String,
    year: String, //除息年度 2019
    month: String, //除息月份 01~12
    date: String, //除息日期 20190701
    cashDividen: Number, //現金股利0.4
    updateDate: String,
    sourceType: String, //twse、manual、wearn
  })
);

module.exports = model;
