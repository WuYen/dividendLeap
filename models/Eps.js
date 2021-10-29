const mongoose = require("mongoose");
const provider = require("../providers/eps");

// Schema
const Schema = mongoose.Schema;

// Model
const Model = mongoose.model(
  "Eps", // eps history from yahoo
  new Schema({
    stockNo: String,
    data: [
      {
        year: String, //年度 2019
        date: String, // 2020 Q4
        quarter: String, // 季度 1、2、3、4
        eps: Number, // 0.42 小數點兩位
      },
    ],
    updateDate: String,
  })
);

async function getData(stockNo) {
  const query = { stockNo: stockNo };
  let data = await Model.findOne(query).exec();
  if (!data) {
    data = await provider.getData(Model)(stockNo);
  }
  return data;
}

module.exports = Model;
module.exports.getData = getData;
