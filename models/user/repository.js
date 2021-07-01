async function getData({ account, password }) {
  //query => { account, password }
  if (account == "admin" && password == "pass123") {
    return { isValid: true, user: { account, password } };
  } else {
    // let user = await User.findOne({ account }).exec();
    // return user.password == query.password;
    return { isValid: false, user: { account, password } };
  }
}

module.exports = {
  getData,
};
