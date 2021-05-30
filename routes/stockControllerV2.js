const router = require("express").Router();

const { getDetail, getSchedule } = require("../services/stockServiceV2");

//個股除權息資料
router.get("/scheudle", async function (req, res) {
  let result = await getSchedule();
  return res.send(result);
});

//個股除權息資料
router.get("/detail/:stockNo", async function (req, res) {
  let result = await getDetail(req.params.stockNo);
  return res.send(result);
});

module.exports = router;
