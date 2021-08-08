const router = require("express").Router();

const { getAllDayInfo } = require("../services/dayInfoService");
const { update } = require("../services/scheduleService");

//個股除權息資料
router.get("/getAllDayInfo", async function (req, res) {
  let result = await getAllDayInfo();
  return res.send(result);
});

//從twse拉新的schedule下來
router.get("/getNewSchedule", async function (req, res) {
  let result = await update();
  return res.send(result);
});

module.exports = router;
