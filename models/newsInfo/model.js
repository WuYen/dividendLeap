const mongoose = require("mongoose");

// Schema
const Schema = mongoose.Schema;

// Model
const model = mongoose.model(
  "NewsInfo",
  new Schema({
    category: String, //search key word
    key: String,
    title: String, //news title
    link: String, //href
    time: String,
    updateDate: String,
  })
);

module.exports = model;
