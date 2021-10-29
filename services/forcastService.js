const puppeteer = require("puppeteer");
const { today } = require("../utility/dateTime");
const connectDB = require("../utility/connectDB");
const config = require("../utility/config");
const requestCore = require("../utility/requestCore");

/**
 * Get EPS from yahoo(年度累季每股盈餘)
 * @param {Number} stockNo
 * @returns
 */
async function getData(stockNo) {
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
  console.log("end get data ", data);
  await browser.close();

  return data;
}

async function saveData(data) {
  await connectDB.toMongo(config.MONGODB_URI);

  const existData = await NewsInfo.getData({
    updateDate: today(),
    category: keyWord,
  });

  const newData = data.filter((x) => !existData.find((y) => y.key == x.key));

  await NewsInfo.saveData(newData);

  console.log("save data done " + keyWord, existData.length, data.length, newData.length);
}

/**
 * Get last 5 year avg payout ratio(from goodinfo)
 * @param {Number} stockNo
 * @param {Number} targetYear
 * @returns
 */
async function getAvgPayoutRatio(stockNo, targetYear) {
  let link = `https://goodinfo.tw/StockInfo/StockDividendPolicy.asp?STOCK_ID=${stockNo}`;

  const $ = await requestCore.getHTML(link);

  let rawData = parseRawData($);

  //convert html document to data
  function parseRawData($) {
    let result = [];
    $("#divDetail table tr[align='center']").each(function () {
      let columns = $(this).find("td");
      let year = columns.first().text();
      let ratio = columns.last().text();
      result.push({ year, ratio });
    });
    return result;
  }

  let sumRatio = 0;
  let count = 0;
  rawData.forEach(({ year, ratio }) => {
    if (+year < targetYear && +year >= targetYear - 5) {
      let r = parseFloat(ratio);
      if (r) {
        sumRatio += r;
        count++;
      }
    }
  });

  let avgRatio = parseFloat((sumRatio / count).toFixed(2));
  console.log("avgRatio", avgRatio);
  return avgRatio;
}

async function predict(stockNo = 1604, targetYear) {
  //targetYear-1的eps加總 可以推算出targetYear的現金股利
  let previousYear = targetYear - 1;
  //算出全年度的EPS
  let data = await getData(stockNo);
  let eps2020 = data.filter((x) => x.year == previousYear);
  let totalEPS = eps2020.reduce((accumulator, currentValue, currentIndex, array) => {
    return accumulator + parseFloat(currentValue.eps);
  }, 0);
  console.log("totalEPS", totalEPS);

  //取得盈餘分配%
  let avgPayoutRatio = await getAvgPayoutRatio(stockNo, targetYear);

  //預估明年股利 = 今年EPS * 盈餘分配率
  let estimate = (totalEPS * avgPayoutRatio) / 100;
  console.log("estimate", estimate);
  return estimate;
}

//pre-condition 連續五年配發股利
predict(1515, 2021);

module.exports = {
  predict,
};
