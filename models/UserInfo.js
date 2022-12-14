const mongoose = require('mongoose');

// Schema
const Schema = mongoose.Schema;

// Model
const Model = mongoose.model(
  'UserInfo',
  new Schema({
    account: String,
    password: String,
    name: String,
    email: String,
    lineToken: String,
    auth: {
      role: Number,
      twofe: Object,
    },
    status: {
      activity: Number,
      islogin: Boolean,
      ispwreset: Boolean,
    },
  })
);

async function getData(query) {
  return await Model.findOne(query).exec();
}

async function setData(entity) {
  return await new Model(entity).save();
}

async function updateData(query, newdata) {
  return await Model.findOneAndUpdate(query, newdata, { upsert: true }).exec();
}

module.exports = Model;
module.exports.getData = getData;
module.exports.setData = setData;
module.exports.updateData = updateData;
