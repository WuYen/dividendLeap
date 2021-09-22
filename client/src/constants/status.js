const loginstatus = Object.freeze({
  Success: { code: 0, message: "登入成功" },
  Failed: { code: 1, message: "登入失敗" },
  ResetPassword: { code: 2, message: "重設密碼" },
  InvalidPassword: { code: 3, message: "密碼錯誤" },
  AccountNotExitst: { code: 4, message: "帳號不存在" },
});

const registerstatus = Object.freeze({
  Success: { code: 0, message: "註冊成功" },
  Failed: { code: 1, message: "註冊失敗" },
  AccountExist: { code: 2, message: "帳號已存在" },
  EmailExist: { code: 3, message: "信箱已註冊" },
});

const activity = Object.freeze({
  Inactive: 0,
  Active: 1,
  Unvalidate: 2,
  Suspend: 3,
});

module.exports = {
  loginstatus,
  registerstatus,
  activity,
};
