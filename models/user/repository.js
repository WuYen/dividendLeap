const mongoose = require("mongoose");
const userinfo = require("./model");
const {loginstatus, registerstatus} = require("../../client/src/definition/status");

async function getData({ account, password }) {
  if( !account ) return { result: loginstatus.Failed, user: null }
  let user = await userinfo.findOne({ account: account }).exec();
  let result = !!user ? user.password == password 
                        ? loginstatus.Success
                        : loginstatus.InvalidPassword
                     : loginstatus.AccountNotExitst;
  if(!!user) delete user.password;
  return { result: result, user: user };
}

async function setData({account, name, email, password, ...rest}){
  if(!account&&!name&&!email&&!password) return { result: registerstatus.Failed, user: null }
  let user = await userinfo.find().or([{account:account},{email:email}]).exec();
  let result = user.length != 0 ? user.account == account
                        ? registerstatus.AccountExist
                        : registerstatus.EmailExist
                      : registerstatus.Success;
  if(result == registerstatus.Success){
    let entity = {
      account:   account,
      password:  password,
      name:      name,
      email:     email,
      role:      0,
      status:{  
        activity:   0,
        login:{
          islogin:   false,
          ispwreset: false
        }
      }
    };
    let registerresult = await new userinfo(entity).save();
    if(registerresult) return {result: result, user:registerresult}
  } 
  return { result: result, user:null };
}

module.exports = {
  getData,
  setData,
};
