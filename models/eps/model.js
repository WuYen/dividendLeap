const mongoose = require("mongoose");

// Schema
const Schema = mongoose.Schema;

// Model
const model = mongoose.model(
  "eps", // eps history from yahoo
  new Schema({
    stockNo: String,
    data: [
      {
        year: String, //年度 2019
        date: String, // 2020 Q4
        quarter: String, // 季度 1、2、3、4
        eps: Number, // 0.42 小數點兩位
      },
    ],
    updateDate: String,
  })
);

module.exports = model;
