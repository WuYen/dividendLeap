export function getPureDate(str) {
  return str.replace(/\D/g, "");
}

export function formatDate(str) {
  if (!str) {
    return "";
  }
  let dateStr = getPureDate(str);
  return dateStr.substr(0, 4) + "-" + dateStr.substr(4, 2) + "-" + dateStr.substr(6, 2);
}

export function tryParseFloat(value) {
  let result = parseFloat(value);
  return isNaN(result) ? 0 : result;
}

export function toDateString(date) {
  const { year, month, day } = getDateFragment(date);
  return `${year}${month}${day}`;
}

export function getDateFragment(date) {
  if (typeof date == "string") {
    return {
      year: date.substr(0, 4),
      month: date.substr(4, 2),
      day: date.substr(6, 2),
    };
  } else if (date && date.getFullYear) {
    return {
      year: date.getFullYear().toString(),
      month: `${("0" + (date.getMonth() + 1)).slice(-2)}`,
      day: `${("0" + date.getDate()).slice(-2)}`,
    };
  } else {
    return {
      year: "",
      month: "",
      day: "",
    };
  }
}

export default {
  getPureDate,
  formatDate,
  tryParseFloat,
  getDateFragment,
};
