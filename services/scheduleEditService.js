const DividendSchedule = require("../models/dividendSchedule/repository.v2");

async function getList() {
  const schedule = await DividendSchedule.getData({ sourceType: "manual" });

  return { success: true, data: schedule };
}

async function insert(data) {
  const isVaild = validation(data);
  if (!isVaild) {
    return { success: false, error: "Data is not vaild" };
  }

  let result = await DividendSchedule.insert(data);
  return { success: true, data: result };
}

async function update(data) {
  let result = await DividendSchedule.updateSingle(data);
  return { success: true, data: result };
}

async function remove(id) {
  let result = await DividendSchedule.remove(id);
  return { success: true, data: result };
}

function validation(data) {
  return true;
}

module.exports = { getList, insert, update, remove };
