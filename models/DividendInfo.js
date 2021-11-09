const mongoose = require("mongoose");
const provider = require("../providers/dividendInfo");
const { today } = require("../utilities/helper");

// Schema
const Schema = mongoose.Schema;

// Model
const Model = mongoose.model(
  "DividendInfoV2", // dividend history by stock no
  new Schema({
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

async function getData(stockNo, needLatest = false) {
  const query = {
    stockNo: stockNo,
    ...(needLatest && { updateDate: today() }),
  };
  let data = await Model.findOne(query).exec();
  if (!data) {
    let entity = await provider.getData(stockNo);
    data = await new Model(entity).save();
  }
  return data;
}

module.exports = Model;
module.exports.getData = getData;
