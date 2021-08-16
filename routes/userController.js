const router = require("express").Router();
const auth = require("../utility/auth");
const { getData } = require("../models/user/repository");
//const { success } = require("../utility/response");

router.post("/login", async (req, res, next) => {
  try {
    const { isValid, user } = await getData(req.body); //{account, password}
    if (isValid) {
      const token = auth.sign(user);
      res.send({ success: true, message: "登入成功", token: token });
    } else {
      res.send({ success: false, message: "登入失敗", token: null });
    }
  } catch (error) {
    next(error);
  }
});

router.get("/validate", auth.authentication, (req, res, next) => {
  try {
    const user = req.user;
    res.send({ success: true, message: "有效token" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
