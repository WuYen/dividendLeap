const DayInfo = require("../models/dayInfo/repository");
const DividendSchedule = require("../models/dividendSchedule/repository");
const {
  tryParseFloat,
  today,
  mongooseQuickSetup,
  latestTradeDate,
} = require("../utility/helper");

async function getAllDayInfo() {
  const latestTRDT = latestTradeDate();
  const schedule = await DividendSchedule.getData();
  const afterLatestTRDT = afterDate(latestTRDT);
  const filtedData = schedule.data.filter(afterLatestTRDT).sort(byTime);
  const dayInfoCollection = await DayInfo.getData({
    date: latestTRDT,
  });

  const chunkSize = 8;
  const groups = filtedData
    .map((e, i) => {
      return i % chunkSize === 0 ? filtedData.slice(i, i + chunkSize) : null;
    })
    .filter((e) => {
      return e;
    });

  let count = 0;
  for (const group of groups) {
    for (const data of group) {
      if (!dayInfoCollection.find((x) => x.stockNo == data.stockNo)) {
        await delay(getRandomIntInclusive(1000, 3500));
        await DayInfo.getData({ stockNo: data.stockNo, date: latestTRDT });
        console.log(`write ${data.stockNo} data at ${new Date()}`);
        count++;
      }
    }
    await delay(getRandomIntInclusive(8000, 12000));
  }

  return { success: true, data: { DayInfoCount: count } };
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

// node .\services\dayInfoService
//mongooseQuickSetup(getAllDayInfo);
