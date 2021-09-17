const useLocalServer = false;

export const dataAPI =
  process.env.NODE_ENV === "development"
    ? useLocalServer
      ? "http://localhost:8080"
      : "https://fierce-eyrie-95732.herokuapp.com"
    : "";

export const socketAPI =
  process.env.NODE_ENV === "development" ? "http://localhost:8080" : "https://fierce-eyrie-95732.herokuapp.com";

export default {
  dataAPI,
  socketAPI,
};
