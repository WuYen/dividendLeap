const router = require("express").Router();
const { success } = require("../utilities/response");
const { getList, insert, update, remove } = require("../services/scheduleEditService");
const { getDetail } = require("../services/stockDetailService");
const { getSchedule, getScheduleFixed } = require("../services/scheduleService");

//除權息預告列表
router.get("/:year?", async function (req, res, next) {
  try {
    const year = parseInt(req.params.year);
    if (year) {
      let result = await getScheduleFixed();
      return res.send(success(result));
    }
    let result = await getSchedule();
    return res.send(success(result));
  } catch (error) {
    next(error);
  }
});

//個股除權息資料
router.get("/detail/:stockNo/:year?", async function (req, res, next) {
  try {
    const currentYear = parseInt(req.params.year) || new Date().getFullYear();
    let result = await getDetail(req.params.stockNo, currentYear);
    return res.send(success(result));
  } catch (error) {
    next(error);
  }
});

//取得手動新增的除權資料清單
router.get("/list", async function (req, res, next) {
  try {
    let result = await getList();
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

//手動新增個股除權息資料
router.post("/update", async function (req, res, next) {
  try {
    let result = await update(req.body);
    return res.send(success(result));
  } catch (error) {
    next(error);
  }
});

//手動新增個股除權息資料
router.post("/remove", async function (req, res, next) {
  try {
    let result = await remove(req.body.id);
    return res.send(success(result));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
