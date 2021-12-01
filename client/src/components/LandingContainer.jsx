import React, { useEffect } from "react";
import { MyStockAPI } from "../hooks/useMyStock";
import { useDispatch } from "react-redux";

export default function LandingContainer(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    MyStockAPI.handleFetch(dispatch)();
  }, []);

  return props.children;
}
