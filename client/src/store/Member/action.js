import * as ACTION_TYPES from "./actionType";

export function loginSuccess(payload) {
  return {
    type: ACTION_TYPES.LOGIN_SUCCESS,
    payload,
  };
}

export function addMyStockSuccess(payload) {
  return {
    type: ACTION_TYPES.ADD_MY_STOCK_SUCCESS,
    payload,
  };
}

export function removeMyStockSuccess() {
  return {
    type: ACTION_TYPES.REMOVE_MY_STOCK_SUCCESS,
  };
}
