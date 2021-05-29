const mongoose = require("mongoose");

// Schema
const Schema = mongoose.Schema;

// Model
const model = mongoose.model(
  "DividendInfoV2",
  new Schema({
    // stockId: Schema.Types.ObjectId,
    stockNo: String,
    data: [
      {
        year: String, //除息年度 2019
        date: String, //除息日期 20190701
        value: Number, //除權息前股價
        cashDividen: Number, //配息 0.4
        stockDividen: Number, //配股 0.6
        yieldRateCash: Number, //現金殖利率 1.5
        yieldRateStock: Number, //股票殖利率 1.5
        yieldRateTotal: Number, //合計殖利率 1.5
        PE_Rate: Number, //本益比
        EPS: Number, //EPS
        fillDay: String, //填息天數
        fillDate: String, //填息日期
      },
    ],
    updateDate: String,
  })
);

module.exports = model;
