const mongoose = require("mongoose");

// Schema
const Schema = mongoose.Schema;

// Model
const model = mongoose.model(
  "DividendInfo",
  new Schema({
    // stockId: Schema.Types.ObjectId,
    stockNo: String,
    data: [
      {
        year: String, //除息年度 2019
        date: String, //除息日期 20190701
        dateFill: String, //填息日期 20190801
        yieldRate: Number, //殖利率total 1.5
        cashDividen: Number, //現金股利0.4
        stockDividen: Number, //股票股利0.6
      },
    ],
    updateDate: String,
  })
);

module.exports = model;
