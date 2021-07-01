const DayInfo = require("./model");
const source1 = require("./source.twse");
const source2 = require("./source.cnyes");

async function getDataProxy(query) {
  //query => { stockNo, date }
  if (query.stockNo) {
    let data = await DayInfo.findOne(query).exec();
    if (!data) {
      data = await source1.getData(query);
    }
    return data;
  } else {
    return await DayInfo.find(query).exec();
  }
}

module.exports = {
  getData: getDataProxy,
  getData2: source2.getData,
  entity: DayInfo,
};
