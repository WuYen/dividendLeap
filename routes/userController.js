const router = require("express").Router();
const auth = require("../utility/auth");
const {loginstatus} = require("../definition/status");
const { getData, setData } = require("../models/user/repository");
//const { success } = require("../utility/response");

router.post("/login", async (req, res, next) => {
  try {
    const { result, user } = await getData(req.body); //{account, password}
    if(result !== loginstatus.Success) res.send({ result: loginstatus.Failed, token: null });
    const token = auth.sign(user);
    res.send({ result: result, token: token});
  } catch (error) {
    console.log(error)
    next(error);
  }
});

router.post("/registration", async(req, res, next)=>{
try{
  const { result, user } = await setData(req.body);
  if(!!user) delete user.password;
  res.send({result: result, user:user});
} catch(error){
  next(error)
}
});

router.post("/resetpassword", async(req, res, next)=>{
  try{
    
  } catch(error){
    next(error)
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
