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
