const cheerio = require("cheerio");
const axios = require("axios");
const parse5 = require("parse5");

async function fetchHTML(url) {
  const { data } = await axios.get(url);
  const document = parse5.parse(data);
  const html = parse5.serialize(document);
  return cheerio.load(html, {
    decodeEntities: false,
  });
}

async function fetch(url) {
  const { data } = await axios.get(url);
  return data;
}

// async function postHTML(url, payload) {
//   //TODO: use axios post
//   const { data } = await axios.post(url);
//   const document = parse5.parse(data);
//   const html = parse5.serialize(document);
//   return cheerio.load(html, {
//     decodeEntities: false,
//   });
// }

module.exports = {
  fetchHTML,
  fetch,
};
