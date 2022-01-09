const DayInfoModel = require("../models/DayInfo");
const ScheduleModel = require("../models/Schedule");
const StockListModel = require("../models/StockList");
const { latestTradeDate } = require("../utilities/helper");
const { getRandomIntInclusive, delay } = require("../utilities/delay");

//根據 dividendSchedule 取得 清單上的個股每天盤後
const chunkSize = 30;
async function getAllDayInfo() {
  const latestTRDT = latestTradeDate();
  const dayInfoCollection = await DayInfoModel.getData({
    date: latestTRDT,
  });

  const schedule = await ScheduleModel.getDistinctNo();
  //把已經有今天股價的從清單過濾掉
  const filtedData = schedule.filter((stockNo) => !dayInfoCollection.find((x) => x.stockNo == stockNo));
  const totalCount = filtedData.length;

  console.log("getAllDayInfo count:", totalCount);
  let successCount = 0;

  for (let g = 0; g < Math.ceil(totalCount / chunkSize); g++) {
    let groupData = [];
    for (let index = g * chunkSize; index < (g + 1) * chunkSize; index += 2) {
      const stockNo1 = filtedData[index];
      const stockNo2 = filtedData[index + 1];
      if (!stockNo1 && !stockNo2) {
        break;
      }
      try {
        let p1 =
          stockNo1 &&
          DayInfoModel.provider2.getData({
            stockNo: stockNo1,
            date: latestTRDT,
          });
        let p2 =
          stockNo2 &&
          DayInfoModel.provider3.getData({
            stockNo: stockNo2,
            date: latestTRDT,
          });
        let throttle = delay(getRandomIntInclusive(700, 1600));
        let result = await Promise.all([p1, p2, throttle]);
        if (result[0]) {
          groupData.push(result[0]);
          console.log(`${index} get ${stockNo1} data at ${new Date()}`);
        }
        if (result[1]) {
          groupData.push(result[1]);
          console.log(`${index + 1} get ${stockNo2} data at ${new Date()}`);
        }
      } catch (e) {
        console.log("getAllDayInfo error", e);
      }
    }
    successCount += groupData.length;
    groupData.length > 0 && (await DayInfoModel.insertMany(groupData));

    await delay(getRandomIntInclusive(2000, 4000));
  }

  return { DayInfoCount: totalCount, successCount };
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
    for (let g = 0; g < Math.ceil(totalCount / chunkSize); g++) {
      let groupData = [];
      for (let index = g * chunkSize; index < (g + 1) * chunkSize; index += 2) {
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
          await delay(getRandomIntInclusive(800, 1500));
        } catch (e) {
          console.log("getAllDayInfo error", e);
        }

        //batch save
        groupData.length > 0 && DayInfoModel.insertMany(groupData);
      }
      await delay(getRandomIntInclusive(2000, 5000));
    }
  }

  return { DayInfoCount: totalCount, successCount };
}

module.exports = {
  getAllDayInfo,
};
