import { useCallback } from "react";
import { MyAPI } from "../utilities";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import {
  addMyStockSuccess,
  removeMyStockSuccess,
  fetchMyStockSuccess,
  fetchMyTypesSuccess,
} from "../store/Member/action";

const compare = (next, prev) => next === prev;

// 判斷目前 stock No 是不是 myStock and handleAdd、handleRemove
function useMyStock(stockNo) {
  const myStock = useSelector(({ member }) => {
    return member.myStock.find((x) => x.stockNo == stockNo);
  }, compare);

  const dispatch = useDispatch();

  const onAdd = useCallback(
    (type) => {
      handleAdd(dispatch)(type, stockNo);
    },
    [stockNo]
  );

  const onRemove = useCallback(() => {
    handleRemove(dispatch)(myStock._id);
  }, [myStock]);

  return [myStock, onAdd, onRemove];
}

//拿出整份 myStock and handleAdd、handleRemove
function useMyStocks() {
  const dispatch = useDispatch();
  const myStock = useSelector(({ member }) => member.myStock, shallowEqual);

  const onAdd = useCallback(
    (stockNo) => {
      myStock.find((x) => x.stockNo == stockNo) == null && handleAdd(dispatch)(stockNo);
    },
    [myStock]
  );

  const onRemove = useCallback((id) => {
    handleRemove(dispatch)(id);
  }, []);

  return [myStock, onAdd, onRemove];
}

export { useMyStock, useMyStocks };

function handleFetch(dispatch) {
  return () =>
    MyAPI.getList()
      .then((data) => {
        console.log("fetch my result", data);
        return data;
      })
      .then((response) => {
        response.success && dispatch(fetchMyStockSuccess({ list: response.data.list }));
      });
}

function handleFetchWithTypes(dispatch) {
  return () =>
    MyAPI.getListWithTypes()
      .then((data) => {
        console.log("fetch my list and types result", data);
        return data;
      })
      .then((response) => {
        response.success && dispatch(fetchMyStockSuccess({ list: response.data.list, types: response.data.types }));
      });
}

function handleAdd(dispatch) {
  return (type, stockNo) =>
    MyAPI.add(type, stockNo)
      .then((data) => {
        console.log("add my result", data);
        return data;
      })
      .then((res) => {
        res.success && dispatch(addMyStockSuccess(res.data));
      });
}

function handleRemove(dispatch) {
  return (id) => {
    const payload = JSON.stringify({ id: id });
    MyAPI.remove(payload)
      .then((data) => {
        console.log("remove my result", data);
        return data;
      })
      .then((res) => {
        res.success && dispatch(removeMyStockSuccess(res.data));
      });
  };
}

function handleFetchMyTypes(dispatch) {
  return () =>
    MyAPI.getTypes()
      .then((data) => {
        console.log("fetch my types result", data);
        return data;
      })
      .then((response) => {
        response.success && dispatch(fetchMyTypesSuccess(response.data));
      });
}

export const MyStockAPI = {
  handleFetch,
  handleAdd,
  handleRemove,
  handleFetchWithTypes,
  handleFetchMyTypes,
};
