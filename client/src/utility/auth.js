import jwt_decode from "jwt-decode";

// const auth = () => {
//   function setToken(jwt) {
//     if (jwt) {
//       localStorage.setItem("AUTH_TOKEN", jwt);
//       window.JWT = { context: jwt_decode(jwt), token: jwt };
//     } else {
//       localStorage.removeItem("AUTH_TOKEN");
//       window.JWT = null;
//     }
//   }

//   function getToken() {
//     if (window.JWT) {
//       return window.JWT;
//     } else {
//       const jwt = localStorage.getItem("AUTH_TOKEN");
//       if (jwt) {
//         window.JWT = { context: jwt_decode(jwt), token: jwt };
//         return window.JWT;
//       }
//     }
//     return null;
//   }

//   function isLoggedIn() {
//     return window.JWT || localStorage.getItem("AUTH_TOKEN");
//   }

//   return {
//     getToken,
//     setToken,
//     isLoggedIn,
//   };
// };

function JWT() {
  let _token = localStorage.getItem("AUTH_TOKEN") || "";
  let _context = _token ? jwt_decode(_token) : {};

  return {
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
        _token = "";
        _context = {};
        localStorage.removeItem("AUTH_TOKEN");
      }
    },
  };
}

const instance = new JWT();
window.JWT = instance;
export default instance;
