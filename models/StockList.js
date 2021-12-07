const mongoose = require("mongoose");
const provider = require("../providers/stockList");
const highYield = require("../providers/highYield");

const schema = new mongoose.Schema({
  stockNo: String,
  stockName: String,
  updateDate: String,
});

const Model = mongoose.model(
  "StockList", // all stock no and name
  schema
);

module.exports = Model;
module.exports.stock_dividend = provider.stock_dividend;
module.exports.highYieldData = highYield.data;
module.exports.getNameByNo = function (stockNo) {
  return provider.stocks_stolist.find((x) => x[0] == stockNo);
};
