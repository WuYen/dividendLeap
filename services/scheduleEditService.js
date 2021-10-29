const ScheduleModel = require("../models/Schedule");
const { today, getDateFragment } = require("../utilities/helper");

async function getList() {
  const schedule = await ScheduleModel.getData({ sourceType: "manual" });

  return schedule;
}

async function insert(data) {
  const isVaild = validation(data);
  if (!isVaild) {
    throw { name: "insert fail", message: "Data is not vaild" };
  }

  const { year, month } = getDateFragment(data.date); //處理日期
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

  const schedule = new ScheduleModel(entity);
  const result = await schedule.save();

  console.log(`insert Schedule success`, result);
  return result;
}

async function update(data) {
  const { year, month } = getDateFragment(data.date);
  let result = await ScheduleModel.updateOne(
    { sourceType: "manual", _id: data.id },
    {
      stockNo: data.no,
      stockName: data.name,
      year: year, //除息年度 2019
      month: month,
      date: data.date, //除息日期 20190701
      cashDividen: data.value, //現金股利0.4
      updateDate: today(),
    }
  );
  return result;
}

async function remove(id) {
  let result = await ScheduleModel.findOneAndDelete({ _id: id }).exec();
  return result;
}

function validation(data) {
  return true;
}

module.exports = { getList, insert, update, remove };
