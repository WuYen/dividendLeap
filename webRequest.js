var request = require("request");
const cheerio = require("cheerio");
const axios = require("axios");
const parse5 = require("parse5");
var fs = require("fs");

var url =
  "https://goodinfo.tw/StockInfo/StockDividendPolicy.asp?STOCK_ID=0050&SHOW_ROTC=";

async function fetchHTML(url) {
  const { data } = await axios.get(url);

  const document = parse5.parse(data);

  // Serializes a document.
  const html = parse5.serialize(document);

  // // Serializes the <html> element content.
  // const str = parse5.serialize(document.childNodes[1]);

  // console.log(str); //> '<head></head><body>Hi there!</body>'

  // return cheerio.load(data, {
  //   decodeEntities: false,
  // });

  // let replace = data.replace(/display=&quot;&quot;/g, "display=&apos;&apos;");
  // replace = replace.replace(
  //   /display=&quot;none&quot;/g,
  //   "display=&apos;none&apos;"
  // );
  // fs.writeFile("./sample2.txt", html, function (error) {
  //   error && console.log(error);
  //   console.log("文件寫入成功");
  // });
  // let replace = data.replace(/display=&quot;&quot;/g, "");
  // replace = replace.replace(/display=&quot;none&quot;/g, "");

  //var text = fs.readFileSync("./site1.txt", "utf8");
  return cheerio.load(html, {
    decodeEntities: false,
  });
}
async function test() {
  const $ = await fetchHTML(url);

  // $("table").each(function () {
  //   console.log("row found", $(this).attr());
  // });

  var data = [];
  // 篩選有興趣的資料
  $("#divDividendDetailData table tbody tr").each(function () {
    console.log("row");
    var row = [];
    $(this)
      .find("td")
      .each(function () {
        console.log($(this).text());
        row.push($(this).text());
      });

    data.push(row);
  });

  // 輸出
  console.log("result", data.length);

  //console.log(`Site HTML: ${$.html()}\n\n`);
  // fs.writeFile("./site.html", `${$.html()}`, function (error) {
  //   console.log(error);
  //   console.log("文件寫入成功");
  // });
  // Print the full HTML
  //console.log(`Site HTML: ${$.html()}\n\n`);

  // Print some specific page content
  //console.log(`First h1 tag: ${$("h1").text()}`);
}
test();
// async function test() {
//   // StockDividendSchedule 0050

//   let response = await axios.get(url);

//   var $ = cheerio.load(response.data);

//   var data = [];
//   // 篩選有興趣的資料
//   $("#divDividendDetailData table tbody tr").each(function () {
//     console.log("row", this);
//     var row = [];
//     $(this)
//       .find("td")
//       .each(function () {
//         console.log($(this).text());
//         row.push($(this).text());
//       });

//     data.push(row);
//   });

//   // 輸出
//   console.log("result", data);
// }

// // 取得網頁資料
// request(url, function (error, response, body) {
//   if (!error) {
//     // 用 cheerio 解析 html 資料
//     var $ = cheerio.load(body);

//     var data = [];
//     // 篩選有興趣的資料
//     $("#divDividendDetailData table tbody tr").each(function () {
//       console.log("row", this);
//       var row = [];
//       $(this)
//         .find("td")
//         .each(function () {
//           console.log($(this).text());
//           row.push($(this).text());
//         });

//       data.push(row);
//     });

//     // 輸出
//     console.log("result", data);
//   } else {
//     console.log("擷取錯誤：" + error);
//   }
// });
