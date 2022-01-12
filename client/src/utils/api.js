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
  getSchedule: (type) => {
    return get(`/schedule`);
  },
  getByType: (type, search) => {
    if (search) {
      return get(`/schedule/${type}` + search);
    }
    return get(`/schedule/${type}`);
  },
  getList: () => {
    return get(`/schedule/list`);
  },
  getDetail: (stockNo) => {
    return get(`/schedule/detail/${stockNo}`);
  },
  getMenu: () => {
    return get(`/schedule/menu`);
  },
};

export const MyAPI = {
  getList: () => {
    return get(`/my/list`);
  },
  getTypes: () => {
    return get(`/my/list/types`);
  },
  getListWithTypes: () => {
    return get(`/my/list?types=true`);
  },
  add: (type, stockNo) => {
    return get(`/my/list/add/${type}/${stockNo}`);
  },
  remove: (payload) => {
    return post(`/my/list/remove`, payload);
  },
};

export const ToolAPI = {
  newSchedule: () => {
    return get("/tool/getNewSchedule");
  },
  updateDayInfo: () => {
    return get("/tool/getAllDayInfo");
  },
  resetForecastData: (stockNo) => {
    return get("/tool/reset/" + stockNo);
  },
};

export const ForecastAPI = {
  getData: (stockNo) => {
    return get(`/forecast/${stockNo}`);
  },
  getDayHistory: (stockNo) => {
    return get(`/forecast/day/${stockNo}`);
  },
  getListKD: () => {
    return get(`/forecast/kd/list`);
  },
};

export const NewsAPI = {
  getNews: (stockNo) => {
    return get(`/news/stock/${stockNo}`);
  },
  getListKD: () => {
    return get(`/forecast/kd/list`);
  },
  getByWords: (date, keyWord) => {
    return get(`/news/${date}/${keyWord}`);
  },
};
