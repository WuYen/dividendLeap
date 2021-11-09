const mongoose = require("mongoose");
const provider = require("../providers/NewsInfo.finMind");

// Schema
const Schema = mongoose.Schema;

// Model
const Model = mongoose.model(
  "NewsInfo", // news by topic and date
  new Schema({
    key: String, // unique id generate by source
    category: String, //search key word or StockNo
    title: String, //news title
    link: String, //href
    time: String, //"2021-08-05 18:00:12"
    source: String, //"Yahoo奇摩股市" "聯合新聞"
    updateDate: String,
  })
);

async function getData(query) {
  if (query.start && query.end) {
    return await getByRange(query);
  }
  let data = await Model.find(query).exec(); //{ updateDate: "yyyyMMdd" };

  return data;
}

async function getByRange(query) {
  const { start, end } = query;
  let result = await Model.aggregate([
    { $match: { updateDate: { $gte: start, $lte: end } } },
    {
      $group: {
        _id: "$updateDate",
        date: "$updateDate",
        news: { $push: "$$ROOT" },
      },
    },
  ]).exec();

  return result;
}

async function saveData(data) {
  let result = await Model.insertMany(data);
  return result;
}

module.exports = Model;
module.exports.getData = getData;
module.exports.saveData = saveData;
module.exports.provider = provider;
