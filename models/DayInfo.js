const mongoose = require("mongoose");
const provider1 = require("../providers/dayInfo.twse");
const provider2 = require("../providers/dayInfo.cnyes");
const provider3 = require("../providers/dayInfo.finMind");

// Model
const Model = mongoose.model(
  "DayInfo", // history price by day
  new mongoose.Schema({
    stockNo: String,
    date: String, //完整日期 20200101
    year: String, //年度 2020
    month: String, //月份 01
    price: Number, //股價
    count: Number, //成交筆數
    updateDate: String,
    sourceType: String, //資料源:cnyes、twse、finMind
  })
);

/**
 * 查詢個股每日盤後
 * @param {Object} query { stockNo, date }
 * @returns
 */
async function getData(query) {
  if (query.stockNo) {
    //by date and stockNo
    let data = await Model.findOne(query).exec();
    !data && (data = await provider1.getData(query));
    !data && (data = await provider2.getData(query));
    const result = await new Model(data).save();
    return result;
  } else {
    //by date
    return await Model.find(query).exec();
  }
}
async function reset(query) {
  await Model.deleteOne(query);
  let entity = await provider3.getData(query);
  data = await new Model(entity).save();
}

module.exports = Model;
module.exports.getData = getData;
module.exports.reset = reset;
module.exports.provider1 = provider1; //twse
module.exports.provider2 = provider2; //cnyes
module.exports.provider3 = provider3; //finMind
