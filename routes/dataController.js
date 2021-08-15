const router = require("express").Router();

const { success } = require("../utility/response");
const { getAllDayInfo } = require("../services/dayInfoService");
const { update } = require("../services/scheduleService");

//個股除權息資料
router.get("/getAllDayInfo", async function (req, res) {
  try {
    let result = await getAllDayInfo();
    return res.send(success(result));
  } catch (error) {
    next(error);
  }
});

//從twse拉新的schedule下來
router.get("/getNewSchedule", async function (req, res) {
  try {
    let result = await update();
    return res.send(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
