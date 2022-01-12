import { useCallback } from "react";
import { UserAPI } from "../utils/api";
import auth from "../utils/auth";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { loginSuccess, logoutSuccess } from "../store/Member/action";
import { loginStatus } from "../constants/status";
import { MyStockAPI } from "./useMyStock";

const compare = (next, prev) => next.account === prev.account && next.isLogin === prev.isLogin;

export default function useAuth(props) {
  const { account, isLogin } = useSelector(({ member }) => {
    return member;
  }, compare);

  const dispatch = useDispatch();

  const onLogin = useCallback((values) => {
    return handleLogin(dispatch)(values);
  }, []);

  const onLogout = useCallback(() => {
    return handleLogout(dispatch)();
  }, []);

  return { isLogin, account, onLogin, onLogout };
}

export const AuthAPI = {
  handleLogin,
  handleLogout,
};

function handleLogin(dispatch) {
  return (values) => {
    const payload = JSON.stringify(values);
    return UserAPI.login(payload).then((response) => {
      if (response && response.result.code == loginStatus.Success.code) {
        auth.token = response.token;
        if (dispatch) {
          dispatch(loginSuccess(auth.context.account));
          MyStockAPI.handleFetch(dispatch)();
        }
      }
      return response;
    });
  };
}
function handleLogout(dispatch) {
  return () => {
    auth.logout();
    dispatch && dispatch(logoutSuccess());
  };
}
