const mongoose = require("mongoose");

// Schema
const Schema = mongoose.Schema;

// Model
const Model = mongoose.model(
  "MyStock", // user's stock watch list
  new Schema({
    account: String,
    list: [{ stockNo: String }],
    updateDate: String,
  })
);

async function getProfile(query) {
  let data = await Model.findOne({ account: query.account }).exec();
  return data;
}

module.exports = Model;
module.exports.getProfile = getProfile;
