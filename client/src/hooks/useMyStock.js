import { useCallback } from "react";
import api from "../utils/api";
import { useSelector, useDispatch } from "react-redux";
import { addMyStockSuccess, removeMyStockSuccess, fetchMyStockSuccess } from "../store/Member/action";

const compare = (next, prev) => next === prev;

// 判斷目前 stock No 是不是 Favor
//     1-1 => true/false
// 加進 myStock
// 移除 myStock
export default function useMyStock(props) {
  const isMine = useSelector((member) => {
    return member.myStock.find((x) => x.stockNo == props.stockNo);
  }, compare);

  const dispatch = useDispatch();
  const handleAdd = useCallback((stockNo) => {
    add(stockNo).then(() => {
      dispatch(addMyStockSuccess(stockNo));
    });
  }, []);

  const handleRemove = useCallback((stockNo) => {
    remove(stockNo).then(() => {
      dispatch(removeMyStockSuccess(stockNo));
    });
  }, []);

  return [isMine, handleAdd, handleRemove];
}

function fetch() {
  return api.get(`/my/list`).then((data) => {
    console.log("fetch my result", data);
    return data;
  });
}

function add(stockNo) {
  return api.get(`/my/list/add/${stockNo}`).then((data) => {
    console.log("add my result", data);
    return data;
  });
}

function remove(id) {
  const payload = JSON.stringify({ id: id });
  return api.post(`/my/list/remove`, payload).then((data) => {
    console.log("remove my result", data);
    return data;
  });
}

export const MyStockAPI = {
  fetch,
  add,
  remove,
};

export const MyStockAction = {
  addMyStockSuccess,
  removeMyStockSuccess,
  fetchMyStockSuccess,
};
