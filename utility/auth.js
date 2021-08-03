const jwt = require("jsonwebtoken");
const config = require("./config");

/**
 * middleware for routing
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
function authentication(req, res, next) {
  // Gather the jwt access token from the request header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null)
    return res
      .status(401)
      .send({ success: false, message: "沒登入", token: null }); // if there isn't any token

  jwt.verify(token, config.TOKEN_SECRET, (err, user) => {
    console.log(err);
    if (err) return res.sendStatus(403);
    req.user = user;
    next(); // pass the execution off to whatever request the client intended
  });
}

function sign(data) {
  const token = jwt.sign(data, config.TOKEN_SECRET);
  return token;
}

function verify(token) {
  try {
    var decoded = jwt.verify(token, config.TOKEN_SECRET);
    return true;
  } catch (err) {
    return false;
  }
}

module.exports = {
  authentication,
  sign,
  verify,
};
