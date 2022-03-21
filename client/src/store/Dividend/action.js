import * as ACTION_TYPES from "./actionType";

export function getScheduleSuccess(payload) {
  return {
    type: ACTION_TYPES.GET_SCHEDULE_SUCCESS,
    payload,
  };
}

export function getScheduleFail(payload) {
  return {
    type: ACTION_TYPES.GET_SCHEDULE_FAIL,
    payload,
  };
}

export function toggleFilter() {
  return {
    type: ACTION_TYPES.TOGGLE_FILTER,
  };
}
