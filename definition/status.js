const loginstatus = Object.freeze({
    Success:            { code: 0, message: "登入成功"   },
    Failed :            { code: 1, message: "登入失敗"   },
    ResetPassword :     { code: 2, message: "重設密碼"   },
    InvalidPassword :   { code: 3, message: "密碼錯誤"   },
    AccountNotExitst :  { code: 4, message: "帳號不存在" },
});

module.exports = {
    loginstatus,

};
