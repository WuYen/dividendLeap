const DayInfoModel = require("../models/DayInfo");
const ScheduleModel = require("../models/Schedule");
const highYield = require("../providers/highYield");
const { stock_dividend } = require("../providers/stockList");

const { today, latestTradeDate } = require("../utilities/helper");

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

async function getSchedule(query) {
  const [schedule, dayInfoCollection] = await Promise.all([
    ScheduleModel.getData(query),
    DayInfoModel.getData({
      date: latestTradeDate(),
    }),
  ]);

  const filtedData =
    query.sourceType == "除權息預告" ? schedule.filter(afterDate(today())).sort(byTime) : schedule.sort(byTime);

  const result = filtedData.map((x) => {
    let dayInfo = dayInfoCollection.find((y) => y.stockNo == x.stockNo);
    let d = x.toObject();
    if (dayInfo) {
      d.rate = ((x.cashDividen / dayInfo.price) * 100).toFixed(2); //"今年殖利率%"
      d.price = dayInfo.price; // "當前股價"
      d.priceDate = dayInfo.date; // "當前股價 取樣日期"
    }
    if (d.others && d.others.length > 0) {
      d.others.forEach((element) => {
        d[element.key] = element.value;
      });
      delete d.others;
    }
    return d;
  });
  return result;
}

/**
 * update all schedule from provider
 * @returns
 */
async function update() {
  let result = await ScheduleModel.updateAll();
  return result;
}

async function getTypes() {
  let result = await ScheduleModel.getTypes();
  return result; //["高殖利率", "排行榜", ...result];
}

module.exports = { getSchedule, update, getTypes };
