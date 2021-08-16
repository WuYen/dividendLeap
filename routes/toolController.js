const router = require("express").Router();
const { success } = require("../utility/response");
const { today, latestTradeDate } = require("../utility/dateTime");

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

module.exports = router;
