const MyStock = require("./model");
const { today } = require("../../utility/helper");

async function getList({ account }) {
  const query = { account: account };
  let data = await MyStock.findOne(query).exec();

  return data;
}

async function add({ account, stockNo }) {
  const query = { account: account };
  let data = await MyStock.findOne(query).exec();
  if (data) {
    data.list.push({ stockNo });

    let result = await data.save();

    return result;
  } else {
    let myStock = new MyStock({
      account: account,
      list: [{ stockNo }],
      updateDate: today(),
    });

    let result = await myStock.save();

    return result;
  }
}

async function remove({ account, id }) {
  const query = { account: account };
  let data = await MyStock.findOne(query).exec();

  await data.list.id(id).remove();

  let result = await data.save();

  return result;
}

module.exports = {
  getList,
  add,
  remove,
};
