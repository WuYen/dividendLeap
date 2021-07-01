const router = require("express").Router();
const jwt = require("jsonwebtoken");
const config = require("../utility/config");

const { getData } = require("../models/user/repository");

router.post("/login", async (req, res) => {
  const { isValid, user } = await getData(req.body); //{account, password}
  if (isValid) {
    const accessToken = jwt.sign(user, config.TOKEN_SECRET);
    res.send({ success: true, data: accessToken });
  } else {
    res.send({ success: false, data: null });
  }
});

router.get("/validate", authentication, (req, res) => {
  const user = req.user;
  res.send(`${user.account} is valid`);
});

function authentication(req, res, next) {
  // Gather the jwt access token from the request header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401); // if there isn't any token

  jwt.verify(token, config.TOKEN_SECRET, (err, user) => {
    console.log(err);
    if (err) return res.sendStatus(403);
    req.user = user;
    next(); // pass the execution off to whatever request the client intended
  });
}

module.exports = router;
