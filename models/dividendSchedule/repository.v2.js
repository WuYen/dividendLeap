const DividendSchedule = require("./model.v2");
const { mongooseQuickSetup } = require("../../utility/helper");
const source = require("./source.twse.v2");

async function getData() {
  let data = await DividendSchedule.find().exec();
  if (data.length == 0) {
    data = await source.getData();
  }
  return { data, result: "ok" };
}

async function update() {
  let data = await source.getData();
  return data;
}

async function getByStockNo(stockNo) {
  let data = await DividendSchedule.findOne({ stockNo }).exec();
  return data;
}

// mongooseQuickSetup(async () => {
//   let data = await getData();
//   console.log("getData result", data);

//   let result = await getByStockNo("1215");
//   console.log("getByStockNo result", result);
//   return result;
// });

module.exports = {
  getData,
  update,
  getByStockNo,
  entity: DividendSchedule,
};
