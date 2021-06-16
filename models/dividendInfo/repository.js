const DividendInfo = require("./model");
const { today } = require("../../utility/helper");
const source = require("./source");

async function getDataProxy(stockNo, needLatest = false) {
  const query = {
    stockNo: stockNo,
    ...(needLatest && { updateDate: today() }),
  };
  let data = await DividendInfo.findOne(query).exec();
  if (!data) {
    data = await source.getData(stockNo);
  }
  return data;
}

module.exports = {
  getData: getDataProxy,
  entity: DividendInfo,
};
