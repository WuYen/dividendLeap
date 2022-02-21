const useLocalServer = true;

const isDev = process.env.NODE_ENV === "development";

export const dataAPI =
  isDev && useLocalServer ? "http://localhost:8050/api" : "https://fierce-eyrie-95732.herokuapp.com/api";

export const socketAPI = isDev ? "http://localhost:8050" : "https://fierce-eyrie-95732.herokuapp.com";

export default {
  dataAPI,
  socketAPI,
  isDev,
};
