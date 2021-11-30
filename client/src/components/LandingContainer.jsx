import React, { useEffect } from "react";
import { MyStockAPI, MyStockAction } from "../hooks/useMyStock";
import { useDispatch } from "react-redux";

export default function LandingContainer(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    MyStockAPI.fetch().then((response) => {
      response.success && dispatch(MyStockAction.fetchMyStockSuccess(response.data.list));
    });
  }, []);

  return props.children;
}
