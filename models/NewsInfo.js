const mongoose = require("mongoose");

// Schema
const Schema = mongoose.Schema;

// Model
const model = mongoose.model(
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

module.exports = model;
