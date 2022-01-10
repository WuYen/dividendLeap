const router = require("express").Router();

const { success } = require("../utilities/response");
const { getList, add, remove, getListType } = require("../services/myStockService");

const auth = require("../utilities/auth");

router.use(auth.authentication);

router.get("/list", async function (req, res, next) {
  try {
    const user = req.user;
    let result = (await getList({ account: user.account })).toObject();
    if (req.query.types) {
      result.types = await getListType({ account: user.account });
    }
    return res.send(success(result));
  } catch (error) {
    next(error);
  }
});

router.get("/list/types", async function (req, res, next) {
  try {
    const user = req.user;
    let result = await getListType({ account: user.account });
    return res.send(success(result));
  } catch (error) {
    next(error);
  }
});

router.get("/list/add/:type/:stockNo", async function (req, res, next) {
  try {
    const user = req.user;
    let result = await add({
      account: user.account,
      stockNo: req.params.stockNo,
      type: req.params.type,
    });
    return res.send(success(result));
  } catch (error) {
    next(error);
  }
});

router.post("/list/remove", async function (req, res, next) {
  try {
    const user = req.user;
    const { id } = req.body;
    let result = await remove({ account: user.account, id });
    return res.send(success(result));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
