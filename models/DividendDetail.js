const mongoose = require("mongoose");
const provider = require("../providers/dividendDetail");

// Schema
const Schema = mongoose.Schema;

// Model
const Model = mongoose.model(
  "DividendDetail",
  new Schema({
    stockNo: String,
    year: String, //除息年度 2019
    cashDividen: Number, //現金股利0.4
    cashDividenCapital: Number, //現金公積股利0.4
    cashDividenTotal: Number, //現金股利合計
    eps: Number, //EPS
    payoutRatio: Number, // payoutRatio = cashDividen/EPS
    updateDate: String,
  })
);

async function getData(stockNo) {
  const query = { stockNo: stockNo };
  let data = await Model.find(query).exec();
  if (data.length == 0) {
    data = await provider.getData(Model)(stockNo);
  }
  return data;
}

module.exports = Model;
module.exports.getData = getData;
