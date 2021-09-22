const mongoose = require("mongoose");
const userinfo = require("./model");
const {
  loginstatus,
  registerstatus,
  activity,
} = require("../../client/src/constants/status");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const saltRounds = 10;

async function getData({ account, password }) {
  if (!account) return { result: loginstatus.Failed, user: null };
  let user = await userinfo.findOne({ account: account }).exec();
  let result = !!user
    ? bcrypt.compareSync(password, user.password)
      ? loginstatus.Success
      : loginstatus.InvalidPassword
    : loginstatus.AccountNotExitst;
  if (!!user) delete user.password;
  return { result: result, user: user };
}

async function getDataByCondition(condition) {
  return (await userinfo.$where(condition).exec())[0];
}

async function setData({ account, name, email, password, ...rest }) {
  if (!account && !name && !email && !password)
    return { result: registerstatus.Failed, user: null };

  let user = await userinfo
    .find({ $or: [{ account: account }, { email: email }] })
    .exec();

  let result = registerstatus.Success;

  if (user.length != 0) {
    result = registerstatus.AccountExist;
    user[0].email == email && (result = registerstatus.EmailExist);
  }

  if (result == registerstatus.Success) {
    let entity = {
      account: account,
      password: bcrypt.hashSync(password, saltRounds),
      name: name,
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
    let registerresult = await new userinfo(entity).save();
    if (registerresult) return { result: result, user: registerresult._doc };
  }
  return { result: result, user: null };
}

async function updateData(query, newdata) {
  let user = await userinfo
    .findOneAndUpdate(query, newdata, { upsert: true })
    .exec();
  return user;
}

module.exports = {
  getData,
  getDataByCondition,
  setData,
  updateData,
};
