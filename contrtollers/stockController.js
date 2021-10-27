const router = require("express").Router();
const { success } = require("../utility/response");
const { getDetail } = require("../services/stockDetailService");
const { getSchedule, insert } = require("../services/scheduleService");

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

//手動新增個股除權息資料
router.post("/insert", async function (req, res, next) {
  try {
    let result = await insert(req.body);
    return res.send(success(result));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
