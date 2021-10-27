const auth = require("../utility/auth");
const { loginStatus, registerStatus, activity } = require("../client/src/constants/status");
const { getData, setData, updateData } = require("../models/user/repository");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const speakeasy = require("speakeasy");
const qrcode = require("qrcode");
const saltRounds = 10;

async function login(loginInfo) {
  const data = await getData({ account: loginInfo.account });
  if (!data) return { result: loginStatus.AccountNotExitst, token: null };

  const { password, validateToken, ...user } = data.toObject({ getters: true });
  const token = bcrypt.compareSync(loginInfo.password, password) ? auth.sign(user) : null;
  return {
    result: token ? loginStatus.Success : loginStatus.InvalidPassword,
    token: token,
  };
}

async function registration({ account, email, password }) {
  if (!account && !email && !password) return { result: registerStatus.Failed, user: null };

  const data = await getData({ $or: [{ account: account }, { email: email }] });
  let result = registerStatus.Success;

  if (data) {
    result = registerStatus.AccountExist;
    data.email == email && (result = registerStatus.EmailExist);
  }

  if (result == registerStatus.Success) {
    const entity = {
      account: account,
      password: bcrypt.hashSync(password, saltRounds),
      email: email,
      validateToken: crypto.randomBytes(16).toString("hex"),
      auth: {
        role: 0,
        useOTP: false,
      },
      status: {
        activity: activity.Unvalidate,
        islogin: false,
        ispwreset: false,
      },
    };
    let registerresult = await setData(entity);
    if (registerresult) return { result: result, user: registerresult._doc };
  }
  return { result: result, user: null };
}

async function resetPassword({ account, newPassword }) {
  const result = updateData({ account: account }, newPassword);
  return result ? true : false;
}

async function accountValidate(token) {
  const query = { validateToken: token };
  let user = await getData(query);
  if (user) {
    user.validateToken = null;
    user.status.activity = activity.Active;
    let result = await updateData(query, user);
    return result ? { result: true } : { result: false };
  }
  return { result: false };
}

async function registerOTP(account, token) {
  const query = { account: account };
  let user = await getData(query);
  if (!user) return { result: null };
  if (token) {
    const verified = speakeasy.totp.verify({ secret: user.auth.OTPToken, encoding: "base32", token: token });
    if (verified) {
      user.auth.enableOTP = true;
      let result = await updateData(query, user);
      return { result: result ? verified : false };
    }
  } else {
    const tempToken = speakeasy.generateSecret();
    let qrCodeUrl = await qrcode.toDataURL(tempToken.otpauth_url.replace("SecretKey", "StockeOverFlow"));
    user.auth.OTPToken = tempToken.base32;
    let result = await updateData(query, user);
    return { result: result ? qrCodeUrl : null };
  }
}

function validate() {}

module.exports = {
  login,
  registration,
  resetPassword,
  accountValidate,
  validate,
  registerOTP,
};
