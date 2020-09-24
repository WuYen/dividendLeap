const mongoose = require("mongoose");

// Schema
const Schema = mongoose.Schema;
const MonthInfoSchema = new Schema({
  stockNo: String,
  stockName: String,
  data: Array,
  updateDate: String,
});

// Model
const MonthInfo = mongoose.model("MonthInfo", MonthInfoSchema);

module.exports = MonthInfo;
