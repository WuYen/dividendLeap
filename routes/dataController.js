const router = require("express").Router();

const { getAllDayInfo } = require("../services/dayInfoService");

//個股除權息資料
router.get("/getAllDayInfo", async function (req, res) {
  let result = await getAllDayInfo();
  return res.send(result);
});

module.exports = router;
