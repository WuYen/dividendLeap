const router = require("express").Router();
const { success } = require("../utility/response");
const { getNews } = require("../services/newsService");

router.get("/:date", async function (req, res, next) {
  try {
    let data = await getNews(req.params.date);
    return res.send(success(data));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
