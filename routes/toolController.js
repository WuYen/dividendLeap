const router = require("express").Router();

const {
  latestTradeDate,
  today,
  getTodayWithTZ,
} = require("../utility/dateTime");

router.get("/lastTradeDate", async function (req, res) {
  const options = {
    day: "2-digit", //(e.g., 02)
    month: "2-digit", //(e.g., 02)
    year: "numeric", //(e.g., 2019)
    timeZone: "Asia/Taipei",
    hour: "2-digit", //(e.g., 02)
    minute: "2-digit", //(e.g., 02)
    second: "2-digit", //(e.g., 02)
    hour12: true, // 24 小時制
  };
  function formatTo(format) {
    return (date) => date.toLocaleString(format, options);
  }

  return res.send({
    lastTradeDate: latestTradeDate(),
    today: today(),
    formatToZHTW: formatTo("zh-TW")(new Date()),
    serverTime: new Date(),
    serverTimeIOS: new Date().toISOString(),
    todayWithTZ: getTodayWithTZ(8),
  });
});

module.exports = router;
