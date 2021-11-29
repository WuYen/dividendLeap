let rawData = [
  {
    stockNo: "2603",
    stockName: "長榮",
  },
  {
    stockNo: "2409",
    stockName: "友達",
  },
  {
    stockNo: "2324",
    stockName: "仁寶",
  },
  {
    stockNo: "3481",
    stockName: "群創",
  },
  {
    stockNo: "2883",
    stockName: "開發金",
  },
  {
    stockNo: "2357",
    stockName: "華碩",
  },
  {
    stockNo: "2377",
    stockName: "微星",
  },
  {
    stockNo: "2376",
    stockName: "技嘉",
  },
  {
    stockNo: "3231",
    stockName: "緯創",
  },
  {
    stockNo: "2382",
    stockName: "廣達",
  },
  {
    stockNo: "3702",
    stockName: "大聯大",
  },
  {
    stockNo: "2356",
    stockName: "英業達",
  },
  {
    stockNo: "2301",
    stockName: "光寶科",
  },
  {
    stockNo: "1101",
    stockName: "台泥",
  },
  {
    stockNo: "4938",
    stockName: "和碩",
  },
  {
    stockNo: "2915",
    stockName: "潤泰全",
  },
  {
    stockNo: "1102",
    stockName: "亞泥",
  },
  {
    stockNo: "2886",
    stockName: "兆豐金",
  },
  {
    stockNo: "3044",
    stockName: "健鼎",
  },
  {
    stockNo: "2542",
    stockName: "興富發",
  },
  {
    stockNo: "2385",
    stockName: "群光",
  },
  {
    stockNo: "2449",
    stockName: "京元電子",
  },
  {
    stockNo: "2458",
    stockName: "義隆",
  },
  {
    stockNo: "1434",
    stockName: "福懋",
  },
  {
    stockNo: "5522",
    stockName: "遠雄",
  },
  {
    stockNo: "2809",
    stockName: "京城銀",
  },
  {
    stockNo: "6176",
    stockName: "瑞儀",
  },
  {
    stockNo: "2108",
    stockName: "南帝",
  },
  {
    stockNo: "2441",
    stockName: "超豐",
  },
  {
    stockNo: "202112TX",
    stockName: "臺股期貨",
  },
  {
    stockNo: "2404",
    stockName: "漢唐",
  },
];

let todayStr = today();
let data = rawData.map((x) => {
  return {
    stockNo: x.stockNo,
    stockName: x.stockName,
    year: "", //除息年度 2019
    month: "", //除息月份 01~12
    date: "", //除息日期 20190701
    cashDividen: "", //現金股利0.4
    updateDate: todayStr,
    sourceType: "0056成份",
  };
});
module.exports = data;
