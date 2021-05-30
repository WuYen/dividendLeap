const mongoose = require("mongoose");

// Schema
const Schema = mongoose.Schema;

// Model
const model = mongoose.model(
  "DividendSchedule",
  new Schema({
    data: [
      {
        stockNo: String,
        stockName: String,
        year: String, //除息年度 2019
        date: String, //除息日期 20190701
        cashDividen: Number, //現金股利0.4
      },
    ],
    updateDate: String,
  })
);

module.exports = model;
