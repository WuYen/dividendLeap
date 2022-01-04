const mongoose = require("mongoose");
const provider = require("../providers/dayHistory.cnyes");

// Schema
const Schema = mongoose.Schema;

// Model
const Model = mongoose.model(
  "DayHistory", // history price by year
  new Schema({
    stockNo: String,
    year: String, //年度 2019
    data: [
      {
        date: String, //交易日期 20190701
        month: String, //月份 01
        open: Number, //開盤價
        high: Number, //最高
        low: Number, //最低
        price: Number, //股價(收盤)
        count: Number, //成交股數
      },
    ],
    updateDate: String,
  })
);

async function getData(query) {
  let data = await Model.findOne(query).exec();
  if (!data) {
    let entity = await provider.getData(query);

    await Model.deleteMany(query);

    await new Model(entity).save();

    return entity;
  }
  return data;
}

async function getMany(query) {
  let data = await Model.find(query).exec();
  return data
    .sort((a, b) => {
      return a.year == b.year ? 0 : a.year > b.year ? -1 : 1;
    })
    .slice(0, 5);
}

module.exports = Model;
module.exports.getData = getData;
module.exports.getMany = getMany;
