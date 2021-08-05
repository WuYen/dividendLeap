const mongoose = require("mongoose");

// Schema
const Schema = mongoose.Schema;

// Model
const model = mongoose.model(
  "NewsInfo",
  new Schema({
    key: String,
    title: String, //new title
    link: String, //href
    time: String,
    updateDate: String,
  })
);

module.exports = model;
