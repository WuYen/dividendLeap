const userinfo = require("./model");

async function getData(query) {
  return await userinfo.findOne(query).exec();
}

async function setData(entity) {
  return await new userinfo(entity).save();
}

async function updateData(query, newdata) {
  return await userinfo.findOneAndUpdate(query, newdata, { upsert: true }).exec();
}

module.exports = {
  getData,
  setData,
  updateData,
};
