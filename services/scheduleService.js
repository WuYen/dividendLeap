const DayInfoModel = require("../models/DayInfo");
const ScheduleModel = require("../models/Schedule");
const { stock_dividend } = require("../providers/stockList");

const { today, latestTradeDate } = require("../utilities/helper");

async function getSchedule(query) {
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

  const schedule = await ScheduleModel.getData(query);
  const afterToday = afterDate(today());

  const filtedData = query.sourceType == "twse" ? schedule.filter(afterToday).sort(byTime) : schedule.sort(byTime);
  const dayInfoCollection = await DayInfoModel.getData({
    date: latestTradeDate(),
  });

  const result = filtedData.map((x) => {
    let dayInfo = dayInfoCollection.find((y) => y.stockNo == x.stockNo);
    if (dayInfo && dayInfo.price > 0) {
      return {
        ...x.toObject(),
        rate: ((x.cashDividen / dayInfo.price) * 100).toFixed(2), //"今年殖利率%"
        price: dayInfo.price, // "當前股價"
        priceDate: dayInfo.date, // "當前股價 取樣日期"
      };
    } else {
      return x;
    }
  });

  return result;
}

async function getScheduleFixed() {
  const schedule = stock_dividend;
  const dayInfoCollection = await DayInfoModel.getData({
    date: latestTradeDate(),
  });

  const result = schedule.map((x) => {
    let dayInfo = dayInfoCollection.find((y) => y.stockNo == x.stockNo);
    if (dayInfo && dayInfo.price > 0) {
      return {
        ...x,
        price: dayInfo.price, // "當前股價"
        priceDate: dayInfo.date, // "當前股價 取樣日期"
      };
    } else {
      return x;
    }
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
  return result;
}

module.exports = { getSchedule, getScheduleFixed, update, getTypes };
