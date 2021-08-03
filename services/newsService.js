const NewsInfo = require("../models/newsInfo/repository");
const { latestTradeDate } = require("../utility/helper");

async function getNews(date) {
  const news = await NewsInfo.getData({ updateDate: date });

  return { success: true, data: news };
}

module.exports = {
  getNews,
};
