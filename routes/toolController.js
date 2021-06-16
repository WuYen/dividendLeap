const router = require("express").Router();

const { latestTradeDate, today } = require("../utility/dateTime");

router.get("/lastTradeDate", async function (req, res) {
  let result = latestTradeDate();
  let today = today();
  return res.send({ lastTradeDate: result, today });
});

module.exports = router;
