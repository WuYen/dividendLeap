const router = require("express").Router();
const { success } = require("../utility/response");
const { getDetail } = require("../services/stockDetailService");
const { getSchedule } = require("../services/scheduleService");

//個股除權息資料
router.get("/scheudle", async function (req, res, next) {
  try {
    let result = await getSchedule();
    return res.send(success(result));
  } catch (error) {
    next(error);
  }
});

//個股除權息資料
router.get("/detail/:stockNo", async function (req, res, next) {
  try {
    let result = await getDetail(req.params.stockNo);
    return res.send(success(result));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
