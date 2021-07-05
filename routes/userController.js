const router = require("express").Router();
const auth = require("../utility/auth");
const { getData } = require("../models/user/repository");

router.post("/login", async (req, res) => {
  const { isValid, user } = await getData(req.body); //{account, password}
  if (isValid) {
    const token = auth.sign(user);

    res.send({ success: true, message: "登入成功", token: token });
  } else {
    res.send({ success: false, data: null });
  }
});

router.get("/validate", auth.authentication, (req, res) => {
  const user = req.user;
  console.log("is valid", user);

  res.send({ success: true, message: "有效token" });
});

module.exports = router;
