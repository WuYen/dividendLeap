const puppeteer = require("puppeteer");
const { today } = require("../utilities/helper");

/**
 * Get EPS from yahoo(單季每股盈餘)
 * @param {String} stockNo
 * @returns
 */
async function getData(stockNo = "") {
  try {
    let rawData = await getRawData(stockNo);

    let processedData = processData(rawData);

    let entity = {
      stockNo: stockNo,
      data: [...processedData],
      updateDate: today(),
    };

    // let epsInfo = new Model(entity);

    // let result = await epsInfo.save();
    //console.log(`save schedule success`, result);
    return entity;
  } catch (error) {
    console.error("EPS source error", error);
    return null;
  }
}

// Data format
// window.App.main.context.dispatcher.stores.QuoteFundamental.quote.data
// sectorName: "金融業"
// symbolName: "富邦金"
// systexId: "2881"
// price: "73.6"
// change: "-0.9"
// changePercent: "-1.21%"
// changeStatus: "down"

// window.App.main.context.dispatcher.stores.QuoteFundamental.fundamental.data.trendPrice
// "trendPrice": {
//   "text": "連3跌",
//   "trend": "",
//   "trendNow": "DOWN",
//   "day": 0,
//   "dayNow": 3,
//   "change": "-1.90",
//   "changePercent": "-2.52%"
// },
async function getRawData(stockNo) {
  const link = `https://tw.stock.yahoo.com/quote/${stockNo}/eps`;
  const chromeOptions = {
    headless: true, // run in a non-headless mode
    args: ["--incognito", "--no-sandbox", "--single-process", "--no-zygote"],
    defaultViewport: null,
    slowMo: 100, // slows down Puppeteer operation
    //headless: false,
  };

  const browser = await puppeteer.launch(chromeOptions);
  const page = await browser.newPage();
  await page.exposeFunction("writeLog", (text) => {
    console.log(text);
  });
  await page.setDefaultNavigationTimeout(70000);

  console.log("go to page " + link);
  await page.goto(link);

  console.log("start get data");
  const data = await page.evaluate(async () => {
    window.writeLog(`inside evaluate`);
    let data = window.App.main.context.dispatcher.stores.QuoteFinanceStore.epsTable.data;
    return data;
  });
  console.log("end get data [dayinfo yahoo]", data);
  await browser.close();

  return data;
}

//把raw data 轉換成 mongo 要的格式
function processData(source) {
  let result = source.map((data) => {
    return {
      year: data.year, //年度 2019
      date: data.date, // 2020 Q4
      quarter: data.date.substr(6), // 季度 1、2、3、4
      eps: data.eps, // 0.42 小數點兩位
    };
  });

  return result;
}

module.exports = { getData };
