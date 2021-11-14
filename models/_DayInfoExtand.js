const mongoose = require("mongoose");

// Schema
const Schema = mongoose.Schema;

// Model
const Model = mongoose.model(
  "DayInfo", // history price by day
  new Schema({
    stockNo: String,
    stockName: String, //"富邦金"
    sectorName: String, //"金融業"
    price: String, //股價
    change: String, // change: "-0.9"
    changePercent: String, // changePercent: "-1.21%"
    changeStatus: String, // changeStatus: "down"
    trendPrice: {
      text: String, // "text": "連3跌",
      trend: String, // "trend": "",
      trendNow: String, // "trendNow": "DOWN",
      day: String, // "day": 0,
      dayNow: String, // "dayNow": 3,
      change: String, // "change": "-1.90",
      changePercent: String, // "changePercent": "-2.52%"
    },
    updateDate: String,
  })
);

// Data format
// window.App.main.context.dispatcher.stores.QuoteFundamental.quote.data
// sectorName: "金融業"
// symbolName: "富邦金"
// systexId: "2881"
// price: "73.6"
// change: "-0.9"
// changePercent: "-1.21%"
// changeStatus: "down"

// window.App.main.context.dispatcher.stores.QuoteFundamental.fundamental.data.trendPrice
// "trendPrice": {
//   "text": "連3跌",
//   "trend": "",
//   "trendNow": "DOWN",
//   "day": 0,
//   "dayNow": 3,
//   "change": "-1.90",
//   "changePercent": "-2.52%"
// },

//custom query
async function getData(query) {
  //query => { stockNo, date }
  if (query.stockNo) {
    let data = await Model.findOne(query).exec();
    // if (!data) {
    //   data = await provider1.getData(Model)(query);
    // }
    return data;
  } else {
    return await Model.find(query).exec();
  }
}

module.exports = Model;
module.exports.getData = getData;
