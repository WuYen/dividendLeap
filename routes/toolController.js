const router = require("express").Router();

const { latestTradeDate, today } = require("../utility/dateTime");

router.get("/lastTradeDate", async function (req, res) {
  let result = latestTradeDate();
  let date = today();
  return res.send({ lastTradeDate: result, today: date });
});

module.exports = router;
