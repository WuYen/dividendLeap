const mongoose = require('mongoose');
const provider = require('../providers/schedule.twse');

// Schema
const Schema = mongoose.Schema;

// Model
const Model = mongoose.model(
  'Schedule', // dividend schedule
  new Schema({
    stockNo: String,
    stockName: String,
    year: String, //除息年度 2019
    month: String, //除息月份 01~12
    date: String, //除息日期 20190701
    cashDividen: Number, //現金股利0.4
    others: Array, //其他不再上面定義的欄位
    updateDate: String,
    sourceType: String, //(清單名稱) 0056,除權息預告...
  })
);

async function getData(query = {}) {
  let data = await Model.find(query).exec();
  if (data.length == 0 && query.sourceType == '除權息預告') {
    data = await updateAll();
  }
  return data;
}

/**
 * 從TWSE抓新的除權息預告
 * @returns
 */
async function updateAll() {
  let entity = await provider.getData();
  await Model.deleteMany({ sourceType: '除權息預告' });
  let data = await Model.insertMany(entity);
  return data;
}

async function getByStockNo(stockNo) {
  let data = await Model.findOne({ stockNo }).exec();
  return data;
}

async function getByQuery(query) {
  let data = await Model.find(query).exec();
  return data;
}

async function getTypes() {
  let data = await Model.distinct('sourceType');
  return data;
}

async function getDistinctNo() {
  let data = await Model.distinct('stockNo');
  return data;
}

module.exports = Model;
module.exports.getData = getData;
module.exports.getDistinctNo = getDistinctNo;
module.exports.updateAll = updateAll;
module.exports.getByStockNo = getByStockNo;
module.exports.getTypes = getTypes;
module.exports.getByQuery = getByQuery;
