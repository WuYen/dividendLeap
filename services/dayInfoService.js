const DayInfoModel = require("../models/DayInfo");
const ScheduleModel = require("../models/Schedule");
const StockListModel = require("../models/StockList");
const { latestTradeDate } = require("../utilities/helper");

//根據 dividendSchedule 取得 清單上的個股每天盤後\
const chunkSize = 10;
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

//取得固定列表歷史資料
async function getAllDayInfoFixed() {
  const latestTRDT = latestTradeDate();
  const dayInfoCollection = await DayInfoModel.getData({
    date: latestTRDT,
  });
  const filtedData = StockListModel.stock_dividend.filter((e) => {
    return !dayInfoCollection.find((x) => x.stockNo == e.stockNo);
  });

  const groups = filtedData
    .slice(0, 100)
    .map((e, i) => {
      return i % chunkSize === 0 ? filtedData.slice(i, i + chunkSize) : null;
    })
    .filter((e) => {
      return e;
    });

  let successCount = 0;
  for (const group of groups) {
    let groupData = [];
    for (const data of group) {
      console.log(`start get data ${data.stockNo}`);

      try {
        let query = {
          stockNo: data.stockNo,
          date: latestTRDT,
        };
        let temp = await DayInfoModel.provider2.getData(query);
        if (!temp) {
          temp = await DayInfoModel.provider1.getData(query);
        }
        groupData.push(temp);
        console.log(`${successCount} get ${data.stockNo} data at ${new Date()}`);
        successCount++;
        await delay(getRandomIntInclusive(800, 2400));
      } catch (e) {
        console.log("getAllDayInfo error", e);
      }

      //batch save
      groupData.length > 0 && DayInfoModel.insertMany(groupData);
    }
    await delay(getRandomIntInclusive(3000, 6000));
  }
  return { DayInfoCount: filtedData.length, successCount };
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
  getAllDayInfoFixed,
};
