import React, { useEffect, useCallback, useState } from "react";
import { Box, useMediaQuery } from "@chakra-ui/react";
import api from "../utils/api";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

import { addMyStockSuccess, removeMyStockSuccess } from "../store/Member/action";

//https://dev.to/askharley/build-a-react-redux-shopping-list-app-43l
//https://redux.js.org/usage/structuring-reducers/immutable-update-patterns

// 判斷目前 stock No 是不是 Favor
//   支援兩種
//     1-1 => true/false
//     N-N => new Map(), stockNo=key, isFavor=true/false
// 加進 myStock
// 移除 myStock
export default function useMyStock(props) {
  const { stockNo } = props;
  const isMulti = Array.isArray(stockNo);
  const dispatch = useDispatch();
  const isMine = useSelector((member) => {
    if (isMulti) {
      return member.myStock;
    } else {
      return member.myStock.find((x) => x.stockNo == stockNo);
    }
  }, shallowEqual);

  // dispatch(addMyStockSuccess(stockNo));
  // dispatch(removeMyStockSuccess(stockNo));

  if (isMulti) {
    const findMine = (stockNo) => {
      return isMine.find((x) => x.stockNo == stockNo);
    };
    return [findMine, add, remove];
  }

  return [isMine, add, remove];
}

function add(stockNo) {
  return api.get(`/my/list/add/${stockNo}`).then((data) => {
    console.log("add result", data);
    return data;
  });
}

function remove(id) {
  const payload = JSON.stringify({ id: id });
  return api.post(`/my/list/remove`, payload).then((data) => {
    console.log("remove result", data);
    return data;
  });
}
