import * as ACTION_TYPES from "./actionType";

export const initialState = {
  account: "",
  isLogin: false,
  myStock: [],
};

export default function ScheduleReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.LOGIN_SUCCESS:
      return {
        account: "",
        myStock: [],
        isLogin: true,
      };

    default:
      return state;
  }
}
