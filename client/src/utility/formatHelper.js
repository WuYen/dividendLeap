export function getPureDate(str) {
  return str.replace(/\D/g, "");
}

export function formatDate(str) {
  let dateStr = getPureDate(str);
  return (
    dateStr.substr(0, 4) +
    "-" +
    dateStr.substr(4, 2) +
    "-" +
    dateStr.substr(6, 2)
  );
}

export function tryParseFloat(value) {
  let result = parseFloat(value);
  return isNaN(result) ? 0 : result;
}

export default {
  getPureDate,
  formatDate,
  tryParseFloat,
};
