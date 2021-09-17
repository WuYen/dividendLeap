import jwt_decode from "jwt-decode";

// current context content
// {
//   account: "admin";
//   iat: 1629031499;
//   password: "pass123";
// }
function JWT() {
  let _token = localStorage.getItem("AUTH_TOKEN") || "";
  let _context = _token ? jwt_decode(_token) : {};

  function logout() {
    return new Promise((resolve, reject) => {
      try {
        _token = "";
        _context = {};
        localStorage.removeItem("AUTH_TOKEN");
        resolve("logout success");
      } catch (error) {
        console.log(error);
        reject("logout fail");
      }
    });
  }

  return {
    logout: logout,
    get isLogin() {
      return _token !== "";
    },
    get context() {
      return _context;
    },
    get token() {
      return _token;
    },
    set token(token) {
      if (token) {
        _token = token;
        _context = jwt_decode(_token);
        localStorage.setItem("AUTH_TOKEN", token);
      } else {
        logout();
      }
    },
  };
}

const instance = new JWT();
window.JWT = instance;
export default instance;
