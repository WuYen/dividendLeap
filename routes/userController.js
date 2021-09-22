const router = require("express").Router();
const auth = require("../utility/auth");
const { loginstatus, activity } = require("../client/src/constants/status");
const {
  getData,
  getDataByCondition,
  setData,
  updateData,
} = require("../models/user/repository");
const mailService = require("../services/mailService");
//const { success } = require("../utility/response");

router.post("/login", async (req, res, next) => {
  try {
    const { result, user } = await getData(req.body); //{account, password}
    if (result !== loginstatus.Success) {
      res.send({ result: loginstatus.Failed, token: null });
    } else {
      const token = auth.sign(user);
      res.send({ result: result, token: token });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("/registration", async (req, res, next) => {
  try {
    const { result, user } = await setData(req.body);
    if (user) {
      const { password, validateToken, ...clienUser } = user;
      let { ...options } = mailService.OptionTemplate.registration;
      //TODO: validation route
      options.text += `http://localhost:3000/validation?t=${validateToken}`;
      mailService.sendMail(clienUser.email, options);
      res.send({ result: result, user: clienUser });
    } else {
      res.send({ result: result, user: null });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/resetpassword", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

router.post("/AccountValidate", async (req, res, next) => {
  try {
    const { token } = req.body; //{token}
    let query = `this.validateToken == "${token}"`;
    let user = await getDataByCondition(query);
    if (user) {
      user.validateToken = null;
      user.status.activity = activity.Active;
      let result = await updateData(query, user);
      res.send(result ? { result: "success" } : { result: "failed" });
    } else {
      res.send({ result: "failed" });
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
