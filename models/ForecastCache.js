const mongoose = require("mongoose");

// Schema
const Schema = mongoose.Schema;

// Model
const Model = mongoose.model(
  "ForecastCache", // cache data for dividend detail page
  new Schema({
    stockNo: String,
    priceDate: String, //本筆資料 更新或是建立時間
    payload: Object,
  })
);

async function getData(query) {
  //query => { stockNo, priceDate }
  let isExpire = false;
  let cache = await Model.findOne({ stockNo: query.stockNo }).exec();
  cache && (isExpire = cache.priceDate !== query.priceDate);
  return { cache, isExpire };
}

async function saveData(data) {
  await removeCache(data.stockNo);

  let model = new Model(data);

  await model.save();
}

async function removeCache(stockNo) {
  await Model.deleteOne({ stockNo: stockNo });
}

module.exports = Model;
module.exports.getData = getData;
module.exports.saveData = saveData;
module.exports.removeCache = removeCache;
