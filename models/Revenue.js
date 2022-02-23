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

async function getData(stockNo) {
  const query = { stockNo };
  let data = await Model.findOne(query).exec();
  if (!data) {
    let rawData = await provider.getData({ year: 2022, stockNo });
    let entities = provider.processData(stockNo, rawData);
    data = await Model.insertMany(entities);
  }
  return data;
}

module.exports = Model;
module.exports.getData = getData;
