const router = require("express").Router();

const { getDetail } = require("../services/stockDetailService");
const { getSchedule, insert } = require("../services/scheduleService");

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

//手動新增個股除權息資料
router.post("/insert", async function (req, res) {
  let result = await insert(req.body);
  return res.status(200).send(result);
});

module.exports = router;
