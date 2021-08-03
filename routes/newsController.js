const router = require("express").Router();

const { getNews } = require("../services/newsService");

router.get("/:date", async function (req, res) {
  let data = await getNews(req.params.date);
  return res.send(data);
});

module.exports = router;
