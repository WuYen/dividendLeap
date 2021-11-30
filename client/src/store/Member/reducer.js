import * as ACTION_TYPES from "./actionType";

export const initialState = {
  account: "",
  isLogin: false,
  myStock: [], //{_id,stockNo}
};

//https://dev.to/askharley/build-a-react-redux-shopping-list-app-43l
//https://redux.js.org/usage/structuring-reducers/immutable-update-patterns

export default function ScheduleReducer(state = initialState, { type, payload }) {
  switch (type) {
    case ACTION_TYPES.LOGIN_SUCCESS:
      return {
        account: payload,
        isLogin: true,
      };
    case ACTION_TYPES.FETCH_MY_STOCK_SUCCESS: {
      return {
        ...state,
        myStock: payload,
      };
    }
    case ACTION_TYPES.ADD_MY_STOCK_SUCCESS: {
      return {
        ...state,
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
    default:
      return state;
  }
}
