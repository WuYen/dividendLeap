const MyStockModel = require("../models/MyStock");
const { today } = require("../utilities/helper");

/**
 * Get user's stock profile
 * @param {Object} query { account }
 * @returns
 */
async function getList(query) {
  const data = await MyStockModel.getProfile(query);
  if (data == null) {
    return { account: query.account, list: [] };
  }
  return data;
}

/**
 * 取得user清單的type
 * @param {Object} query { account }
 * @returns
 */
async function getListType(query) {
  const data = await MyStockModel.getProfileType(query);
  return data;
}

/**
 * Add new stock to user
 * @param {Object} query { account, stockNo }
 * @returns
 */
async function add(query) {
  const { account, stockNo, type } = query;
  let data = await MyStockModel.getProfile(query);
  let payload = { stockNo, type };
  if (data) {
    //user has profile, add to exist list
    data.list.push(payload);
    saveResult = await data.save();
  } else {
    //create new profile
    let myStock = new MyStockModel({
      account: account,
      list: [payload],
      updateDate: today(),
    });
    saveResult = await myStock.save();
  }
  return saveResult.list.find((x) => x.stockNo == stockNo);
}

/**
 * Remove stock from user profile
 * @param {Object} query { account, id }
 * @returns
 */
async function remove(query) {
  let data = await MyStockModel.getProfile(query);
  let item = await data.list.id(query.id).remove();
  let result = await data.save(); //will be whole doc
  return item;
}

module.exports = { getList, add, remove, getListType };
