const mongoose = require("mongoose");

// Schema
const Schema = mongoose.Schema;

// Model
const Model = mongoose.model(
  "NewsInfo", // news by topic and date
  new Schema({
    category: String, //search key word
    key: String, // unique id generate by source
    title: String, //news title
    link: String, //href
    time: String,
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
