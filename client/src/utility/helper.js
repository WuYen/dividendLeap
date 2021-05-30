const dataAPI =
  process.env.NODE_ENV === "development" ? "http://localhost:8080" : "";
const now = new Date();
let currentTimeWest = [now.getFullYear(), now.getMonth() + 1, now.getDate()];
let currentTimeValue = cacualeteTimeValue(
  adjustWeight([now.getFullYear() - 1911, now.getMonth() + 1, now.getDate()])
);
const nowStr = currentTimeWest.map(formatDate).join("");

function sortAndFilter(data) {
  return data
    .filter((item) => {
      let timeValue = cacualeteTimeValue(adjustWeight(parseDate(item[0])));

      console.log("sort filter", item[0], timeValue, currentTimeValue);
      return timeValue >= currentTimeValue;
    })
    .sort();
}

function adjustWeight(arr) {
  //把年分、月份加權 這樣算出來才會對 ex: [110,02,25]
  return [arr[0] * 10000, arr[1] * 100, arr[2]];
}

function cacualeteTimeValue(arr) {
  return arr.reduce((a, b) => a + b, 0);
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
  APIKey: dataAPI,
  dataAPI,
  nowStr,
};
