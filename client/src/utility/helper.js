const APIKey = process.env.NODE_ENV === "development" ? "http://localhost:8080" : "/";
const now = new Date();
let currentTimeWest = [now.getFullYear(), now.getMonth() + 1, now.getDate()];
let currentTime = [now.getFullYear() - 1911, now.getMonth() + 1, now.getDate()];
let currentTimeValue = currentTime.reduce((a, b) => a + b, 0);
const nowStr = currentTimeWest.map(formatDate).join("");

function sortAndFilter(data) {
  return data
    .filter((item) => {
      let timeValue = parseDate(item[0]).reduce((a, b) => a + b, 0);
      return timeValue >= currentTimeValue;
    })
    .sort();
}

function parseDate(str) {
  return str
    .replace(/[^0-9]/g, "-")
    .split("-")
    .map((i) => parseInt(i, 10))
    .filter((x) => x);
}

function formatDate(num) {
  if (num > 99) {
    return num.toString();
  }

  return ("0" + num).slice(-2);
}

export default {
  sortAndFilter,
  parseDate,
  formatDate,
  APIKey,
  nowStr,
};
