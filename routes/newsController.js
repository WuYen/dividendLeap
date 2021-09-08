const router = require("express").Router();
const { success } = require("../utility/response");
const { getNews } = require("../services/newsService");

router.get("/:date/:keyword", async function (req, res, next) {
  try {
    let keyword = decodeURI(req.params.keyword);
    let data = await getNews(req.params.date, keyword);
    return res.send(success(data));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
