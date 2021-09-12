const MyStock = require("../models/myStock/repository");

async function getList({ account }) {
  const data = await MyStock.getList({ account });
  if (data == null) {
    return { account: account, list: [] };
  }
  return data;
}

async function add({ account, stockNo }) {
  let result = await MyStock.add({ account, stockNo });
  return result;
}

async function remove({ account, id }) {
  let result = await MyStock.remove({ account, id });
  return result;
}

module.exports = { getList, add, remove };
