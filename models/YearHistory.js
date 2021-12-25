const mongoose = require("mongoose");
const provider = require("../providers/yearHistory.twse");

// Schema
const Schema = mongoose.Schema;

// Model
const Model = mongoose.model(
  "YearHistory", // 歷年平均股價
  new Schema({
    stockNo: String,
    data: [
      {
        year: String, //年度 2019
        high: Number, //最高價
        hDate: String, //最高價日期
        low: Number, //最低價
        lDate: String, //最低價日期
        avg: Number, //收盤平均價
      },
    ],
    updateDate: String,
  })
);

async function getData(query) {
  let data = await Model.findOne(query).exec();
  if (!data) {
    let entity = await provider.getData(query);
    await new Model(entity).save();
    return entity;
  }
  return data;
}

async function reset(query) {
  await Model.deleteOne(query);
  let entity = await provider.getData(query);
  await new Model(entity).save();
}

module.exports = Model;
module.exports.getData = getData;
module.exports.reset = reset;
