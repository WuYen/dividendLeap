const router = require("express").Router();

const { getDetail } = require("../services/stockServiceV2");

//個股除權息資料
router.get("/detail/:stockNo", async function (req, res) {
  let result = await getDetail(req.params.stockNo);
  return res.send(result);
});

module.exports = router;

//STOCK_DAY_AVG => 日收盤價及月平均收盤價
