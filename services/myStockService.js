const MyStockModel = require("../models/MyStock");

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
 * Add new stock to user
 * @param {Object} query { account, stockNo }
 * @returns
 */
async function add(query) {
  const { account, stockNo } = query;
  let data = await MyStockModel.getProfile(query);
  if (data) {
    //user has profile, add to exist list
    data.list.push({ stockNo });
    let result = await data.save();
    return result;
  } else {
    //create new profile
    let myStock = new MyStockModel({
      account: account,
      list: [{ stockNo }],
      updateDate: today(),
    });
    let result = await myStock.save();
    return result;
  }
}

/**
 * Remove stock from user profile
 * @param {Object} query { account, id }
 * @returns
 */
async function remove(query) {
  let data = await MyStockModel.getProfile(query);
  await data.list.id(query.id).remove();
  let result = await data.save();
  return result;
}

module.exports = { getList, add, remove };
