const mongoose = require("mongoose");

// Schema
const Schema = mongoose.Schema;

// Model
const Model = mongoose.model(
  "MyStock", // user's stock watch list
  new Schema({
    account: String,
    list: [{ stockNo: String, type: "" }], //type=>清單名稱(支援多清單)
    updateDate: String,
  })
);

async function getProfile(query) {
  let data = await Model.findOne({ account: query.account }).exec();
  return data;
}

async function getProfileType(query) {
  let data = await Model.find({ account: query.account }).distinct("list.type");
  return data;
}

module.exports = Model;
module.exports.getProfile = getProfile;
module.exports.getProfileType = getProfileType;
