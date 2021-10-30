const mongoose = require("mongoose");
const provider = require("../providers/schedule.twse");

// Schema
const Schema = mongoose.Schema;

// Model
const Model = mongoose.model(
  "Schedule", // dividend schedule
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

async function getData(query = {}) {
  let data = await Model.find(query).exec();
  if (data.length == 0 && query.sourceType !== "manual") {
    data = await provider.getData(Model)();
  }
  return data;
}

/**
 * Update from provider
 * @returns
 */
async function update() {
  let data = await provider.getData();
  return data;
}

async function getByStockNo(stockNo) {
  let data = await Model.findOne({ stockNo }).exec();
  return data;
}

module.exports = Model;
module.exports.getData = getData;
module.exports.updateAll = update;
module.exports.getByStockNo = getByStockNo;
