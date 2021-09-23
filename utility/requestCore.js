const cheerio = require("cheerio");
const axios = require("axios");
const parse5 = require("parse5");

const big5Option = {
  responseType: "arraybuffer",
  transformResponse: [
    function (data) {
      const iconv = require("iconv-lite");
      return iconv.decode(Buffer.from(data), "big5");
    },
  ],
};

async function getHTML(url, option = {}) {
  const { data, ...rest } = await axios.get(url, option);
  const document = parse5.parse(data);
  const html = parse5.serialize(document);
  return cheerio.load(html, {
    decodeEntities: false,
  });
}

async function get(url) {
  const { data } = await axios.get(url);
  return data;
}

async function postHTML(url, payload) {
  const { data } = await axios.post(url, payload);
  const document = parse5.parse(data);
  const html = parse5.serialize(document);
  return cheerio.load(html, {
    decodeEntities: false,
  });
}

module.exports = {
  getHTML,
  postHTML,
  get,
  big5Option,
};
