const Model = require("./model");
const source = require("./source.cnyes");

async function getDataProxy(query) {
  let data = await Model.findOne(query).exec();
  if (!data) {
    let { stockNo, year } = query;
    data = await source.getData(stockNo, year);
  }
  return data;
}

module.exports = {
  getData: getDataProxy,
  entity: Model,
};
