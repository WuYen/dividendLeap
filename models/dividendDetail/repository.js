const Model = require("./model");
const { today } = require("../../utility/helper");
const source = require("./source");

async function getDataProxy(stockNo) {
  const query = { stockNo: stockNo };
  let data = await Model.find(query).exec();
  if (data.length == 0) {
    data = await source.getData(stockNo);
  }
  return data;
}

module.exports = {
  getData: getDataProxy,
};
