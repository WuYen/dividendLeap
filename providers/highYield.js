const fields = [
  "股號 / 名稱", //"3373 熱映"0
  "現金股利殖利率", //"26.28%"1
  "3 年平均現金股息殖利率", //"10.95%"2
  "5 年平均現金股息殖利率", //"6.99%"3
  "收盤價", //"38.05"4
  "現金股利", //"10.0"5
  "股票股利", //"0.0"6
  "近 5 年發放現金股利次數", //"5 次"7
  "近 5 年 30 天內填息機率", //"60.0%"8
  "除息日", // "08 / 18" 9
  "除權日", //"無"10
  "現金股利發放日", //"09 / 10"11
];
// var table = [];
// document.querySelectorAll(".ranking-list-body ul").forEach((e) => {
//   var row = [];
//   e.querySelectorAll("li:not(:first-child)").forEach((e) => {
//     row.push(e.innerText);
//   });
//   table.push(row);
// });

//https://statementdog.com/screeners/dividend_yield_ranking
//排行榜
var data = [
  ["3373 熱映", "26.28%", "10.95%", "6.99%", "38.05", "10.0", "0.0", "5 次", "60.0%", "08 / 18", "無", "09 / 10"],
  ["1325 恆大", "25.0%", "8.89%", "5.81%", "48.0", "12.0", "0.0", "5 次", "40.0%", "07 / 15", "無", "08 / 11"],
  ["3325 旭品", "15.67%", "6.69%", "4.64%", "15.95", "2.5", "0.0", "3 次", "33.33%", "08 / 17", "無", "09 / 09"],
  ["3040 遠見", "15.0%", "8.07%", "12.21%", "38.0", "5.7", "0.0", "5 次", "20.0%", "08 / 06", "無", "08 / 20"],
  ["4735 豪展", "14.31%", "8.15%", "6.3%", "57.3", "9.0", "0.0", "5 次", "33.33%", "尚未公佈", "無", "尚未公佈"],
  ["6276 安鈦克", "13.73%", "5.58%", "3.35%", "21.85", "3.0", "0.0", "2 次", "50.0%", "08 / 06", "無", "08 / 31"],
  ["4930 燦星網", "13.65%", "5.2%", "3.35%", "25.65", "3.5", "0.0", "3 次", "66.67%", "04 / 16", "無", "04 / 29"],
  ["6204 艾華", "13.59%", "5.89%", "4.1%", "73.6", "10.0", "0.0", "5 次", "40.0%", "06 / 02", "無", "06 / 28"],
  ["6462 神盾", "13.33%", "9.51%", "6.46%", "112.5", "15.0", "0.0", "4 次", "0.0%", "07 / 30", "無", "08 / 25"],
  ["1598 岱宇", "12.55%", "5.02%", "3.89%", "59.5", "7.47", "0.0", "5 次", "40.0%", "06 / 25", "無", "07 / 30"],
  ["2545 皇翔", "12.18%", "6.77%", "7.31%", "36.95", "4.5", "0.0", "5 次", "40.0%", "08 / 23", "無", "09 / 10"],
  ["6523 達爾膚", "11.96%", "1.92%", "2.42%", "144.0", "4.0", "0.0", "5 次", "50.0%", "04 / 01", "無", "04 / 29"],
  ["3679 新至陞", "11.71%", "6.64%", "7.26%", "85.4", "10.0", "0.0", "5 次", "25.0%", "06 / 18", "無", "07 / 16"],
  ["9919 康那香", "11.58%", "4.38%", "3.05%", "25.9", "3.0", "0.0", "5 次", "60.0%", "08 / 02", "無", "08 / 18"],
  ["6125 廣運", "11.39%", "5.06%", "3.64%", "26.35", "1.5", "0.0", "5 次", "100.0%", "09 / 13", "無", "09 / 30"],
  ["3557 嘉威", "11.36%", "2.53%", "1.52%", "79.2", "6.0", "0.0", "1 次", "0.0%", "04 / 26", "無", "05 / 14"],
  ["6219 富旺", "11.24%", "7.14%", "5.22%", "17.8", "2.0", "0.0", "5 次", "50.0%", "06 / 09", "無", "07 / 06"],
  ["3056 總太", "10.8%", "7.28%", "6.58%", "40.75", "4.4", "0.0", "5 次", "20.0%", "08 / 26", "無", "09 / 17"],
  ["2204 中華", "10.74%", "4.45%", "3.71%", "65.2", "7.0", "0.0", "4 次", "25.0%", "07 / 22", "無", "08 / 25"],
  ["5201 凱衛", "10.59%", "5.67%", "3.63%", "26.45", "2.8", "0.0", "4 次", "50.0%", "06 / 24", "無", "07 / 22"],
  ["5604 中連貨", "10.23%", "7.4%", "5.29%", "77.7", "7.95", "0.0", "5 次", "0.0%", "08 / 16", "無", "09 / 01"],
  ["6504 南六", "10.08%", "6.02%", "5.18%", "119.0", "12.0", "0.0", "5 次", "50.0%", "09 / 16", "無", "10 / 13"],
  ["5215 科嘉-KY", "10.06%", "5.59%", "4.28%", "86.2", "8.67", "0.0", "5 次", "60.0%", "06 / 29", "無", "07 / 21"],
  ["6655 科定", "10.01%", "5.01%", "4.03%", "79.9", "8.0", "0.0", "5 次", "50.0%", "07 / 19", "無", "08 / 11"],
  ["5546 永固-KY", "10.0%", "無", "無", "60.0", "6.0", "0.0", "2 次", "50.0%", "08 / 09", "無", "09 / 13"],
  ["4420 光明", "9.9%", "7.26%", "5.94%", "30.3", "3.0", "0.0", "5 次", "14.29%", "尚未公佈", "無", "尚未公佈"],
  ["3032 偉訓", "9.83%", "7.77%", "7.32%", "31.55", "3.1", "0.0", "5 次", "40.0%", "08 / 11", "無", "08 / 31"],
  ["8481 政伸", "9.76%", "6.04%", "5.08%", "71.7", "7.0", "0.0", "5 次", "40.0%", "07 / 05", "無", "07 / 23"],
  ["2404 漢唐", "9.6%", "7.53%", "5.88%", "177.0", "17.0", "0.0", "5 次", "20.0%", "06 / 18", "無", "07 / 16"],
  ["8066 來思達", "9.35%", "19.73%", "20.56%", "32.1", "3.0", "0.0", "5 次", "20.0%", "08 / 13", "無", "09 / 10"],
  ["6616 特昇-KY", "9.3%", "9.3%", "6.51%", "21.5", "2.0", "0.0", "4 次", "50.0%", "09 / 09", "無", "10 / 08"],
  ["3669 圓展", "9.24%", "3.64%", "2.65%", "54.1", "5.0", "0.0", "5 次", "60.0%", "07 / 20", "無", "08 / 12"],
  ["6016 康和證", "9.17%", "3.88%", "2.71%", "13.3", "1.22", "0.0", "3 次", "66.67%", "08 / 16", "無", "09 / 10"],
  ["6596 寬宏藝術", "9.17%", "7.47%", "6.72%", "49.1", "4.5", "0.0", "5 次", "40.0%", "06 / 16", "無", "07 / 09"],
  ["2496 卓越", "9.11%", "6.75%", "7.69%", "49.4", "4.5", "0.0", "5 次", "40.0%", "07 / 16", "無", "08 / 09"],
  ["1315 達新", "9.1%", "6.5%", "4.57%", "65.9", "8.0", "0.0", "5 次", "16.67%", "尚未公佈", "無", "尚未公佈"],
  ["1423 利華", "9.09%", "3.23%", "1.94%", "19.8", "1.8", "0.0", "2 次", "50.0%", "08 / 20", "無", "09 / 15"],
  ["6538 倉和", "9.02%", "4.51%", "4.15%", "77.6", "7.0", "0.0", "5 次", "60.0%", "08 / 27", "無", "09 / 17"],
  ["3171 新洲", "9.0%", "6.24%", "4.33%", "20.55", "1.85", "0.0", "5 次", "20.0%", "07 / 16", "無", "08 / 06"],
  ["3540 曜越", "9.0%", "4.93%", "4.15%", "38.9", "3.5", "1.0", "5 次", "75.0%", "09 / 22", "09 / 22", "10 / 29"],
  ["1341 富林-KY", "8.97%", "6.98%", "無", "66.9", "6.0", "0.0", "3 次", "0.0%", "07 / 20", "07 / 20", "08 / 13"],
  ["2301 光寶科", "8.91%", "5.24%", "5.07%", "60.6", "3.4", "0.0", "5 次", "20.0%", "06 / 29", "無", "07 / 23"],
  ["5213 亞昕", "8.77%", "5.85%", "4.82%", "22.8", "2.0", "0.0", "4 次", "0.0%", "07 / 28", "無", "08 / 17"],
  ["5220 萬達光電", "8.52%", "7.01%", "7.1%", "35.2", "3.0", "0.0", "5 次", "25.0%", "09 / 10", "無", "10 / 15"],
  ["1604 聲寶", "8.49%", "6.11%", "4.75%", "29.45", "2.5", "0.0", "5 次", "50.0%", "09 / 15", "無", "10 / 07"],
  ["2505 國揚", "8.46%", "4.44%", "2.88%", "23.65", "2.5", "0.0", "4 次", "66.67%", "09 / 13", "無", "10 / 13"],
  ["5519 隆大", "8.45%", "6.49%", "4.74%", "21.3", "1.8", "0.0", "5 次", "20.0%", "08 / 30", "無", "09 / 30"],
  ["1457 宜進", "8.36%", "5.94%", "4.9%", "17.95", "1.5", "0.0", "5 次", "57.14%", "尚未公佈", "無", "尚未公佈"],
  ["6123 上奇", "8.32%", "7.09%", "6.45%", "50.2", "3.98", "0.0", "5 次", "42.86%", "尚未公佈", "無", "01 / 08"],
  ["1102 亞泥", "8.3%", "7.29%", "5.36%", "42.75", "3.55", "0.0", "5 次", "20.0%", "08 / 05", "無", "09 / 06"],
  ["6703 軒郁", "8.23%", "8.8%", "無", "88.1", "7.25", "0.0", "3 次", "0.0%", "07 / 28", "無", "08 / 25"],
  ["2509 全坤建", "8.22%", "4.2%", "4.27%", "18.25", "1.5", "0.0", "5 次", "60.0%", "08 / 11", "無", "09 / 07"],
  ["6486 互動", "8.21%", "7.66%", "6.43%", "73.1", "6.0", "0.0", "5 次", "20.0%", "08 / 24", "無", "09 / 10"],
  ["6176 瑞儀", "8.19%", "7.85%", "6.61%", "97.7", "8.0", "0.0", "5 次", "60.0%", "07 / 23", "無", "08 / 24"],
  ["5206 坤悅", "8.15%", "5.75%", "4.95%", "15.95", "1.3", "0.0", "5 次", "0.0%", "08 / 30", "無", "09 / 24"],
  ["6790 永豐實", "8.12%", "無", "無", "49.25", "4.0", "0.0", "1 次", "0.0%", "08 / 11", "無", "09 / 03"],
  ["6577 勁豐", "8.12%", "7.85%", "7.31%", "61.6", "5.0", "0.0", "5 次", "20.0%", "08 / 09", "無", "09 / 03"],
  ["2474 可成", "8.03%", "7.58%", "7.49%", "149.5", "12.0", "0.0", "5 次", "16.67%", "08 / 31", "無", "09 / 30"],
  ["2063 世鎧", "8.0%", "6.67%", "5.97%", "37.5", "2.0", "0.0", "5 次", "20.0%", "03 / 31", "無", "04 / 29"],
  ["6470 宇智", "7.96%", "6.45%", "6.6%", "43.95", "3.5", "0.0", "5 次", "40.0%", "06 / 11", "無", "07 / 01"],
  ["8410 森田", "7.94%", "6.08%", "5.65%", "31.5", "2.5", "0.0", "5 次", "40.0%", "08 / 25", "無", "09 / 24"],
  ["2417 圓剛", "7.91%", "2.9%", "1.9%", "25.3", "2.0", "0.0", "5 次", "80.0%", "07 / 23", "無", "08 / 19"],
  ["2904 匯僑", "7.91%", "6.81%", "6.1%", "25.3", "2.0", "0.0", "5 次", "0.0%", "09 / 06", "無", "10 / 07"],
  ["3078 僑威", "7.88%", "4.92%", "5.0%", "40.0", "3.15", "0.0", "5 次", "40.0%", "08 / 30", "無", "09 / 30"],
  ["2535 達欣工", "7.82%", "5.87%", "5.65%", "32.15", "2.51", "0.0", "5 次", "20.0%", "07 / 12", "無", "07 / 30"],
  ["2323 中環", "7.78%", "3.33%", "2.0%", "9.0", "0.7", "0.0", "2 次", "100.0%", "09 / 06", "無", "10 / 05"],
  ["3617 碩天", "7.73%", "7.65%", "7.38%", "69.9", "5.4", "0.0", "5 次", "20.0%", "07 / 06", "無", "08 / 10"],
  ["6197 佳必琪", "7.72%", "7.01%", "5.73%", "37.55", "2.9", "0.0", "5 次", "25.0%", "06 / 29", "無", "07 / 15"],
  ["8342 益張", "7.69%", "7.05%", "7.61%", "52.0", "4.0", "0.0", "5 次", "0.0%", "06 / 07", "無", "06 / 30"],
  ["6195 詩肯", "7.6%", "5.58%", "6.01%", "52.6", "4.0", "0.0", "5 次", "20.0%", "07 / 29", "無", "08 / 18"],
  ["6641 基士德-KY", "7.6%", "7.21%", "5.7%", "59.2", "4.5", "0.0", "5 次", "0.0%", "08 / 04", "無", "08 / 27"],
  ["2548 華固", "7.6%", "7.06%", "6.58%", "92.1", "7.0", "0.0", "5 次", "0.0%", "06 / 09", "無", "06 / 30"],
  ["4972 湯石照明", "7.59%", "7.23%", "7.44%", "31.6", "2.4", "0.0", "5 次", "0.0%", "06 / 16", "無", "07 / 16"],
  ["3052 夆典", "7.55%", "4.09%", "4.34%", "10.6", "0.8", "0.0", "4 次", "0.0%", "08 / 27", "無", "09 / 17"],
  ["3231 緯創", "7.55%", "6.55%", "5.55%", "29.15", "2.2", "0.0", "5 次", "0.0%", "07 / 21", "無", "08 / 11"],
  ["1101 台泥", "7.54%", "6.68%", "5.28%", "46.4", "3.5", "0.0", "5 次", "16.67%", "08 / 12", "無", "09 / 10"],
  ["1530 亞崴", "7.51%", "6.01%", "4.77%", "33.3", "2.5", "0.0", "5 次", "20.0%", "09 / 03", "無", "09 / 29"],
  ["1109 信大", "7.48%", "5.65%", "3.59%", "20.05", "1.5", "0.0", "5 次", "40.0%", "08 / 03", "無", "08 / 27"],
  ["6024 群益期", "7.46%", "7.08%", "6.89%", "38.45", "2.87", "0.0", "5 次", "20.0%", "06 / 07", "無", "07 / 05"],
  ["8089 康全電訊", "7.46%", "6.47%", "無", "26.8", "2.0", "0.0", "4 次", "33.33%", "08 / 16", "無", "09 / 17"],
  ["3213 茂訊", "7.45%", "6.35%", "6.26%", "60.4", "4.5", "0.0", "5 次", "20.0%", "08 / 02", "無", "08 / 27"],
  ["8213 志超", "7.45%", "5.82%", "4.77%", "47.0", "3.5", "0.0", "5 次", "0.0%", "06 / 29", "無", "07 / 19"],
  ["2227 裕日車", "7.44%", "7.69%", "8.07%", "249.0", "18.53", "0.0", "5 次", "0.0%", "08 / 05", "無", "09 / 03"],
  ["8916 光隆", "7.41%", "7.82%", "7.95%", "40.5", "3.0", "0.0", "5 次", "40.0%", "08 / 19", "無", "09 / 01"],
  ["6210 慶生", "7.4%", "7.07%", "6.95%", "40.55", "3.0", "0.0", "5 次", "20.0%", "08 / 05", "無", "09 / 03"],
  ["3376 新日興", "7.38%", "5.27%", "4.32%", "94.8", "7.0", "0.0", "5 次", "83.33%", "07 / 30", "無", "08 / 13"],
  ["5704 老爺知", "7.37%", "3.91%", "2.55%", "29.85", "2.2", "0.0", "4 次", "50.0%", "08 / 23", "無", "09 / 15"],
  ["5465 富驊", "7.35%", "5.15%", "3.09%", "15.65", "1.15", "0.0", "3 次", "33.33%", "07 / 26", "無", "08 / 19"],
  ["4999 鑫禾", "7.34%", "7.34%", "7.38%", "40.9", "3.0", "0.0", "5 次", "40.0%", "07 / 01", "無", "07 / 30"],
  ["4527 方土霖", "7.33%", "6.84%", "7.18%", "27.3", "2.0", "0.0", "5 次", "20.0%", "08 / 25", "無", "09 / 16"],
  ["4550 長佳", "7.32%", "6.43%", "6.73%", "22.95", "1.68", "0.0", "5 次", "0.0%", "08 / 26", "無", "09 / 22"],
  ["6242 立康", "7.32%", "6.36%", "5.8%", "38.25", "2.8", "0.0", "5 次", "20.0%", "09 / 02", "無", "09 / 24"],
  ["1582 信錦", "7.31%", "7.8%", "7.79%", "68.4", "5.0", "0.0", "5 次", "20.0%", "08 / 17", "無", "09 / 15"],
  ["5490 同亨", "7.26%", "4.84%", "6.53%", "27.55", "2.0", "0.0", "5 次", "40.0%", "08 / 23", "無", "09 / 10"],
  ["6629 泰金-KY", "7.26%", "4.89%", "無", "62.0", "4.5", "0.0", "4 次", "50.0%", "04 / 15", "無", "05 / 20"],
  ["1336 台翰", "7.25%", "5.64%", "3.96%", "20.7", "1.5", "0.0", "4 次", "25.0%", "08 / 11", "無", "09 / 07"],
  ["2546 根基", "7.24%", "6.44%", "5.34%", "49.7", "3.6", "0.0", "5 次", "20.0%", "08 / 09", "無", "09 / 03"],
  ["1537 廣隆", "7.22%", "7.22%", "7.0%", "138.5", "10.0", "0.0", "5 次", "0.0%", "08 / 12", "無", "09 / 14"],
  ["4906 正文", "7.22%", "3.01%", "3.61%", "27.7", "2.0", "0.0", "4 次", "25.0%", "08 / 04", "無", "08 / 25"],
  ["2356 英業達", "7.21%", "6.04%", "6.04%", "25.65", "1.85", "0.0", "5 次", "20.0%", "07 / 15", "無", "08 / 11"],
];

