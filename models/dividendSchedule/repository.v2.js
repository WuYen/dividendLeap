const DividendSchedule = require("./model.v2");
const {
  mongooseQuickSetup,
  today,
  getDateFragment,
} = require("../../utility/helper");
const source = require("./source.twse.v2");

async function getData() {
  let data = await DividendSchedule.find().exec();
  if (data.length == 0) {
    data = await source.getData();
  }
  return { data, result: "ok" };
}

async function getByStockNo(stockNo) {
  let data = await DividendSchedule.findOne({ stockNo }).exec();
  return data;
}

async function update() {
  let data = await source.getData();
  return data;
}

async function insert(data) {
  try {
    const isVaild = validation(data);
    if (!isVaild) {
      throw new Error("Data is not vaild");
    }

    const { year, month } = getDateFragment(data.date);
    const entity = {
      stockNo: data.no,
      stockName: data.name,
      year: year, //除息年度 2019
      month: month,
      date: data.date, //除息日期 20190701
      cashDividen: data.value, //現金股利0.4
      updateDate: today(),
      sourceType: "manual",
    };

    const dividendSchedule = new DividendSchedule(entity);
    const result = await dividendSchedule.save();

    console.log(`insert Dividend Schedule success`, result);
    return result;
  } catch (error) {
    console.error(`insert Dividend Schedule fail`, error.message);
    return { data, error: error.message };
  }
}

function validation(data) {
  return true;
}

// mongooseQuickSetup(async () => {
//   // let data = await getData();
//   // console.log("getData result", data);

//   // let result = await getByStockNo("1215");
//   // console.log("getByStockNo result", result);
//   let result = await insert();
//   return result;
// });

module.exports = {
  getData,
  getByStockNo,
  update,
  insert,
  entity: DividendSchedule,
};
