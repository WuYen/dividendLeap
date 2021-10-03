const router = require("express").Router();

const { success } = require("../utility/response");
const { predict } = require("../services/forcastService");

//const auth = require("../utility/auth");
//router.use(auth.authentication);
//const user = req.user;

router.get("/:stockNo", async function (req, res, next) {
  try {
    let result = await predict(req.params.stockNo, 2022);
    return res.send(success(result));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
