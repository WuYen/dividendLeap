const mongoose = require("mongoose");
//const provider = require("../providers/eps");
const provider = require("../providers/eps.histock");

// Schema
const Schema = mongoose.Schema;

// Model
const Model = mongoose.model(
  "Eps", // eps history from yahoo
  new Schema({
    stockNo: String,
    data: [
      {
        year: String, //年度 "2021"
        date: String, // "2021 Q2"
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
    let entity = await provider.getData(stockNo);
    data = await new Model(entity).save();
  }
  return data;
}

async function reset(stockNo) {
  await Model.deleteOne({ stockNo });
  let entity = await provider.getData(stockNo);
  await new Model(entity).save();
}

// await EpsModel.deleteMany({
//   stockNo: {
//     $in: ["2412"],
//   },
// });

module.exports = Model;
module.exports.getData = getData;
module.exports.reset = reset;
