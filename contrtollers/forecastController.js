const router = require("express").Router();

//const auth = require("../utilities/auth");
const { success } = require("../utilities/response");
const { predict } = require("../services/forecastService");
const { getData } = require("../models/KD");

//router.use(auth.authentication);

router.get("/:stockNo", async function (req, res, next) {
  try {
    //const user = req.user;
    let result = await predict(req.params.stockNo, 2022);
    return res.send(success(result));
  } catch (error) {
    next(error);
  }
});

router.get("/kd/list", async function (req, res, next) {
  try {
    //const user = req.user;
    let result = await getData();
    return res.send(success(result));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
