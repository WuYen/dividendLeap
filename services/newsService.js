const NewsInfo = require("../models/newsInfo/repository");

async function getNews(date) {
  const news = await NewsInfo.getData({ updateDate: date });

  return news;
}

module.exports = {
  getNews,
};
