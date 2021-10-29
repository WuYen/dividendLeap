const DayInfoModel = require("../models/DayInfo");
const ScheduleModel = require("../models/Schedule");
const { latestTradeDate } = require("../utilities/helper");

//根據 dividendSchedule 取得 清單上的個股每天盤後\
const chunkSize = 8;
async function getAllDayInfo() {
  const latestTRDT = latestTradeDate();
  const schedule = await ScheduleModel.getData();
  const filtedData = schedule.filter(afterDate(latestTRDT)).sort(byTime);
  const dayInfoCollection = await DayInfoModel.getData({
    date: latestTRDT,
  });

  const groups = filtedData
    .map((e, i) => {
      return i % chunkSize === 0 ? filtedData.slice(i, i + chunkSize) : null;
    })
    .filter((e) => {
      return e;
    });

  let count = 0;
  let successCount = 0;
  for (const group of groups) {
    for (const data of group) {
      if (!dayInfoCollection.find((x) => x.stockNo == data.stockNo)) {
        count++;
        try {
          const action = data.sourceType == "manual" ? DayInfoModel.getData2 : DayInfoModel.getData;
          await delay(getRandomIntInclusive(1000, 3500));
          await action({
            stockNo: data.stockNo,
            date: latestTRDT,
          });
          successCount++;
          console.log(`write ${data.stockNo} data at ${new Date()}`);
        } catch (e) {
          console.log("getAllDayInfo error", e);
        }
      }
    }
    await delay(getRandomIntInclusive(8000, 12000));
  }
  return { DayInfoCount: count, successCount };
}

function afterDate(date) {
  return (item) => item.date > date;
}

function byTime(a, b) {
  if (a.date < b.date) {
    return -1;
  }
  if (a.date > b.date) {
    return 1;
  }
  return 0;
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

function delay(time) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve("continue");
    }, time);
  });
}

module.exports = {
  getAllDayInfo,
};
