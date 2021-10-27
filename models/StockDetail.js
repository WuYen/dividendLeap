const mongoose = require("mongoose");

// Schema
const Schema = mongoose.Schema;

// Model
const model = mongoose.model(
  "StockDetail", // cache data for dividend detail page
  new Schema({
    stockNo: String,
    dDate: String, //"除息日",
    rate: String, //"今年殖利率%",
    price: String, // "當前股價",
    priceDate: String, // "當前股價 取樣日期",
    dCash: String, //"現金股利",
    rateLY: String, //"去年年殖利率%",
    rateAvg5: String, //"前五年平均殖利率%",
    rateAvg10: String, //"前十年平均殖利率%",
    priceLY: String, // "去年除息股價",
    dDateLY: String, // "去年除息日",
    dFDayLY: String, //最低的三個月份
    lowLY: [], //最低的三個月份
    HighLY: [], //最高的三個月份
    updateDate: String, //本筆資料 更新或是建立時間
  })
);

module.exports = model;
