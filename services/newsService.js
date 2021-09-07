const NewsInfo = require("../models/newsInfo/repository");
const puppeteer = require("puppeteer");
const { today } = require("../utility/dateTime");
const connectDB = require("../utility/connectDB");
const config = require("../utility/config");

async function getNews(date) {
  const news = await NewsInfo.getData({ updateDate: date });

  return news;
}

async function getByKeyword(keyWord) {
  const link = `https://udn.com/search/word/2/${keyWord}`;
  const chromeOptions = {
    headless: true, // run in a non-headless mode
    args: ["--incognito", "--no-sandbox", "--single-process", "--no-zygote"],
    defaultViewport: null,
    slowMo: 100, // slows down Puppeteer operation
    //headless: false,
  };

  const browser = await puppeteer.launch(chromeOptions);
  const page = await browser.newPage();
  await page.exposeFunction("getToday", () => {
    return today();
  });
  await page.exposeFunction("writeLog", (text) => {
    console.log(text);
  });
  await page.exposeFunction("keyWord", () => keyWord);
  await page.setDefaultNavigationTimeout(70000);

  console.log("go to page " + keyWord);
  await page.goto(link);
  await page.waitForSelector(".search-total");

  console.log("start get data " + keyWord);
  const data = await page.evaluate(async () => {
    const keyWord = await window.keyWord();
    const todayStr = await window.getToday();
    window.writeLog(`inside evaluate today ${todayStr} ${keyWord}`);
    const temp = [];
    document
      .querySelectorAll(".story-list__news:not(.feature-guess__list)") //
      .forEach((node) => {
        const link = node.querySelector("a").getAttribute("href");
        const key = link.split("/").pop();
        const title = node.querySelector("a").getAttribute("aria-label");
        const time = node.querySelector("time").textContent; //2021-07-29 16:36:10

        temp.push({
          category: keyWord,
          key,
          title,
          link,
          time,
        });
      });

    return temp;
  });
  console.log("end get data " + keyWord, data.length);
  await browser.close();
  if (keyWord == "現金股利") {
    await connectDB.toMongo(config.MONGODB_URI);

    const existData = await NewsInfo.getData({ updateDate: today() });

    const newData = data.filter((x) => !existData.find((y) => y.key == x.key));

    await NewsInfo.saveData(newData);

    console.log(
      "save data done",
      existData.length,
      data.length,
      newData.length
    );
  }
  return data;
}

module.exports = {
  getNews,
  getByKeyword,
};
