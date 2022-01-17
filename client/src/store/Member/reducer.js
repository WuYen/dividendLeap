import * as ACTION_TYPES from "./actionType";
import auth from "../../utils/auth";

export const initialState = {
  account: auth.context.account,
  isLogin: auth.isLogin,
  myType: [], //user 個人的清單列表
  myStock: [], // {_id,stockNo}
};

//https://dev.to/askharley/build-a-react-redux-shopping-list-app-43l
//https://redux.js.org/usage/structuring-reducers/immutable-update-patterns

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case ACTION_TYPES.LOGIN_SUCCESS:
      return { ...state, account: payload, isLogin: true };
    case ACTION_TYPES.LOGOUT_SUCCESS:
      return { account: "", isLogin: false, myStock: [], myType: [] };
    case ACTION_TYPES.FETCH_MY_STOCK_SUCCESS: {
      const { list, types } = payload;
      return {
        ...state,
        myStock: list,
        ...(types && { myType: types }),
      };
    }
    case ACTION_TYPES.ADD_MY_STOCK_SUCCESS: {
      let newMyType = null;
      if (!state.myType.find((x) => x == payload.type)) {
        newMyType = [...state.myType, payload.type];
      }

      return {
        ...state,
        ...(newMyType && { myType: newMyType }),
        myStock: [
          ...state.myStock,
          {
            ...payload,
          },
        ],
      };
    }
    case ACTION_TYPES.REMOVE_MY_STOCK_SUCCESS: {
      let tempMyStock = state.myStock.filter((item) => item._id !== payload._id);
      return {
        ...state,
        myStock: tempMyStock,
      };
    }
    case ACTION_TYPES.FETCH_MY_TYPES_SUCCESS: {
      return {
        ...state,
        myType: payload,
      };
    }
    default:
      return state;
  }
}
