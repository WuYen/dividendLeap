const router = require("express").Router();
const { success } = require("../utilities/response");
const { getNews, getByStock } = require("../services/newsService");

router.get("/stock/:stockNo", async function (req, res, next) {
  try {
    let data = await getByStock(req.params.stockNo);
    return res.send(success(data));
  } catch (error) {
    next(error);
  }
});

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
