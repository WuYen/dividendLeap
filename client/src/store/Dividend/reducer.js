import * as ACTION_TYPES from "./actionType";

export const initialState = {
  schedule: [],
  typeList: [],
  filter: localStorage.getItem("filter") ? localStorage.getItem("filter") === "true" : true,
};

export default function ScheduleReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ACTION_TYPES.GET_SCHEDULE_SUCCESS:
      return {
        ...state,
        schedule: payload.list,
        ...(payload.menu && { typeList: payload.menu }),
      };
    case ACTION_TYPES.GET_SCHEDULE_FAIL:
      return {
        ...state,
        error: true,
      };
    case ACTION_TYPES.TOGGLE_FILTER:
      localStorage.setItem("filter", `${!state.filter}`);
      return {
        ...state,
        filter: !state.filter,
      };
    default:
      return state;
  }
}
