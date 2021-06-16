const pipe =
  (...funcs) =>
  (v) => {
    return funcs.reduce((res, func) => {
      return func(res);
    }, v);
  };

module.exports = {
  pipe,
};
