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
// module.exports.getNameByNo = function (stockNo) {
//   var temp = provider.info1.find((x) => x.stockNo == stockNo);
//   if (!temp) {
//     temp = provider.info2.find((x) => x.stockNo == stockNo);
//   }

//   return provider.stocks_stolist.find((x) => x[0] == stockNo);
// };
module.exports.getInfoByNo = function (stockNo) {
  var result = provider.info1.find((x) => x.stockNo == stockNo);
  if (!result) {
    result = provider.info2.find((x) => x.stockNo == stockNo);
  }
  if (!result) {
    var d = provider.stocks_stolist.find((x) => x[0] == stockNo);
    d &&
      (result = {
        stockNo: d[0],
        stockName: d[1],
        industry: "",
      });
  }
  return result;
};
