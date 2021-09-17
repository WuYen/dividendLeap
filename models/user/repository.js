const mongoose = require("mongoose");
const userinfo = require("./model");
const {loginstatus, registerstatus} = require("../../client/src/definition/status");
const bcrypt = require("bcrypt");
const saltRounds = 10;

async function getData({ account, password }) {
  if( !account ) return { result: loginstatus.Failed, user: null }
  let user = await userinfo.findOne({"account":account}).exec();
  let result = !!user ? bcrypt.compareSync(password,user.password)
                        ? loginstatus.Success
                        : loginstatus.InvalidPassword
                     : loginstatus.AccountNotExitst;
  if(!!user) delete user.password;
  return { result: result, user: user };
}

async function setData({account, name, email, password, ...rest}){
  if(!account&&!name&&!email&&!password) return { result: registerstatus.Failed, user: null }
  //let user = await userinfo.or([{"account":account},{"email":email}]).exec();
  let user = await userinfo.$where(`this.account == "${account}" || this.email == "${email}"`).exec();
  let result = user.length != 0 
                      ? user[0].email == email
                        ? registerstatus.EmailExist
                        : registerstatus.AccountExist
                      : registerstatus.Success;
  if(result == registerstatus.Success){
    let entity = {
      account:   account,
      password:  bcrypt.hashSync(password,saltRounds),
      name:      name,
      email:     email,
      auth:{
        role:      0,
        twofe:{},
      },
      status:{  
        activity:   0,
        islogin:   false,
        ispwreset: false
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
