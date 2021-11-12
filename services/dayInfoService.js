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
async function getAllDayInfoFixed(speedy = true) {
  const latestTRDT = latestTradeDate();
  const dayInfoCollection = await DayInfoModel.getData({
    date: latestTRDT,
  });
  const filtedData = StockListModel.stock_dividend.filter((e) => {
    return !dayInfoCollection.find((x) => x.stockNo == e.stockNo);
  });
  const totalCount = filtedData.length;

  console.log("getAllDayInfoFixed count:", totalCount);
  let successCount = 0;
  if (speedy) {
    for (let g = 0; g < Math.ceil(totalCount / 20); g++) {
      let groupData = [];
      for (let index = g * 20; index < (g + 1) * 20; index += 2) {
        const data = filtedData[index];
        const data2 = filtedData[index + 1];
        if (!data && !data2) {
          break;
        }
        try {
          let p1 =
            data &&
            DayInfoModel.provider2.getData({
              stockNo: data.stockNo,
              date: latestTRDT,
            });
          let p2 =
            data2 &&
            DayInfoModel.provider3.getData({
              stockNo: data2.stockNo,
              date: latestTRDT,
            });
          let throttle = delay(getRandomIntInclusive(800, 2000));
          let result = await Promise.all([p1, p2, throttle]);
          if (result[0]) {
            groupData.push(result[0]);
            console.log(`${index} get ${data.stockNo} data at ${new Date()}`);
          }
          if (result[1]) {
            groupData.push(result[1]);
            console.log(`${index + 1} get ${data2.stockNo} data at ${new Date()}`);
          }
        } catch (e) {
          console.log("getAllDayInfo error", e);
        }
      }
      successCount += groupData.length;
      groupData.length > 0 && (await DayInfoModel.insertMany(groupData));

      await delay(getRandomIntInclusive(2000, 4000));
    }
  } else {
    const groups = filtedData
      .map((e, i) => {
        return i % chunkSize === 0 ? filtedData.slice(i, i + chunkSize) : null;
      })
      .filter((e) => {
        return e;
      });
    for (const group of groups) {
      let groupData = [];
      for (const data of group) {
        console.log(`${successCount} start get data ${data.stockNo}`);

        try {
          let query = {
            stockNo: data.stockNo,
            date: latestTRDT,
          };

          let temp = await DayInfoModel.provider3.getData(query);
          groupData.push(temp);
          console.log(`get ${data.stockNo} data at ${new Date()}`);
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
  }

  return { DayInfoCount: totalCount, successCount };
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
