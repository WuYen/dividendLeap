const DividendSchedule = require("./model");
const {
  tryParseFloat,
  updateDate,
  mongooseQuickSetup,
  parseChineseDate,
} = require("../../utility/helper");
const source = require("./source.twse");

async function getDataProxy(needLatest = false) {
  const query = {
    ...(needLatest && { updateDate: updateDate() }),
  };
  let data = await DividendSchedule.findOne(query).exec();
  if (!data) {
    data = await source.getData();
  }
  return data;
}

module.exports = {
  getData: getDataProxy,
  entity: DividendSchedule,
};
