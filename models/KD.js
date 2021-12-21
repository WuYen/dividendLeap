const mongoose = require("mongoose");

// Schema
const Schema = mongoose.Schema;

// Model
const Model = mongoose.model(
  "KD",
  new Schema({
    stockNo: String,
    stockName: String,
    k: Number,
    d: Number,
    updateDate: String,
  })
);

async function getData(query) {
  return await Model.find().exec();
}

module.exports = Model;
module.exports.getData = getData;
