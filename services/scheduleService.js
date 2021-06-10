const DayInfo = require("../models/dayInfo/repository");
const DividendSchedule = require("../models/dividendSchedule/repository");
const {
  today,
  mongooseQuickSetup,
  latestTradeDate,
} = require("../utility/helper");

async function getSchedule() {
  const schedule = await DividendSchedule.getData();
  const afterToday = afterDate(today());
  const filtedData = schedule.data.filter(afterToday).sort(byTime);
  const dayInfoCollection = await DayInfo.getData({
    date: latestTradeDate(),
  });

  const result = filtedData.map((x) => {
    let dayInfo = dayInfoCollection.find((y) => y.stockNo == x.stockNo);
    if (dayInfo) {
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

  return { success: true, data: result };
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

module.exports = { getSchedule };
