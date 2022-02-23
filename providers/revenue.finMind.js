const axios = require("axios");
const { today, tryParseFloat, parseChineseDate, getDateFragment, getPureDate } = require("../utilities/helper");
const config = require("../utilities/config");

/**
 * 從 finMind 抓每個月獲利
 * @param {object} {date, stockNo}
 * @returns trade info of that date
 */
async function getData(query) {
  try {
    const { year, stockNo = "5522" } = query;
    const beg = year - 5 + "-01-01";
    const end = year + "-12-31";
    const url = "https://api.finmindtrade.com/api/v4/data";
    let response = await axios.get(
      `${url}?dataset=TaiwanStockMonthRevenue&data_id=${stockNo}&start_date=${beg}&end_date=${end}&token=${config.FINMIND_TOKEN}`
    );

    return response.data.data;
  } catch (error) {
    console.log("finMind dayInfo error", error);
    return null;
  }
}
function processData(stockNo, data) {
  const tdStr = today();
  //distinct data year
  let yearSet = new Set();
  data.forEach((x) => {
    yearSet.add(x.revenue_year);
  });

  let entities = [...yearSet].map((y) => {
    let yd = data
      .filter((x) => x.revenue_year == y)
      .map((c) => {
        return {
          month: c.revenue_month,
          date: c.date.replace(/\D/g, ""),
          revenue: c.revenue,
        };
      });

    return {
      stockNo: stockNo,
      year: y, //revenue_year "2021"
      data: yd,
      updateDate: tdStr,
    };
  });
  return entities;
}

module.exports = { getData, processData };
