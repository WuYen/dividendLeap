const NewsInfo = require("../models/newsInfo/repository");
const puppeteer = require("puppeteer");

async function getNews(date) {
  const news = await NewsInfo.getData({ updateDate: date });

  return news;
}

async function getByKeyword(keyWord) {
  const link = "https://udn.com/news/index";
  const chromeOptions = {
    // headless: true, // run in a non-headless mode
    // args: ["--incognito", "--no-sandbox", "--single-process", "--no-zygote"],
    // defaultViewport: null,
    // slowMo: 100, // slows down Puppeteer operation
    headless: false,
  };

  const browser = await puppeteer.launch(chromeOptions);
  const page = await browser.newPage();

  await page.exposeFunction("writeLog", (text) => {
    console.log(text);
  });
  await page.exposeFunction("keyWord", () => keyWord);
  await page.setDefaultNavigationTimeout(70000);

  console.log("go to page");
  await page.goto(link);
  await page.waitForSelector(".menu-toggler.search");
  await page.click(".menu-toggler.search");

  console.log("start search");

  for (let index = 0; index < keyWord.length; index++) {
    const character = keyWord[index];
    await page.type('.overlay-menu input[type="search"]', character, {
      delay: 350,
    });
  }

  await page.click('.overlay-menu [aria-label="submit-search"]');
  await page.waitForSelector(".menu-toggler.search");
  await page.waitForSelector(".search-total");

  console.log("start get data " + keyWord);
  const data = await page.evaluate(async () => {
    // window.writeLog("inside evaluate today " + keyWord);
    const keyWord = await window.keyWord();
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
  console.log("end get data", data.length);
  await browser.close();
  return data;
}

module.exports = {
  getNews,
  getByKeyword,
};
