import auth from "./auth";
import { dataAPI } from "./config";

function headers() {
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(auth.token && { Authorization: `Bearer ${auth.token}` }),
  };
}

export function get(url) {
  return fetch(dataAPI + url, {
    method: "GET",
    headers: headers(),
  })
    .then((res) => res.json())
    .catch((error) => {
      console.log("error", error);
      return {
        success: false,
        data: null,
        error: error.name,
        message: error.message,
      };
    });
}

export function post(url, payload) {
  return fetch(dataAPI + url, {
    method: "POST",
    headers: headers(),
    body: payload,
  })
    .then((res) => res.json())
    .catch((error) => {
      console.log("error", error);
    });
}

export default {
  get,
  post,
};

export const ScheduleAPI = {
  getSchedule: (type) => get(`/schedule`),
  getByType: (type, search) => get(`/schedule/${type}` + (search ? search : "")),
  getList: () => get(`/schedule/list`),
  getDetail: (stockNo) => get(`/schedule/detail/${stockNo}`),
  getMenu: () => get(`/schedule/menu`),
  add: (payload) => post(`/schedule/insert`, payload),
  remove: (payload) => post(`/schedule/remove`, payload),
  update: (payload) => post(`/schedule/update`, payload),
};

export const MyAPI = {
  getList: () => get(`/my/list`),
  getTypes: () => get(`/my/list/types`),
  getListWithTypes: () => get(`/my/list?types=true`),
  add: (type, stockNo) => get(`/my/list/add/${type}/${stockNo}`),
  remove: (payload) => post(`/my/list/remove`, payload),
};

export const ToolAPI = {
  newSchedule: () => get("/tool/getNewSchedule"),
  updateDayInfo: () => get("/tool/getAllDayInfo"),
  resetForecastData: (stockNo) => get("/tool/reset/" + stockNo),
};

export const ForecastAPI = {
  getData: (stockNo) => get(`/forecast/${stockNo}`),
  getDayHistory: (stockNo) => get(`/forecast/day/${stockNo}`),
  getListKD: () => get(`/forecast/kd/list`),
};

export const NewsAPI = {
  getNews: (stockNo) => get(`/news/stock/${stockNo}`),
  getListKD: () => get(`/forecast/kd/list`),
  getByWords: (date, keyWord) => get(`/news/${date}/${keyWord}`),
};

export const UserAPI = {
  login: (payload) => post(`/user/login`, payload),
  validate: (payload) => post(`/user/accountvalidate`, payload),
  confirmOTP: (payload) => post("/user/OTP/confirm", payload),
  generateOTP: (payload) => post("/user/OTP/confirm", payload),
};
