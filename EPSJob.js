const { mongooseQuickSetup } = require("./utilities/helper");
const { today } = require("./utilities/helper");
const puppeteer = require("puppeteer");
const EpsModel = require("./models/Eps");
const MyStockModel = require("./models/MyStock");

const chromeOptions = {
  // headless: true, // run in a non-headless mode
  // args: ["--incognito", "--no-sandbox", "--single-process", "--no-zygote"],
  // defaultViewport: null,
  // slowMo: 100, // slows down Puppeteer operation
  headless: false,
};

let browser;
let page;

mongooseQuickSetup(async () => {
  browser = await puppeteer.launch(chromeOptions);
  page = await browser.newPage();
  await page.exposeFunction("writeLog", (text) => {
    console.log(text);
  });
  await DoWork();
  await browser.close();
});

async function DoWork() {
  //let data = await EpsModel.distinct("stockNo");
  let user = await MyStockModel.getProfile({ account: "admin" });
  let data = user.list;

  await EpsModel.deleteMany({});

  let temp = [];
  for (let index = 0; index < data.length; index++) {
    const stockNo = data[index].stockNo;
    console.log("stockNo", stockNo);
    let result = await job(stockNo);
    temp.push(result);
    console.log(`index-${index}: ${stockNo}-${result.data.length}`);
  }
  await EpsModel.insertMany(temp);
}

async function job(stockNo) {
  try {
    let data = await getData(stockNo);
    await delay();
    return data;
  } catch (error) {
    console.log(`${stockNo} fail`);
  }
}

function delay() {
  return new Promise((res, rej) => {
    setTimeout(function () {
      res("continue");
    }, 1200);
  });
}

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

    return entity;
  } catch (error) {
    console.error("EPS source error", error);
    return null;
  }
}

// Data format
// [{
//   "year": 2021,
//   "date": "2021 Q2",
//   "eps": 1.91,
//   "epsQoQ": 0.4692,
//   "epsYoY": 2.0806,
//   "epsAcc4Q": null,
//   "avgPrice": "72.92"
// },
// ...]
async function getRawData(stockNo) {
  const link = `https://tw.stock.yahoo.com/quote/${stockNo}/eps`;

  await page.setDefaultNavigationTimeout(70000);

  console.log("go to page " + link);
  await page.goto(link);

  const data = await page.evaluate(async () => {
    // window.writeLog(`inside evaluate`);
    let data = window.App.main.context.dispatcher.stores.QuoteFinanceStore.epsTable.data;
    return data;
  });
  console.log("end get data " + link);

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

module.exports = { DoWork };

//node .\TestRun.js
