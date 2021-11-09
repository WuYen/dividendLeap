const axios = require("axios");
const { today, tryParseFloat, parseChineseDate, getDateFragment, getPureDate } = require("../utilities/helper");
const config = require("../utilities/config");

/**
 * 從 finMind 抓個股新聞
 * @param {object} {date, stockNo}
 * @returns trade info of that date
 */
async function getData(query) {
  const { startDate, endDate, stockNo = "5522" } = query;
  const d1 = getDateFragment(startDate);
  const dt1 = d1.year + "-" + d1.month + "-" + d1.day;
  const d2 = getDateFragment(endDate);
  const dt2 = d2.year + "-" + d2.month + "-" + d2.day;
  let response = await axios.get(
    `https://api.finmindtrade.com/api/v4/data?dataset=TaiwanStockNews&data_id=${stockNo}&start_date=${dt1}&end_date=${dt2}&token=${config.FINMIND_TOKEN}`
  );
  let rawData = response.data.data;
  if (rawData && Array.isArray(rawData)) {
    let processedData = processData(rawData, stockNo);
    return processedData;
  }
  return null;
}

//把raw data 轉換成 mongo schema
function processData(source, stockNo) {
  let updateDate = today();
  let result = source.map((d) => {
    return {
      key: "key", // unique id generate by source
      category: stockNo, //search key word or StockNo
      title: d.title, //news title
      link: d.link, //href
      time: d.date, //"2021-08-05 18:00:12"
      source: d.source, //"Yahoo奇摩股市"
      updateDate,
    };
  });

  return result;
}

module.exports = { getData };

const finMindNews = {
  msg: "success",
  status: 200,
  data: [
    {
      date: "2021-09-02 22:57:54",
      stock_id: "2451",
      link: "https://tw.stock.yahoo.com/news/%E5%85%AC%E5%91%8A-%E5%89%B5%E8%A6%8B%E8%91%A3%E4%BA%8B%E6%9C%83%E6%B1%BA%E8%AD%B0%E8%AE%8A%E6%9B%B4110%E5%B9%B4%E8%82%A1%E6%9D%B1%E5%B8%B8%E6%9C%83%E5%8F%AC%E9%96%8B%E6%97%A5%E6%9C%9F-%E4%BE%9D%E9%87%91%E7%AE%A1%E6%9C%83-%E5%9B%A0%E6%87%89%E7%96%AB%E6%83%85%E5%85%AC%E9%96%8B%E7%99%BC%E8%A1%8C%E5%85%AC%E5%8F%B8%E8%82%A1%E6%9D%B1%E6%9C%83%E5%BB%B6%E6%9C%9F%E5%8F%AC%E9%96%8B%E7%9B%B8%E9%97%9C%E6%8E%AA%E6%96%BD-%E8%BE%A6%E7%90%86-092820235.html",
      source: "Yahoo奇摩股市",
      title:
        "【公告】創見董事會決議變更110年股東常會召開日期(依金管會「因應疫情公開發行公司股東會延期召開相關措施」辦理) - Yahoo奇摩股市",
    },
    {
      date: "2021-09-09 06:32:18",
      stock_id: "2451",
      link: "https://tw.stock.yahoo.com/news/%E5%85%AC%E5%91%8A-%E5%89%B5%E8%A6%8B-2021%E5%B9%B48%E6%9C%88%E5%90%88%E4%BD%B5%E7%87%9F%E6%94%B611-42%E5%84%84%E5%85%83-%E5%B9%B4%E5%A2%9E40-063218721.html",
      source: "Yahoo奇摩股市",
      title: "【公告】創見 2021年8月合併營收11.42億元 年增40.62% - Yahoo奇摩股市",
    },
  ],
};
