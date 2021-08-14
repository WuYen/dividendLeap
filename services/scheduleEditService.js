const DividendSchedule = require("../models/dividendSchedule/repository.v2");

async function getList() {
  const schedule = await DividendSchedule.getData({ sourceType: "manual" });

  return schedule;
}

async function insert(data) {
  const isVaild = validation(data);
  if (!isVaild) {
    throw { name: "insert fail", message: "Data is not vaild" };
  }

  let result = await DividendSchedule.insert(data);
  return result;
}

async function update(data) {
  let result = await DividendSchedule.updateSingle(data);
  return result;
}

async function remove(id) {
  let result = await DividendSchedule.remove(id);
  return result;
}

function validation(data) {
  return true;
}

module.exports = { getList, insert, update, remove };
