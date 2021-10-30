const mongoose = require("mongoose");
const provider = require("../providers/stockList");

// Schema
const Schema = mongoose.Schema;

// Model
const model = mongoose.model(
  "StockList", // all stock no and name
  new Schema({
    stockNo: String,
    stockName: String,
    updateDate: String,
  })
);

module.exports = model;
module.exports.getNameByNo = function (stockNo) {
  return provider.stocks_stolist.find((x) => x[0] == stockNo);
};
