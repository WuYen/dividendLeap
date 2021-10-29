const router = require("express").Router();
const auth = require("../utilities/auth");
const mailService = require("../services/mailService");
const { login, registration, accountValidate, resetPassword, registerOTP } = require("../services/userService");
//const { success } = require("../utilities/response");

router.post("/login", async (req, res, next) => {
  try {
    res.send(await login(req.body));
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("/registration", async (req, res, next) => {
  try {
    const { result, user } = await registration(req.body);
    if (user) {
      const { password, validateToken, ...clienUser } = user;

      mailService.sendMail(
        clienUser.email,
        mailService.contentTemplate.registration,
        `${req.get("Origin")}/validation?t=${validateToken}`
      );
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
    res.send(await resetPassword(req.body));
  } catch (error) {
    next(error);
  }
});

router.post("/accountvalidate", async (req, res, next) => {
  try {
    const { token } = req.body; //{token}
    res.send(await accountValidate(token));
  } catch (error) {
    next(error);
  }
});

//Validate OTP parameter
router.param("OTPaction", function (req, res, next, OTPaction) {
  ["generate", "confirm"].includes(OTPaction) ? next() : res.status(400).send();
});
router.post("/OTP/:OTPaction", async (req, res, next) => {
  try {
    const { account, token } = req.body;
    switch (req.params.OTPaction) {
      case "generate":
        res.send(await registerOTP(account));
        break;
      case "confirm":
        res.send(await registerOTP(account, token));
        break;

      default:
        res.status(404).send();
        break;
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/tokenvalidate", auth.authentication, (req, res, next) => {
  try {
    const user = req.user;
    res.send({ success: true, message: "有效token" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
