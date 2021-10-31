const router = require("express").Router();
const { success } = require("../utilities/response");
const { today, latestTradeDate } = require("../utilities/dateTime");
const { getAllDayInfo } = require("../services/dayInfoService");
const { update } = require("../services/scheduleService");

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

//個股除權息資料
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

module.exports = router;