var stockNoList = [
  "3373",
  "1325",
  "3325",
  "3040",
  "4735",
  "6276",
  "4930",
  "6204",
  "6462",
  "1598",
  "2545",
  "6523",
  "3679",
  "9919",
  "6125",
  "3557",
  "6219",
  "3056",
  "2204",
  "5201",
  "5604",
  "6504",
  "5215",
  "6655",
  "5546",
  "4420",
  "3032",
  "8481",
  "2404",
  "8066",
  "6616",
  "3669",
  "6016",
  "6596",
  "2496",
  "1315",
  "1423",
  "6538",
  "3171",
  "3540",
  "1341",
  "2301",
  "5213",
  "5220",
  "1604",
  "2505",
  "5519",
  "1457",
  "6123",
  "1102",
  "6703",
  "2509",
  "6486",
  "6176",
  "5206",
  "6790",
  "6577",
  "2474",
  "2063",
  "6470",
  "8410",
  "2417",
  "2904",
  "3078",
  "2535",
  "2323",
  "3617",
  "6197",
  "8342",
  "6195",
  "6641",
  "2548",
  "4972",
  "3052",
  "3231",
  "1101",
  "1530",
  "1109",
  "6024",
  "8089",
  "3213",
  "8213",
  "2227",
  "8916",
  "6210",
  "3376",
  "5704",
  "5465",
  "4999",
  "4527",
  "4550",
  "6242",
  "1582",
  "5490",
  "6629",
  "1336",
  "2546",
  "1537",
  "4906",
  "2356",
];

module.exports = {
  data,
  stockNoList,
};
