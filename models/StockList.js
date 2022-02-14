const mongoose = require("mongoose");
const provider = require("../providers/stockList");
const highYield = require("../providers/highYield");

// Schema
const Schema = mongoose.Schema;

const Model = mongoose.model(
  "StockList", // all stock no and name
  new Schema({
    stockNo: String,
    stockName: String,
    updateDate: String,
  })
);

module.exports = Model;
module.exports.stock_dividend = provider.stock_dividend;
module.exports.highYieldData = highYield.data;
module.exports.getInfoByNo = function (stockNo) {
  var result = provider.stockList.find((x) => x[0] == stockNo);
  return result || {};
};
