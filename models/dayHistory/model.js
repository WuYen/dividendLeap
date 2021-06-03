const mongoose = require("mongoose");

// Schema
const Schema = mongoose.Schema;

// Model
const model = mongoose.model(
  "DayHistory",
  new Schema({
    stockNo: String,
    year: String, //年度 2019
    data: [
      {
        date: String, //交易日期 20190701
        month: String, //月份 01
        open: Number, //開盤價
        high: Number, //最高
        low: Number, //最低
        price: Number, //股價(收盤)
        count: Number, //成交股數
      },
    ],
    updateDate: String,
  })
);

module.exports = model;
