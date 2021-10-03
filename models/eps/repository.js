const EPS = require("./model");
const source = require("./source");

async function getDataProxy(stockNo) {
  const query = { stockNo: stockNo };
  let data = await EPS.findOne(query).exec();
  if (!data) {
    data = await source.getData(stockNo);
  }
  return data;
}

module.exports = {
  getData: getDataProxy,
  entity: EPS,
};
