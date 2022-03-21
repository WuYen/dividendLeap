const mongoose = require("mongoose");
const provider = require("../providers/revenue.finMind");

// Schema
const Schema = mongoose.Schema;

// Model
const Model = mongoose.model(
  "Revenue", // Revenue history from yahoo
  new Schema({
    stockNo: String,
    year: String, //revenue_year "2021"
    data: [
      {
        date: String, // "20170101"
        month: String, //revenue_month 12
        revenue: Number,
      },
    ],
    updateDate: String,
  })
);

async function getData(query) {
  let data = await Model.find(query).exec();
  if (!data || data.length == 0) {
    let rawData = await provider.getData({ year: new Date().getFullYear(), stockNo: query.stockNo }); //一次抓五年
    let entities = provider.processData(query.stockNo, rawData);
    data = await Model.insertMany(entities);
  }
  return data;
}

module.exports = Model;
module.exports.getData = getData;
