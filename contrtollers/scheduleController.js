const router = require("express").Router();
const { success } = require("../utilities/response");
const { getList, insert, update, remove } = require("../services/scheduleEditService");
const { getDetail } = require("../services/stockDetailService");
const { getSchedule, getScheduleV2, getTypes } = require("../services/scheduleService");

//取得所有schedule type
router.get("/menu", async function (req, res, next) {
  try {
    let result = await getTypes();
    console.log("menu", result);
    return res.send(success(result));
  } catch (error) {
    next(error);
  }
});

//除權息預告列表
router.get("/:type?", async function (req, res, next) {
  try {
    let type = req.params.type ? decodeURI(req.params.type) : "除權息預告";
    let result = { type, list: [] };
    result.list =
      req.query.version == "v2" ? await getScheduleV2({ sourceType: type }) : await getSchedule({ sourceType: type });
    req.query.menu && (result.menu = await getTypes());
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
