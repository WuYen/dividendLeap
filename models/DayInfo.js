const mongoose = require("mongoose");
const provider1 = require("../providers/dayInfo.twse");
const provider2 = require("../providers/dayInfo.cnyes");

// Schema
const Schema = mongoose.Schema;

// Model
const Model = mongoose.model(
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

//custom query
async function getData(query) {
  //query => { stockNo, date }
  if (query.stockNo) {
    let data = await Model.findOne(query).exec();
    if (!data) {
      data = await provider1.getData(Model)(query);
    }
    return data;
  } else {
    return await Model.find(query).exec();
  }
}

module.exports = Model;
module.exports.getData = getData;
module.exports.getDataFromWeb = provider2.getData(Model);
