import * as ACTION_TYPES from "../actions/actionType";

export const initialState = {
  schedule: [],
  test: "init",
};

export const ScheduleReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.GET_SCHEDULE_SUCCESS:
      console.log("GET_SCHEDULE_SUCCESS", action);
      return {
        ...state,
        schedule: action.payload,
      };
    case ACTION_TYPES.GET_SCHEDULE_FAIL:
      return {
        ...state,
        error: true,
      };
    case "TEST":
      return {
        ...state,
        test: +new Date(),
      };
    default:
      return state;
  }
};
