import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useAuth, useRouter, MyStockAPI } from "../../hooks";

export default function LandingContainer(props) {
  const dispatch = useDispatch();
  const auth = useAuth();
  const isMount = useRef(false);
  const [, history] = useRouter();

  useEffect(() => {
    auth.isLogin && MyStockAPI.handleFetchWithTypes(dispatch)();
    if (isMount.current && !auth.isLogin) {
      history.push("/schedule"); //登出
    }
    isMount.current = true;
  }, [auth.isLogin]);

  return props.children;
}
