const router = require("express").Router();
const { success } = require("../utilities/response");
const { today, latestTradeDate } = require("../utilities/dateTime");
const { getAllDayInfo } = require("../services/dayInfoService");
const { update } = require("../services/scheduleService");
const { removeCache } = require("../services/stockDetailService");
const forecastService = require("../services/forecastService");

//取得server上的時區
router.get("/datetime", async function (req, res, next) {
  try {
    return res.send(
      success({
        today: today(),
        lastTradeDate: latestTradeDate(),
        serverDate: new Date(),
        serverTimeZone: new Date().getTimezoneOffset(),
      })
    );
  } catch (error) {
    next(error);
  }
});

//取得 dividendSchedule 清單上的個股每天盤後
router.get("/getAllDayInfo", async function (req, res, next) {
  try {
    let result = await getAllDayInfo();
    return res.send(success(result));
  } catch (error) {
    next(error);
  }
});

//從twse拉新的schedule下來
router.get("/getNewSchedule", async function (req, res, next) {
  try {
    let result = await update();
    return res.send(success(result));
  } catch (error) {
    next(error);
  }
});

//建立新的StockDetail
router.get("/removeCache/:stockNo", async function (req, res, next) {
  try {
    if (req.params.stockNo) {
      let result = await removeCache(req.params.stockNo);
      return res.send(success(result));
    }
    throw new Error("removeCache fail");
  } catch (error) {
    next(error);
  }
});

//移除這支股票相關的資料讓他重做
router.get("/reset/:stockNo", async function (req, res, next) {
  try {
    if (req.params.stockNo) {
      let result = await forecastService.resetDataSource(req.params.stockNo);
      return res.send(success(result));
    }
    throw new Error("reset fail");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
