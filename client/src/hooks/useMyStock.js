import { useCallback } from "react";
import api from "../utils/api";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { addMyStockSuccess, removeMyStockSuccess, fetchMyStockSuccess } from "../store/Member/action";

const compare = (next, prev) => next === prev;

// 判斷目前 stock No 是不是 Favor
//     1-1 => true/false
// 加進 myStock
// 移除 myStock
export { useMyStock, useMyStocks };

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

function useMyStock(stockNo) {
  const myStock = useSelector(({ member }) => {
    return member.myStock.find((x) => x.stockNo == stockNo);
  }, compare);

  const dispatch = useDispatch();
  const handleAdd = useCallback(() => {
    add(stockNo).then((res) => {
      res.success && dispatch(addMyStockSuccess(res.data));
    });
  }, [stockNo]);

  const handleRemove = useCallback(() => {
    remove(myStock._id).then((res) => {
      res.success && dispatch(removeMyStockSuccess(res.data));
    });
  }, [myStock]);

  return { myStock, handleAdd, handleRemove };
}

function useMyStocks() {
  const dispatch = useDispatch();
  const myStock = useSelector(({ member }) => member.myStock, shallowEqual);

  const handleAdd = useCallback(
    (stockNo) => {
      if (myStock.find((x) => x.stockNo == stockNo) == null) {
        add(stockNo).then((res) => {
          res.success && dispatch(addMyStockSuccess(res.data));
        });
      }
    },
    [myStock]
  );

  const handleRemove = useCallback((id) => {
    remove(id).then((res) => {
      res.success && dispatch(MyStockAction.removeMyStockSuccess(res.data));
    });
  }, []);

  return [myStock, handleAdd, handleRemove];
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
