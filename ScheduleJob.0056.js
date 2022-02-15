const { mongooseQuickSetup } = require("./utilities/helper");
const ScheduleModel = require("./models/Schedule");
const forecastService = require("./services/forecastService");

async function run() {
  mongooseQuickSetup(async () => {
    await DoWork();
  });
}

async function DoWork() {
  let list = await ScheduleModel.getData({ sourceType: "0056成份" });
  let results = [];
  console.log("list length", list.length);
  for (let index = 0; index < list.length; index++) {
    let temp = await job(index, list[index].stockNo);
    results.push(temp);
  }
  console.log("result", `source length:${list.length}, result length:${results.length}`);
}

async function job(index, stockNo) {
  try {
    let data = await forecastService.predict(stockNo, 2022);
    console.log(`Index:${index}-${stockNo} success`);
    await delay();
    return data;
  } catch (error) {
    console.log(`Index:${index}-${stockNo} fail`);
  }
}

function delay() {
  return new Promise((res, rej) => {
    setTimeout(function () {
      res("continue");
    }, 1800);
  });
}
run();
//module.exports = { DoWork, run };

//node .\TestRun.js
