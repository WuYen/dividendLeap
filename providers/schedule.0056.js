const { today, tryParseFloat, parseChineseDate, getDateFragment } = require('../utilities/helper');

let rawData = [
  {
    stockNo: '3034',
    stockName: '聯詠',
  },
  {
    stockNo: '2301',
    stockName: '光寶科',
  },
  {
    stockNo: '2454',
    stockName: '聯發科',
  },
  {
    stockNo: '2382',
    stockName: '廣達',
  },
  {
    stockNo: '2303',
    stockName: '聯電',
  },
  {
    stockNo: '2357',
    stockName: '華碩',
  },
  {
    stockNo: '2609',
    stockName: '陽明',
  },
  {
    stockNo: '1102',
    stockName: '亞泥',
  },
  {
    stockNo: '4938',
    stockName: '和碩',
  },
  {
    stockNo: '2002',
    stockName: '中鋼',
  },
  {
    stockNo: '2409',
    stockName: '友達',
  },
  {
    stockNo: '1101',
    stockName: '台泥',
  },
  {
    stockNo: '2377',
    stockName: '微星',
  },
  {
    stockNo: '2603',
    stockName: '長榮',
  },
  {
    stockNo: '2324',
    stockName: '仁寶',
  },
  {
    stockNo: '2347',
    stockName: '聯強',
  },
  {
    stockNo: '2356',
    stockName: '英業達',
  },
  {
    stockNo: '3231',
    stockName: '緯創',
  },
  {
    stockNo: '3702',
    stockName: '大聯大',
  },
  {
    stockNo: '2376',
    stockName: '技嘉',
  },
  {
    stockNo: '2385',
    stockName: '群光',
  },
  {
    stockNo: '3036',
    stockName: '文曄',
  },
  {
    stockNo: '3044',
    stockName: '健鼎',
  },
  {
    stockNo: '6176',
    stockName: '瑞儀',
  },
  {
    stockNo: '2449',
    stockName: '京元電子',
  },
  {
    stockNo: '2006',
    stockName: '東和鋼鐵',
  },
  {
    stockNo: '5522',
    stockName: '遠雄',
  },
  {
    stockNo: '2014',
    stockName: '中鴻',
  },
  {
    stockNo: '202212TX',
    stockName: '臺股期貨',
  },
  {
    stockNo: '2441',
    stockName: '超豐',
  },
];
let todayStr = today();
let data = rawData.map((x) => {
  return {
    stockNo: x.stockNo,
    stockName: x.stockName,
    year: '', //除息年度 2019
    month: '', //除息月份 01~12
    date: '', //除息日期 20190701
    cashDividen: '', //現金股利0.4
    updateDate: todayStr,
    sourceType: '0056成份',
  };
});
module.exports = { getData: () => data };
