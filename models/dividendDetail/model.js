const mongoose = require("mongoose");

// Schema
const Schema = mongoose.Schema;

// Model
const model = mongoose.model(
  "DividendDetail",
  new Schema({
    stockNo: String,
    year: String, //除息年度 2019
    cashDividen: Number, //現金股利0.4
    cashDividenCapital: Number, //現金公積股利0.4
    cashDividenTotal: Number, //現金股利合計
    eps: Number, //EPS
    payoutRatio: Number, // payoutRatio = cashDividen/EPS
    updateDate: String,
  })
);

module.exports = model;
