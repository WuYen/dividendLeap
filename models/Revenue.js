const mongoose = require("mongoose");
const provider = require("../providers/revenue.finMind");

// Schema
const Schema = mongoose.Schema;

// Model
const Model = mongoose.model(
  "Revenue", // Revenue history from yahoo
  new Schema({
    stockNo: String,
    data: [
      {
        year: String, //revenue_year "2021"
        month: String, //revenue_month 12
        date: String, // "20170101"
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
    let entity = processData(stockNo, rawData);
    data = await new Model(entity).save();
  }
  return data;
}

function processData(stockNo, data) {
  //   var s = new Set();
  //   data.forEach((x) => {
  //     s.add(x.revenue_year);
  //   });
  //let years = [...s];

  let d = data.map((x) => ({
    year: x.revenue_year,
    month: x.revenue_month,
    date: x.date.replace(/\D/g, ""),
    revenue: x.revenue,
  }));

  let result = {
    stockNo: stockNo,
    data: d,
    updateDate: "20220223",
  };
  return result;
}

module.exports = Model;
module.exports.getData = getData;
