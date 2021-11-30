import * as ACTION_TYPES from "./actionType";

export function loginSuccess(payload) {
  return {
    type: ACTION_TYPES.LOGIN_SUCCESS,
    payload,
  };
}

export function fetchMyStockSuccess(list) {
  return {
    type: ACTION_TYPES.FETCH_MY_STOCK_SUCCESS,
    payload: list,
  };
}

export function addMyStockSuccess(payload) {
  return {
    type: ACTION_TYPES.ADD_MY_STOCK_SUCCESS,
    payload: payload,
  };
}

export function removeMyStockSuccess(payload) {
  return {
    type: ACTION_TYPES.REMOVE_MY_STOCK_SUCCESS,
    payload: payload,
  };
}
