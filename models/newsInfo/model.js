const mongoose = require("mongoose");

// Schema
const Schema = mongoose.Schema;

// Model
const model = mongoose.model(
  "NewsInfo",
  new Schema({
    title: String, //new title
    link: String, //href
    updateDate: String,
  })
);

module.exports = model;
