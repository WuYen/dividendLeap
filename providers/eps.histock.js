const puppeteer = require("puppeteer");
const { today } = require("../utilities/helper");

/**
 * Get EPS from histock(單季每股盈餘)
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

async function getRawData(stockNo) {
  const link = `https://histock.tw/stock/${stockNo}/%E6%AF%8F%E8%82%A1%E7%9B%88%E9%A4%98`;
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

  console.log("go to page");
  await page.goto(link);
  await page.waitForSelector(".tb-stock");

  console.log("start get data");
  const data = await page.evaluate(async () => {
    window.writeLog(`inside evaluate`);
    const temp = [];
    document.querySelectorAll("tr").forEach((tr, idx) => {
      if (idx == 0) {
        let yearRow = [];
        tr.querySelectorAll("th").forEach((td) => {
          parseInt(td.textContent) && yearRow.push(td.textContent);
        });
        temp.push(yearRow);
      } else if (idx > 0 && idx < 5) {
        let epsRow = [];
        tr.querySelectorAll("td").forEach((td) => {
          let eps = parseFloat(td.textContent) || 0;
          epsRow.push(eps);
        });
        temp.push(epsRow);
      }
    });
    return temp;
  });

  console.log("end get data [eps histock]", data);
  await browser.close();

  return data;
}

//把raw data 轉換成 mongo 要的格式
function processData(source) {
  let result = [];
  source[0].forEach((year, idx) => {
    result.push(
      {
        year: year, //年度 2019
        date: `${year} Q1`, // 2020 Q4
        quarter: "1", // 季度 1、2、3、4
        eps: source[1][idx], // 0.42 小數點兩位
      },
      {
        year: year, //年度 2019
        date: `${year} Q2`, // 2020 Q4
        quarter: "2", // 季度 1、2、3、4
        eps: source[2][idx], // 0.42 小數點兩位
      },
      {
        year: year, //年度 2019
        date: `${year} Q3`, // 2020 Q4
        quarter: "3", // 季度 1、2、3、4
        eps: source[3][idx], // 0.42 小數點兩位
      },
      {
        year: year, //年度 2019
        date: `${year} Q4`, // 2020 Q4
        quarter: "4", // 季度 1、2、3、4
        eps: source[4][idx], // 0.42 小數點兩位
      }
    );
  });
  return result;
}

module.exports = { getData };
