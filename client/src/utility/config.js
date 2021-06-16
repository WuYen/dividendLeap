const useLocalServer = true;
export const dataAPI =
  process.env.NODE_ENV === "development"
    ? useLocalServer
      ? "http://localhost:8080"
      : "https://fierce-eyrie-95732.herokuapp.com"
    : "";
