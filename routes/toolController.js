const router = require("express").Router();

const { today, latestTradeDate } = require("../utility/dateTime");

router.get("/datetime", async function (req, res) {
  return res.send({
    today: today(),
    lastTradeDate: latestTradeDate(),
    serverDate: new Date(),
    serverTimeZone: new Date().getTimezoneOffset(),
  });
});

module.exports = router;
