import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { MyStockAPI } from "../hooks/useMyStock";
import useAuth from "../hooks/useAuth";
import useRouter from "../hooks/useRouter";

export default function LandingContainer(props) {
  const dispatch = useDispatch();
  const auth = useAuth();
  const isMount = useRef(false);
  const [, history] = useRouter();

  useEffect(() => {
    auth.isLogin && MyStockAPI.handleFetch(dispatch)();
    if (isMount.current && !auth.isLogin) {
      history.push("/schedule"); //登出
    }
    isMount.current = true;
  }, [auth.isLogin]);

  return null;
}
