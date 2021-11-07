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
  return {
    year: date.getFullYear().toString(),
    month: `${("0" + (date.getMonth() + 1)).slice(-2)}`,
    day: `${("0" + date.getDate()).slice(-2)}`,
  };
}

export default {
  getPureDate,
  formatDate,
  tryParseFloat,
};
